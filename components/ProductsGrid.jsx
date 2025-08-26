"use client";

import Image from "next/image";

export default function ProductsGrid({ products = [] }) {
	if (!products || products.length === 0) {
		return null;
	}
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<h2 className="text-xl font-semibold mb-4">Featured Products</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product) => (
					<a key={product.id} href={`#/product/${product.id}`} className="border rounded-md overflow-hidden hover:shadow">
						<div className="relative w-full aspect-[4/3] bg-gray-100">
							{product.images?.[0]?.src ? (
								<Image src={product.images[0].src} alt={product.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
							) : null}
						</div>
						<div className="p-3">
							<div className="text-sm line-clamp-2 min-h-10">{product.name}</div>
							<div className="mt-2 font-semibold">{product.price ? `Rp ${Number(product.price).toLocaleString('id-ID')}` : ''}</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
