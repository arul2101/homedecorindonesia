export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientWrite } from "@/lib/woocommerce";

export async function POST(request) {
	try {
		const payload = await request.json();
		const api = createWooClientWrite();
		const { data } = await api.post("orders", payload);
		return NextResponse.json(data, { status: 201 });
	} catch (error) {
		const message = error?.response?.data || { message: error.message };
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
