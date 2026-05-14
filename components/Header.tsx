'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useIsMobile } from "../hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { Phone, UserCircle2, ShieldCheck } from "lucide-react";
import AnnouncementBar from './anouncement';

interface NavItem {
  name: string;
  to: string;
  submenu?: { name: string; to: string }[];
}

const navItems: NavItem[] = [
  { name: "HOME", to: "/" },
  { name: "CCTV CAMERAS", to: "/category/cctv-cameras" },
  { name: "VIDEO DOOR PHONES", to: "/category/video-door-phones" },
  { name: "ALARMS & SENSORS", to: "/category/alarms-sensors" },
  { name: "ACCESS CONTROL", to: "/category/access-control" },
  {
    name: "MORE",
    to: "#",
    submenu: [
      { name: "DVR/NVR Systems", to: "/category/dvr-nvr-systems" },
      { name: "Smart Locks",     to: "/category/smart-locks" },
      { name: "Outdoor Cameras", to: "/category/outdoor-cameras" },
      { name: "GPS Trackers",    to: "/category/gps-trackers" },
    ],
  },
  { name: "DEALS", to: "/sale" },
];

const CATEGORY_PILLS = [
  { name: 'All',             href: '/collections',                  emoji: '🛡️' },
  { name: 'CCTV Cameras',   href: '/category/cctv-cameras',        emoji: '📷' },
  { name: 'Door Phones',    href: '/category/video-door-phones',   emoji: '🚪' },
  { name: 'Alarms',         href: '/category/alarms-sensors',      emoji: '🚨' },
  { name: 'Access Control', href: '/category/access-control',      emoji: '🔐' },
  { name: 'DVR/NVR',        href: '/category/dvr-nvr-systems',     emoji: '🖥️' },
  { name: 'Smart Locks',    href: '/category/smart-locks',         emoji: '🔒' },
  { name: 'Outdoor',        href: '/category/outdoor-cameras',     emoji: '🌐' },
  { name: 'GPS Trackers',   href: '/category/gps-trackers',        emoji: '📡' },
  { name: '🔥 Deals',       href: '/sale',                          emoji: '' },
];

const QUICK_SEARCH_CHIPS = ['CCTV Camera', 'Video Door Phone', 'Smart Lock', 'IP Camera'];

export default function Header() {
  const location = usePathname();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('announcementBarClosed') !== 'true';
  });

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    setIsAuthenticated(auth === "true");
    setUserEmail(email || "");
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setActiveSubmenu(null);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node))
        setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    setShowDesktopSearch(false);
    setShowMobileSearch(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setTimeout(() => setSearch(""), 100);
  }

  const handleLogout = async () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    router.push("/");
  };

  const headerTop = announcementVisible ? 'top-10 lg:top-11' : 'top-0';
  const mobileDrawerTop = announcementVisible ? 'top-10' : 'top-0';

  return (
    <>
      <AnnouncementBar onClose={() => setAnnouncementVisible(false)} />
      {announcementVisible && <div className="h-10 lg:h-11" />}

      <header className={`sticky ${headerTop} z-40 bg-[#0f0f0f] border-b border-[#1a1a1a] transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* LEFT */}
            <div className="flex items-center">
              {isMobile ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-300 hover:text-white">
                    <HiOutlineMenuAlt3 className="text-2xl" />
                  </button>
                  <button onClick={() => setShowMobileSearch(true)} className="p-2 text-gray-300 hover:text-white">
                    <FiSearch className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowDesktopSearch(!showDesktopSearch)}
                  className="p-2 text-gray-400 hover:text-[#2563eb] transition-colors"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* CENTER — Brand Name */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
                <span className="font-sora font-extrabold text-lg md:text-xl tracking-tight text-white whitespace-nowrap">
                  Suraksha<span className="text-[#2563eb]">Market</span>
                </span>
              </div>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-1 md:gap-3">
              {!isMobile && (
                <div className="relative" ref={userMenuRef}>
                  {isAuthenticated ? (
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="p-2 text-gray-400 hover:text-[#2563eb] transition-colors"
                    >
                      <UserCircle2 className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  )}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#161616] border border-[#2a2a2a] shadow-2xl py-2 z-50">
                      {userEmail && (
                        <div className="px-5 py-2 border-b border-[#2a2a2a] mb-1">
                          <p className="text-[10px] text-[#555] uppercase tracking-wider">Signed in as</p>
                          <p className="text-xs font-medium text-white truncate">{userEmail}</p>
                        </div>
                      )}
                      <Link href="/account" className="block px-5 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a]">My Account</Link>
                      <button onClick={handleLogout} className="w-full text-left px-5 py-2 text-xs text-red-400 hover:bg-[#1a1a1a] border-t border-[#2a2a2a] mt-1">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Desktop Search */}
        {!isMobile && showDesktopSearch && (
          <div className="bg-[#161616] border-t border-[#1a1a1a] px-4 py-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search security products..."
                className="w-full bg-transparent border-b border-[#333] py-2 text-sm text-white focus:outline-none placeholder-[#555] focus:border-[#2563eb] transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button type="submit" className="ml-4 text-xs font-semibold uppercase tracking-widest text-[#2563eb] hover:text-white transition-colors">
                Search
              </button>
              <button type="button" onClick={() => setShowDesktopSearch(false)} className="ml-6 text-gray-600 hover:text-white transition-colors">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-[#1a1a1a]" ref={menuRef}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.to}
                    className={`block px-4 py-3.5 text-[11px] font-medium tracking-[0.15em] transition-all duration-200 ${
                      item.name === "DEALS"
                        ? "text-[#2563eb]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <BiChevronDown className="inline-block ml-1 text-sm group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {item.submenu && activeSubmenu === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#161616] border border-[#2a2a2a] min-w-[220px] shadow-2xl py-3 z-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.to}
                          className="block px-5 py-2.5 text-[11px] tracking-wider text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Category Pills */}
        <div className="border-t border-[#1a1a1a] overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 py-2.5" style={{ width: 'max-content', minWidth: '100%' }}>
            {CATEGORY_PILLS.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  pill.name === '🔥 Deals'
                    ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] hover:text-white border border-[#252525]'
                }`}
              >
                {pill.emoji && <span>{pill.emoji}</span>}
                {pill.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={`fixed ${mobileDrawerTop} left-0 h-full w-full max-w-[300px] bg-[#0f0f0f] z-50 overflow-y-auto border-r border-[#1a1a1a]`}>

            <div className="p-5 bg-[#161616] border-b border-[#1a1a1a] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
                <span className="font-sora font-bold text-base text-white">
                  Suraksha<span className="text-[#2563eb]">Market</span>
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 border border-[#2a2a2a] hover:border-[#2563eb] transition-colors">
                <HiOutlineX className="text-xl text-gray-400" />
              </button>
            </div>

            <nav className="p-5">
              {navItems.map((item) => (
                <div key={item.name} className="mb-1">
                  <div className="flex items-center justify-between border-b border-[#1a1a1a] py-3.5">
                    <Link
                      href={item.to}
                      className={`text-sm font-medium tracking-widest ${item.name === 'DEALS' ? 'text-[#2563eb]' : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <button onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === item.name ? null : item.name)}>
                        <BiChevronDown className={`text-xl text-gray-500 transition-transform ${mobileActiveSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.submenu && mobileActiveSubmenu === item.name && (
                    <div className="bg-[#161616] px-4 py-2 flex flex-col gap-2.5">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.to}
                          className="text-xs text-gray-400 hover:text-white py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-10 space-y-5 border-t border-[#1a1a1a] pt-6">
                <Link href="/account" className="flex items-center gap-3 text-xs tracking-widest text-gray-400 uppercase hover:text-white">
                  <UserCircle2 className="w-4 h-4 stroke-[1.5]" /> My Account
                </Link>
                <a href="tel:+919911636888" className="flex items-center gap-3 text-xs tracking-widest text-gray-400 uppercase hover:text-white">
                  <Phone className="w-4 h-4 stroke-[1.5]" /> Help Center
                </a>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-[#0f0f0f] z-[60] p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">Search</span>
            <button onClick={() => setShowMobileSearch(false)}>
              <HiOutlineX className="text-2xl text-gray-400" />
            </button>
          </div>
          <form onSubmit={handleSearch}>
            <input
              autoFocus
              type="text"
              placeholder="Search security products..."
              className="w-full text-lg border-b border-[#333] bg-transparent pb-4 focus:outline-none placeholder-[#444] text-white focus:border-[#2563eb] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => { router.push(`/search?q=${chip}`); setShowMobileSearch(false); }}
                  className="px-4 py-2 border border-[#252525] bg-[#161616] text-xs font-medium text-gray-300 hover:border-[#2563eb] hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
