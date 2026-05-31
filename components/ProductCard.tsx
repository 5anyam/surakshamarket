"use client";

import Link from "next/link";
import { productToSlug } from "../lib/slug";
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string | number;
  regular_price: string;
  images?: { src: string }[];
  category?: string;
  average_rating?: string;
  rating_count?: number;
  badge?: "New" | "Sale" | "Hot";
}

export default function ProductCard({ product }: { product: Product }) {
  const productUrl = `/product/${productToSlug(product)}`;
  const rating = Number(product.average_rating);
  const salePrice = Number(product.price);
  const originalPrice = Number(product.regular_price);
  const isOnSale = originalPrice > salePrice && originalPrice > 0;
  const discountPercent = isOnSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <Link
      href={productUrl}
      className="group block h-full bg-white border border-gray-200 hover:border-[#2563eb] hover:shadow-md transition-all duration-300 rounded-sm overflow-hidden"
    >
      <div className="relative flex flex-col h-full">

        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
          />

          {/* Top labels */}
          <div className="absolute top-0 left-0 flex flex-col items-start gap-1 p-2">
            {product.badge === 'New' && (
              <span className="bg-[#2563eb] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]">
                New
              </span>
            )}
            {product.badge === 'Hot' && (
              <span className="bg-[#2563eb] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]">
                Hot
              </span>
            )}
            {isOnSale && (
              <span className="bg-[#2563eb] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-3.5 gap-2">

          {/* Category / Brand */}
          {product.category && (
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.18em] font-medium">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-snug min-h-[2.4rem] group-hover:text-gray-900 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Star Rating */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 ml-0.5">
                ({product.rating_count || 0})
              </span>
            </div>
          )}

          <div className="flex-1" />

          {/* PRICE */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-gray-100">
            <span className="text-base font-bold text-gray-900">
              ₹{salePrice.toLocaleString('en-IN')}
            </span>
            {isOnSale && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-bold text-green-600 ml-auto">
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          {/* CTA */}
          <button className="mt-2 w-full py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[10px] font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors duration-200 active:scale-[0.98]">
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
