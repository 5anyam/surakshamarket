'use client';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import {
  ChevronRight, Shield, Package, Award, Star,
  Truck, RotateCcw, HeadphonesIcon, Heart, Zap, Tag, ChevronLeft,
  Camera,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug?: string }[];
}

const ProductSkeleton: React.FC = () => (
  <div className="flex-shrink-0 w-56 md:w-64 bg-[#161616] border border-[#252525] animate-pulse">
    <div className="aspect-square bg-[#1a1a1a]" />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-[#1e1e1e] rounded w-3/4" />
      <div className="h-3 bg-[#1e1e1e] rounded w-1/2" />
      <div className="h-5 bg-[#1e1e1e] rounded w-1/3 mt-3" />
    </div>
  </div>
);

const HERO_SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    label: "Professional Security Solutions",
    title: "Secure Your\nHome &\nBusiness.",
    subtitle: "Delhi NCR's trusted source for CCTV, video door phones, alarms & complete surveillance systems.",
    cta: { text: "Shop Now", href: "/collections" },
    secondary: { text: "View Deals", href: "/sale" },
  },
  {
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    label: "Smart Surveillance",
    title: "See Everything.\nMiss Nothing.",
    subtitle: "HD CCTV cameras, DVR/NVR systems and smart door phones — delivered across Delhi NCR.",
    cta: { text: "Shop CCTV", href: "/category/cctv-cameras" },
    secondary: { text: "Video Door Phones", href: "/category/video-door-phones" },
  },
  {
    bg: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    label: "Access Control & Smart Locks",
    title: "Control\nEvery\nEntry Point.",
    subtitle: "From smart locks to biometric access control — protect what matters most with cutting-edge technology.",
    cta: { text: "Shop Access Control", href: "/category/access-control" },
    secondary: { text: "Smart Locks", href: "/category/smart-locks" },
  },
];

const CATEGORIES = [
  { name: 'CCTV Cameras',      slug: 'cctv-cameras',        emoji: '📷' },
  { name: 'Video Door Phones', slug: 'video-door-phones',   emoji: '🚪' },
  { name: 'Alarms & Sensors',  slug: 'alarms-sensors',      emoji: '🚨' },
  { name: 'Access Control',    slug: 'access-control',      emoji: '🔐' },
  { name: 'DVR/NVR Systems',   slug: 'dvr-nvr-systems',     emoji: '🖥️' },
  { name: 'Smart Locks',       slug: 'smart-locks',         emoji: '🔒' },
  { name: 'Outdoor Cameras',   slug: 'outdoor-cameras',     emoji: '🌐' },
  { name: 'GPS Trackers',      slug: 'gps-trackers',        emoji: '📡' },
];

const SHOWCASE_CATEGORIES = [
  { name: 'CCTV Cameras',      slug: 'cctv-cameras',        emoji: '📷' },
  { name: 'Video Door Phones', slug: 'video-door-phones',   emoji: '🚪' },
  { name: 'Alarms & Sensors',  slug: 'alarms-sensors',      emoji: '🚨' },
  { name: 'Access Control',    slug: 'access-control',      emoji: '🔐' },
  { name: 'DVR/NVR Systems',   slug: 'dvr-nvr-systems',     emoji: '🖥️' },
  { name: 'Smart Locks',       slug: 'smart-locks',         emoji: '🔒' },
  { name: 'Outdoor Cameras',   slug: 'outdoor-cameras',     emoji: '🌐' },
  { name: 'GPS Trackers',      slug: 'gps-trackers',        emoji: '📡' },
];

const TESTIMONIALS = [
  {
    name: 'Amit S.', location: 'Noida', rating: 5,
    text: 'Got a 4-camera CCTV system from Suraksha Market. Excellent quality and super fast delivery within Delhi NCR. Highly recommend!',
    tag: 'CCTV Cameras',
  },
  {
    name: 'Priya M.', location: 'Gurgaon', rating: 5,
    text: 'The Godrej video door phone I ordered is perfect. Crystal clear 7-inch display and two-way audio. Very happy with the purchase.',
    tag: 'Video Door Phones',
  },
  {
    name: 'Rajesh K.', location: 'Delhi', rating: 5,
    text: 'Best prices for smart locks in Delhi NCR. The biometric lock for my office is working flawlessly. Great after-sales support too.',
    tag: 'Smart Locks',
  },
];

const WHY_US = [
  { icon: Camera,  title: 'Genuine Products',       desc: 'All surveillance products are sourced from authorised distributors — 100% authentic brands.' },
  { icon: Shield,  title: 'Delhi NCR Coverage',      desc: 'We serve all of Delhi, Noida, Gurgaon, Faridabad and nearby areas with fast delivery.' },
  { icon: Zap,     title: 'Expert Support',           desc: 'Our security specialists help you choose the right system for your home or business.' },
];

const TRUST_STRIP = [
  { icon: Truck,          title: 'Fast Delivery',     sub: 'Delhi NCR same-day available'  },
  { icon: Shield,         title: 'Genuine Products',  sub: 'Authorised brand distributors'  },
  { icon: RotateCcw,      title: 'Easy Returns',      sub: '7-day hassle-free returns'      },
  { icon: HeadphonesIcon, title: '24/7 Support',      sub: 'Security experts always ready'  },
];

const STATS = [
  { number: '5K+',  label: 'Happy Customers',     icon: Heart   },
  { number: '4.8★', label: 'Average Rating',      icon: Award   },
  { number: '200+', label: 'Products Listed',     icon: Package  },
  { number: '8',    label: 'Security Categories', icon: Tag     },
];

export default function Homepage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => (await fetchProducts() || []) as Product[],
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  });

  const all: Product[] = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f] overflow-hidden text-white">

      {/* ── HERO SLIDER ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[580px] md:min-h-[640px] flex items-center">

        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${slide.bg}')`,
              opacity: i === heroSlide ? 1 : 0,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/85 to-[#0f0f0f]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-xl">
            <span className="inline-block text-[#2563eb] text-xs font-bold uppercase tracking-[0.3em] mb-5">
              {HERO_SLIDES[heroSlide].label}
            </span>
            <h1
              key={heroSlide}
              className="font-sora font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 whitespace-pre-line animate-hero-fade"
            >
              {HERO_SLIDES[heroSlide].title}
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-md">
              {HERO_SLIDES[heroSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={HERO_SLIDES[heroSlide].cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm uppercase tracking-wider transition-colors"
              >
                {HERO_SLIDES[heroSlide].cta.text} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href={HERO_SLIDES[heroSlide].secondary.href}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 hover:bg-white/10 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors"
              >
                {HERO_SLIDES[heroSlide].secondary.text}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 flex items-center gap-3">
            <button
              onClick={() => setHeroSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className={`h-[3px] rounded-full transition-all duration-400 ${
                    i === heroSlide ? 'bg-[#2563eb] w-8' : 'bg-white/25 w-4 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length)}
              className="p-2 border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_STRIP.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-2">
                  <Icon className="w-5 h-5 text-[#2563eb] flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                    <p className="text-[11px] text-[#555] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#2563eb] text-xs font-bold uppercase tracking-[0.25em] mb-1.5">Browse</p>
              <h2 className="font-sora font-bold text-2xl md:text-3xl text-white">Shop by Category</h2>
            </div>
            <Link href="/collections" className="hidden md:flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#2563eb] transition-colors">
              All products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center justify-center py-6 px-2 bg-[#161616] border border-[#252525] hover:border-[#2563eb] hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <span className="text-2xl mb-2.5">{cat.emoji}</span>
                <span className="text-[10px] font-medium text-gray-400 group-hover:text-white text-center tracking-wide leading-tight transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNERS ────────────────────────────────────────────────── */}
      <section className="pb-14 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="md:col-span-2 bg-[#161616] border border-[#252525] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[120px] opacity-5 select-none pointer-events-none">
              🛡️
            </div>
            <div className="relative z-10">
              <span className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                Limited Time
              </span>
              <h3 className="font-sora font-extrabold text-3xl md:text-4xl text-white mb-3">
                Security Sale is Live
              </h3>
              <ul className="text-gray-400 text-sm space-y-1.5 mb-8">
                <li>• Up to 50% off on CCTV cameras &amp; systems</li>
                <li>• Best prices on video door phones in Delhi NCR</li>
                <li>• New security products added weekly</li>
              </ul>
              <Link
                href="/sale"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Shop All Deals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Link
              href="/category/video-door-phones"
              className="flex-1 bg-[#161616] border border-[#252525] hover:border-[#2563eb] p-7 flex items-center justify-between group transition-all duration-200"
            >
              <div>
                <span className="text-[10px] text-[#555] uppercase tracking-widest mb-1 block">Category</span>
                <p className="font-sora font-bold text-white text-lg mb-1">Video Door Phones</p>
                <p className="text-gray-500 text-sm">See who&apos;s at your door</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#2563eb] group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/category/access-control"
              className="flex-1 bg-[#161616] border border-[#252525] hover:border-[#2563eb] p-7 flex items-center justify-between group transition-all duration-200"
            >
              <div>
                <span className="text-[10px] text-[#555] uppercase tracking-widest mb-1 block">Category</span>
                <p className="font-sora font-bold text-white text-lg mb-1">Access Control</p>
                <p className="text-gray-500 text-sm">Biometric &amp; card systems</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#2563eb] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CAROUSELS ────────────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-14 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="h-7 bg-[#161616] rounded w-48 mb-8 animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          </div>
        </section>
      ) : isError ? (
        <section className="py-20 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto text-center py-20 border border-[#252525]">
            <p className="text-gray-500 mb-4">Unable to load products right now.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
        </section>
      ) : (
        SHOWCASE_CATEGORIES.map((cat, catIdx) => {
          const catProducts = all
            .filter((p) =>
              p.categories?.some(
                (c) => c.slug === cat.slug ||
                       c.name.toLowerCase().replace(/\s+/g, '-') === cat.slug
              )
            )
            .slice(0, 8);

          if (catProducts.length === 0) return null;

          return (
            <section
              key={cat.slug}
              className={`py-14 px-4 border-t border-[#1a1a1a] ${catIdx % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'}`}
            >
              <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <p className="text-[10px] font-bold text-[#2563eb] uppercase tracking-[0.25em] mb-0.5">
                        Collection
                      </p>
                      <h2 className="font-sora font-bold text-xl text-white">
                        {cat.name}
                      </h2>
                    </div>
                  </div>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2563eb] transition-colors border border-[#252525] hover:border-[#2563eb] px-4 py-2"
                  >
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory -mx-4 px-4">
                  {catProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex-shrink-0 w-52 md:w-60 snap-start"
                    >
                      <ProductCard product={prod} />
                    </div>
                  ))}

                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex-shrink-0 w-40 snap-start flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#252525] hover:border-[#2563eb] min-h-[300px] bg-transparent transition-all duration-300 group"
                  >
                    <span className="text-3xl opacity-30 group-hover:opacity-100 transition-opacity">{cat.emoji}</span>
                    <p className="text-[10px] font-bold text-[#444] group-hover:text-[#2563eb] uppercase tracking-widest transition-colors">
                      See All
                    </p>
                    <ChevronRight className="w-4 h-4 text-[#444] group-hover:text-[#2563eb] transition-colors" />
                  </Link>
                </div>

                <div className="mt-6 md:hidden">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#252525] hover:border-[#2563eb] text-xs font-medium text-gray-400 hover:text-white transition-all"
                  >
                    View all {cat.name} <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* ── MID-PAGE PROMO ───────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#161616] via-[#1a1a1a] to-[#161616] border border-[#252525] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[160px] opacity-[0.04] select-none pointer-events-none">
              🛡️
            </div>
            <div className="relative z-10 md:flex md:items-center md:justify-between gap-12">
              <div className="max-w-lg mb-8 md:mb-0">
                <span className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">
                  Complete Security Solutions
                </span>
                <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-white mb-4 leading-tight">
                  Protect What Matters
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  From CCTV cameras to smart locks — browse 8 security categories with 200+ professional-grade products for your home and business in Delhi NCR.
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Browse All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 max-w-sm">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] border border-[#252525] hover:border-[#2563eb] text-xs font-medium text-gray-400 hover:text-white transition-all"
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0f0f0f] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Why Suraksha Market</p>
            <h2 className="font-sora font-bold text-2xl md:text-3xl text-white">Your Security, Our Priority</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-[#161616] border border-[#252525] hover:border-[#2563eb] transition-colors">
                  <div className="w-14 h-14 bg-[#1a1a1a] border border-[#252525] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#2563eb] stroke-[1.5]" />
                  </div>
                  <h3 className="font-sora font-bold text-white text-base mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-[#1a1a1a]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`text-center px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="font-sora font-extrabold text-4xl md:text-5xl text-white mb-2">{stat.number}</div>
              <div className="text-[11px] text-[#555] uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0f0f0f] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Reviews</p>
            <h2 className="font-sora font-bold text-2xl md:text-3xl text-white">What Delhi NCR Customers Say</h2>
            <p className="text-[#555] text-sm mt-2">Real reviews from verified buyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((review, i) => (
              <div key={i} className="bg-[#161616] border border-[#252525] p-8 flex flex-col justify-between hover:border-[#333] transition-colors">
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-7 italic">&quot;{review.text}&quot;</p>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-[#1e1e1e]">
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-[#555] mt-0.5">{review.location}</p>
                  </div>
                  <span className="text-[10px] text-[#2563eb] uppercase tracking-widest border border-[#252525] px-3 py-1 bg-[#0f0f0f]">
                    {review.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Stay Updated</p>
          <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mb-4">Security Tips &amp; Deals</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Get the latest security product launches, exclusive Delhi NCR deals, and expert tips straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-[#252525] bg-[#161616]">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder-[#444] focus:outline-none text-sm"
            />
            <button className="px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold transition-colors text-sm uppercase tracking-wider">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
