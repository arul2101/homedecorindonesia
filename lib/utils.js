import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchJson(path) {
  const base = process.env.NEXT_PUBLIC_WC_STORE_URL; // gunakan domain WooCommerce langsung
  const key = process.env.WC_READ_KEY;
  const secret = process.env.WC_READ_SECRET;

  // Basic Auth
  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(`${base}/wp-json/wc/v3${path}&stock_status=instock&status=publish`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return res.json();
}
