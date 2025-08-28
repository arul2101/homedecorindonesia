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

