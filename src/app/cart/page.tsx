'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../../lib/cart';
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

function parsePrice(price: string): number {
  return parseFloat(price) || 0;
}

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart();

  const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const mrpTotal = items.reduce((sum, item) => {
    const original = item.regular_price ? parsePrice(item.regular_price) : parsePrice(item.price);
    return sum + original * item.quantity;
  }, 0);
  const discountAmount = mrpTotal - total;
  const freeShipping = total >= 499;

  return (
    <main className="min-h-screen bg-[#0f0f0f]">

      {/* ── HERO ── */}
      <div className="bg-[#161616] border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-[#e63e3e] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-sora font-bold text-white tracking-tight">Shopping Cart</h1>
          </div>
          <p className="text-gray-500 text-sm pl-12">
            {items.length === 0
              ? 'Your cart is empty'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── EMPTY STATE ── */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#161616] border border-[#252525]">
            <div className="w-20 h-20 bg-[#1a1a1a] border border-[#252525] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-9 h-9 text-[#333]" />
            </div>
            <h2 className="text-lg font-sora font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-7 max-w-xs mx-auto leading-relaxed">
              Add products to your cart and they will appear here.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#e63e3e] hover:bg-[#cc3333] text-white text-sm font-bold uppercase tracking-wide transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (

          /* ── CART CONTENT ── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => {
                const hasDiscount =
                  item.regular_price && parsePrice(item.regular_price) > parsePrice(item.price);
                const itemSubtotal = parsePrice(item.price) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-[#161616] border border-[#252525] hover:border-[#333] p-4 sm:p-5 transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-[#1a1a1a] border border-[#252525] overflow-hidden relative">
                        {item.images?.[0]?.src ? (
                          <Image
                            src={item.images[0].src}
                            alt={item.name}
                            fill
                            className="object-contain p-1.5"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-7 h-7 text-[#333]" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                          {item.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-white">
                            ₹{parsePrice(item.price).toLocaleString('en-IN')}
                          </span>
                          {hasDiscount && item.regular_price && (
                            <span className="text-xs text-[#444] line-through">
                              ₹{parsePrice(item.regular_price).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Quantity + Delete */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-[#252525] overflow-hidden">
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (item.quantity > 1) decrement(item.id); }}
                              disabled={item.quantity <= 1}
                              className="px-3 py-2 hover:bg-[#e63e3e] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-400"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-white border-x border-[#252525]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); increment(item.id); }}
                              className="px-3 py-2 hover:bg-[#e63e3e] hover:text-white transition-colors text-gray-400"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">
                              ₹{itemSubtotal.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFromCart(item.id); }}
                              className="p-2 text-[#333] hover:text-[#e63e3e] hover:bg-[#1a1a1a] transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue shopping */}
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#e63e3e] font-medium mt-2 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="lg:col-span-1">
              <div className="bg-[#161616] border border-[#252525] sticky top-8">

                <div className="px-6 pt-6 pb-4 border-b border-[#1e1e1e]">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Price breakdown */}
                  <div className="space-y-3 pb-4 border-b border-[#1e1e1e]">
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>MRP Total</span>
                        <span>₹{mrpTotal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-400 font-semibold">
                        <span>Discount Saved</span>
                        <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Shipping</span>
                      <span className={freeShipping ? 'text-green-400 font-semibold' : 'text-gray-400'}>
                        {freeShipping ? 'Free' : '₹49'}
                      </span>
                    </div>
                    {!freeShipping && (
                      <p className="text-xs text-[#e63e3e] font-medium">
                        Add ₹{(499 - total).toLocaleString('en-IN')} more for free shipping
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline pb-5 border-b border-[#1e1e1e]">
                    <span className="text-sm font-bold text-white uppercase tracking-wide">Total</span>
                    <span className="text-xl font-black text-white">
                      ₹{(total + (freeShipping ? 0 : 49)).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e63e3e] hover:bg-[#cc3333] text-white text-sm font-bold uppercase tracking-wide transition-colors"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/collections"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#252525] hover:border-[#e63e3e] text-gray-400 hover:text-white text-sm font-medium transition-all"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div className="pt-4 border-t border-[#1e1e1e] space-y-2">
                    {[
                      '100% Secure Checkout',
                      'Free shipping above ₹499',
                      '7-day easy returns',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle className="w-3.5 h-3.5 text-[#e63e3e] flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
