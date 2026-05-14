'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  onClose?: () => void;
}

export default function AnnouncementBar({ onClose }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isClosed = localStorage.getItem('announcementBarClosed');
    if (isClosed) setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcementBarClosed', 'true');
    onClose?.();
  };

  if (!isVisible) return null;

  const announcements = [
    {
      icon: '🛡️',
      text: (
        <span>
          Use code{' '}
          <span className="font-bold tracking-wider text-white bg-white/10 px-2 py-0.5 rounded mx-1 border border-white/10">
            SECURE10
          </span>
          {' '}&amp; get <span className="font-bold text-[#2563eb]">10% OFF</span> on your first order!
        </span>
      ),
    },
    {
      icon: '🚚',
      text: (
        <span>
          <span className="font-bold text-white">Fast Delivery</span> across{' '}
          <span className="font-bold text-[#2563eb]">Delhi NCR</span> — Same-day available on select products!
        </span>
      ),
    },
    {
      icon: '📷',
      text: (
        <span>
          <span className="font-bold text-[#2563eb]">CCTV Sale Live!</span>{' '}
          Up to <span className="font-bold text-white">50% OFF</span> on cameras &amp; DVR systems.{' '}
          <Link href="/sale" className="underline underline-offset-2 hover:text-[#2563eb] transition-colors font-semibold">
            Shop Now →
          </Link>
        </span>
      ),
    },
    {
      icon: '✅',
      text: (
        <span>
          <span className="font-bold text-white">100% Genuine Products</span> — Authorised distributors &amp; brand-certified quality guaranteed!
        </span>
      ),
    },
  ];

  const content = (
    <span className="inline-flex items-center gap-6 whitespace-nowrap">
      {announcements.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 px-6">
          <span className="text-sm flex-shrink-0">{item.icon}</span>
          <span className="text-xs sm:text-[13px] text-gray-300 font-light tracking-wide leading-tight">
            {item.text}
          </span>
          {i < announcements.length - 1 && (
            <span className="ml-6 text-[#333] flex-shrink-0">•</span>
          )}
        </span>
      ))}
    </span>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] bg-[#0a0a0a] border-b border-[#2563eb]/20">
      <div className="relative flex items-center h-10 lg:h-11 overflow-hidden">

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="w-full overflow-hidden">
          <div
            className="flex items-center hover:[animation-play-state:paused]"
            style={{
              animation: 'marquee-loop 30s linear infinite',
              width: 'max-content',
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                {content}
              </div>
            ))}
          </div>
        </div>

        {/* Right fade */}
        <div className="absolute right-8 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5 text-gray-500 hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
