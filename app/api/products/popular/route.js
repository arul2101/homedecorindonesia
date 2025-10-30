export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(request) {
	try {
		const api = createWooClientRead();
		const { searchParams } = new URL(request.url);

		// Build query parameters for WooCommerce API
		const params = new URLSearchParams();
		params.append('orderby', 'popularity');
		params.append('order', 'desc');
		params.append('per_page', searchParams.get('limit') || '12');

		// Add category filter if provided
		if (searchParams.get('category')) {
			params.append('category', searchParams.get('category'));
		}

		// Add price range filters if provided
		if (searchParams.get('minPrice')) {
			params.append('min_price', searchParams.get('minPrice'));
		}

		if (searchParams.get('maxPrice')) {
			params.append('max_price', searchParams.get('maxPrice'));
		}

		const { data } = await api.get(`products?${params.toString()}`);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}