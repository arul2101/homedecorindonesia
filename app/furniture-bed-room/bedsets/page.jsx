import ProductsGrid from '@/components/ProductsGrid';

async function fetchJson(path) {
	const base = process.env.NEXT_PUBLIC_BASE_URL || '';
	const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
	if (!res.ok) {
		throw new Error(`Failed to fetch ${path}: ${res.status}`);
	}
	return res.json();
}

async function getBedsCategoryId() {
	// Try exact slug first
	let cats = await fetchJson('/api/categories?slug=bedsets&per_page=1');
	if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;
	// Try larger list and find by name contains
	cats = await fetchJson('/api/categories?per_page=100');
	if (!Array.isArray(cats)) return null;
	let match = cats.find(c => (c?.slug || '').toLowerCase() === 'bedsets');
	if (match) return match.id;
	match = cats.find(c => (c?.name || '').toLowerCase().includes('bedsets'));
	if (match) return match.id;
	match = cats.find(c => (c?.name || '').toLowerCase().includes('beds'));
	return match ? match.id : null;
}

export const metadata = {
	title: 'Bed Sets',
};

export default async function BedSetsPage() {
	const categoryId = await getBedsCategoryId();
	let products = [];
	if (categoryId) {
		const data = await fetchJson(`/api/products?category=${categoryId}&per_page=24`);
		products = data?.products || [];
	}

	return (
		<main className="max-w-7xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold mb-4">Bed Sets</h1>
			{!categoryId ? (
				<p className="text-sm text-gray-500">Kategori <q>Bedsets</q> tidak ditemukan.</p>
			) : (
				<ProductsGrid products={products} />
			)}
		</main>
	);
}
