import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const storeUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;

function assertEnv(variableName) {
	if (!process.env[variableName]) {
		throw new Error(`Missing environment variable: ${variableName}`);
	}
}

export function createWooClientRead() {
	assertEnv("WC_READ_KEY");
	assertEnv("WC_READ_SECRET");
	if (!storeUrl) {
		throw new Error("Missing NEXT_PUBLIC_WC_STORE_URL");
	}
	return new WooCommerceRestApi({
		url: storeUrl,
		consumerKey: process.env.WC_READ_KEY,
		consumerSecret: process.env.WC_READ_SECRET,
		version: "wc/v3",
		queryStringAuth: true,
	});
}

export function createWooClientWrite() {
	assertEnv("WC_WRITE_KEY");
	assertEnv("WC_WRITE_SECRET");
	if (!storeUrl) {
		throw new Error("Missing NEXT_PUBLIC_WC_STORE_URL");
	}
	return new WooCommerceRestApi({
		url: storeUrl,
		consumerKey: process.env.WC_WRITE_KEY,
		consumerSecret: process.env.WC_WRITE_SECRET,
		version: "wc/v3",
		queryStringAuth: true,
	});
}

export function createWooClientFull() {
	assertEnv("WC_FULL_KEY");
	assertEnv("WC_FULL_SECRET");
	if (!storeUrl) {
		throw new Error("Missing NEXT_PUBLIC_WC_STORE_URL");
	}
	return new WooCommerceRestApi({
		url: storeUrl,
		consumerKey: process.env.WC_FULL_KEY,
		consumerSecret: process.env.WC_FULL_SECRET,
		version: "wc/v3",
		queryStringAuth: true,
	});
}

// Additional API functions for product fetching
export async function getProductBySlug(slug) {
	try {
		// Try Store API first (no auth required)
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products?slug=${encodeURIComponent(slug)}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		const products = await response.json();
		return products.length > 0 ? products[0] : null;
	} catch (error) {
		console.error('Error fetching product by slug:', error);

		// Fallback to REST API v3 with auth
		try {
			const client = createWooClientRead();
			const result = await client.get('products', { slug: slug });
			return result.data.length > 0 ? result.data[0] : null;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

export async function getProductById(id) {
	try {
		// Try Store API first (no auth required)
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products/${id}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (response.ok) {
			return await response.json();
		}
	} catch (error) {
		console.error('Store API failed, trying REST API:', error);
	}

	// Fallback to REST API v3 with auth
	try {
		const client = createWooClientRead();
		const result = await client.get(`products/${id}`);
		return result.data;
	} catch (error) {
		console.error('Error fetching product by ID:', error);
		throw error;
	}
}

export async function getRelatedProducts(productId, categoryId, limit = 6) {
	try {
		// Try Store API first
		let url = `${storeUrl}/wp-json/wc/store/products?category=${categoryId}&per_page=${limit}`;

		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			},
			next: { revalidate: 3600 }
		});

		let products = [];

		if (response.ok) {
			products = await response.json();
		} else {
			// Fallback to REST API v3 with auth
			const client = createWooClientRead();
			const result = await client.get('products', {
				category: categoryId,
				per_page: limit,
				exclude: productId
			});
			products = result.data;
		}

		// Filter out the current product
		return products.filter(product => product.id !== productId);
	} catch (error) {
		console.error('Error fetching related products:', error);
		return [];
	}
}

export async function getProductsByCategory(categorySlug, page = 1, perPage = 12) {
	try {
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products?category=${encodeURIComponent(categorySlug)}&page=${page}&per_page=${perPage}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 600 } // Cache for 10 minutes
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch products by category: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching products by category:', error);

		// Fallback to REST API v3
		try {
			const client = createWooClientRead();
			const result = await client.get('products', {
				category: categorySlug,
				page: page,
				per_page: perPage
			});
			return result.data;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

export async function getCategories() {
	try {
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products/categories`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching categories:', error);

		// Fallback to REST API v3
		try {
			const client = createWooClientRead();
			const result = await client.get('products/categories');
			return result.data;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

