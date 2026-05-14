'use client';
import Link from "next/link";
import { useCart } from "../lib/cart";
import { Trash2, Minus, Plus, Package, X, ShoppingBag, CheckCircle, Gift } from "lucide-react";
import { useEffect, useState } from "react";

interface CartItem {
  id: number | string;
  name: string;
  price: string;
  regular_price?: string;
  quantity: number;
  images?: Array<{ src: string }>;
}

export default function CartDrawer() {
  const { items, increment, decrement, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const [showAddedNotification, setShowAddedNotification] = useState<boolean>(false);

  const total: number = items.reduce((sum: number, i: CartItem) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems: number = items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);
  const mrpTotal: number = items.reduce((sum: number, item: CartItem) => {
    const regularPrice = item.regular_price;
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    return sum + originalPrice * item.quantity;
  }, 0);
  const discountAmount: number = mrpTotal - total;

  useEffect(() => {
    if (items.length > 0 && isCartOpen) {
      setShowAddedNotification(true);
      const timer = setTimeout(() => setShowAddedNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [items.length, isCartOpen]);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors touch-manipulation"
        aria-label="Open shopping cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#e63e3e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[85%] sm:w-[420px] max-w-[420px] bg-[#161616] border-l border-[#252525] z-[9999] shadow-2xl transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#e63e3e]" />
            <h2 className="text-base font-sora font-bold text-white">
              Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[#1a1a1a] border border-transparent hover:border-[#252525] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Added Notification */}
        {showAddedNotification && (
          <div className="bg-green-500/10 border-b border-green-500/20 p-3 flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-xs text-green-400 font-medium">Item added to cart!</span>
          </div>
        )}

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-[#1a1a1a] border border-[#252525] flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-[#333]" />
                </div>
                <h3 className="text-base font-sora font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-xs text-gray-600 mb-6">Start shopping to add items</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#e63e3e] hover:bg-[#cc3333] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="divide-y divide-[#1e1e1e]">
                  {items.map((item: CartItem) => {
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount: boolean = !!(itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price));

                    return (
                      <div key={item.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                        <div className="flex gap-3">
                          {/* Image */}
                          <div className="flex-shrink-0 w-16 h-16 bg-[#1a1a1a] border border-[#252525] overflow-hidden">
                            <img
                              src={item.images?.[0]?.src || '/placeholder.png'}
                              alt={item.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-1.5">
                              <h3 className="text-xs font-medium text-gray-200 line-clamp-2 pr-2 leading-snug">
                                {item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFromCart(item.id as number); }}
                                className="text-[#333] hover:text-[#e63e3e] flex-shrink-0 p-1 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold text-white">
                                ₹{parseFloat(item.price).toLocaleString()}
                              </span>
                              {hasDiscount && itemRegularPrice && (
                                <span className="text-[10px] text-[#444] line-through">
                                  ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-[#252525] overflow-hidden">
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (item.quantity > 1) decrement(item.id as number); }}
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-[#e63e3e] hover:text-white transition-colors disabled:opacity-30 text-gray-500"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-9 text-center text-xs font-bold text-white border-x border-[#252525] bg-[#1a1a1a] py-2">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); increment(item.id as number); }}
                                  className="p-2 hover:bg-[#e63e3e] hover:text-white transition-colors text-gray-500"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="text-xs text-gray-500 font-medium">
                                ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Free Gifts Section */}
                <div className="border-t border-[#1e1e1e] bg-[#1a1a1a] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-4 h-4 text-green-400" />
                    <div>
                      <h3 className="text-xs font-bold text-green-400">Free Gifts with Order</h3>
                      <p className="text-[10px] text-gray-600">Worth ₹250 • Absolutely Free!</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Premium Sticky Pad', sub: 'High-Quality • Reusable', src: '/sticky.webp' },
                      { name: 'Cable Protector', sub: 'Durable • Long-lasting', src: '/wire.webp' },
                    ].map((gift, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-[#161616] border border-[#252525] p-2">
                        <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center border border-[#252525] flex-shrink-0">
                          <img src={gift.src} alt={gift.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white">{gift.name}</p>
                          <p className="text-[9px] text-gray-600">{gift.sub}</p>
                        </div>
                        <span className="text-[10px] text-green-400 font-bold flex-shrink-0">FREE</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#1e1e1e] bg-[#161616]">
              <div className="p-5 space-y-2.5">
                {discountAmount > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>MRP Total</span>
                      <span>₹{mrpTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-green-400 font-medium">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xs text-green-400">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Free Gifts
                  </span>
                  <span className="font-medium">₹250</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#1e1e1e]">
                  <span className="text-sm font-bold text-white">Total</span>
                  <span className="text-base font-black text-white">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-2.5">
                <Link
                  href="/checkout"
                  className="block w-full bg-[#e63e3e] hover:bg-[#cc3333] text-white text-center py-3.5 text-sm font-bold uppercase tracking-wider transition-colors"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full border border-[#252525] hover:border-[#e63e3e] text-gray-400 hover:text-white py-3 text-sm font-medium transition-all"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#1e1e1e]">
                <div className="flex items-center justify-center gap-4 text-[10px] text-[#444]">
                  <span>✓ Secure</span>
                  <span>✓ Free Ship</span>
                  <span>✓ Easy Returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
