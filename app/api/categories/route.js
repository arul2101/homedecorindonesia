export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const perPage = searchParams.get("per_page") || "50";
	const page = searchParams.get("page") || "1";
	const slug = searchParams.get("slug");
	const search = searchParams.get("search");
	try {
		const api = createWooClientRead();
		const params = {
			per_page: String(perPage),
			page: String(page),
			hide_empty: true,
		};
		if (slug) params.slug = String(slug);
		if (search) params.search = String(search);
		const { data } = await api.get("products/categories", {}, { params });
		return NextResponse.json(data);
	} catch (error) {
		const message = error?.response?.data || { message: error.message };
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
