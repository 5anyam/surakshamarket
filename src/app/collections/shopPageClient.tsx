'use client';

import { useState, useMemo } from 'react';
import ProductCard from '../../../components/ProductCard';
import { Product } from './page';
import { SlidersHorizontal, X, Search } from 'lucide-react';

interface ShopPageClientProps {
  products: Product[];
}

type ProductWithSlug = Product & {
  slug: string;
  regular_price: string;
};

type SortOption = 'name' | 'price-low' | 'price-high';

interface PriceRange {
  min: string;
  max: string;
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
}

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => p.categories?.forEach((c) => cats.add(c.name)));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategory && !product.categories?.some((c) => c.name === selectedCategory)) return false;
      if (priceRange.min || priceRange.max) {
        const price = parsePrice(product.price);
        if (priceRange.min && price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && price > parseFloat(priceRange.max)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return parsePrice(a.price) - parsePrice(b.price);
        case 'price-high': return parsePrice(b.price) - parsePrice(a.price);
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  const hasActiveFilters = !!(searchTerm || selectedCategory || priceRange.min || priceRange.max);

  const inputClass =
    'w-full px-4 py-2.5 border border-[#252525] bg-[#1a1a1a] text-sm text-gray-300 focus:outline-none focus:border-[#2563eb] transition-colors';

  return (
    <main className="min-h-screen bg-[#0f0f0f]">

      {/* ── HERO / HEADER ── */}
      <div className="bg-[#161616] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#2563eb]" />
            <span className="text-xs font-bold text-[#2563eb] uppercase tracking-[0.2em]">All Products</span>
            <span className="w-8 h-[1px] bg-[#2563eb]" />
          </div>
          <h1 className="font-sora font-extrabold text-3xl md:text-5xl text-white mb-6">
            Security & Surveillance Store
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Professional CCTV cameras, video door phones, alarms, access control & more — serving Delhi NCR.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
            <input
              type="text"
              placeholder="Search the collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-[#1a1a1a] border border-[#252525] text-sm text-white focus:outline-none focus:border-[#2563eb] transition-all placeholder:text-[#444]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#2563eb] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Filter Collection'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── SIDEBAR ── */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28 space-y-8">

              <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-4">
                <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Refine By</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] text-[#2563eb] font-bold uppercase tracking-widest hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] mb-4">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={inputClass}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] mb-4">
                  Price Range (₹)
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] mb-4">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={inputClass}
                >
                  <option value="name">Alphabetical (A–Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="pt-6 border-t border-[#1a1a1a] space-y-3">
                  <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.2em]">Applied</p>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#161616] border border-[#252525] text-[10px] text-gray-400 uppercase tracking-wider">
                        &quot;{searchTerm}&quot; <X className="w-3 h-3 cursor-pointer hover:text-[#2563eb]" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#161616] border border-[#252525] text-[10px] text-gray-400 uppercase tracking-wider">
                        {selectedCategory} <X className="w-3 h-3 cursor-pointer hover:text-[#2563eb]" onClick={() => setSelectedCategory('')} />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ── PRODUCTS ── */}
          <div className="flex-1">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
              <p className="text-xs text-gray-600 tracking-widest uppercase">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> results
              </p>
              <div className="hidden sm:block h-[1px] flex-1 mx-8 bg-[#1a1a1a]" />
              <p className="hidden sm:block text-[10px] text-[#444] uppercase tracking-[0.2em]">
                {products.length} Items Total
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-[#161616] border border-[#252525]">
                <div className="w-12 h-12 bg-[#1a1a1a] border border-[#252525] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-5 h-5 text-[#444]" />
                </div>
                <h3 className="text-lg font-sora font-bold text-white mb-2">No matches found</h3>
                <p className="text-xs text-gray-600 mb-8">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      slug: product.slug || `product-${product.id}`,
                    } as ProductWithSlug}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTACT SECTION ── */}
      <div className="mt-20 bg-[#0a0a0a] border-t border-[#1a1a1a] py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Customer Care</p>
          <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mb-6">Need assistance?</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Our security specialists are available to help you choose the right surveillance system for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@surakhshamarket.com"
              className="px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Email Support
            </a>
            <a
              href="https://wa.me/919911636888"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#252525] hover:border-[#2563eb] text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
