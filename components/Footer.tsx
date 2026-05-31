import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, ShieldCheck } from "lucide-react";

const shopCategories = [
  { name: "CCTV Cameras",      to: "/category/cctv-cameras" },
  { name: "Video Door Phones", to: "/category/video-door-phones" },
  { name: "Alarms & Sensors",  to: "/category/alarms-sensors" },
  { name: "Access Control",    to: "/category/access-control" },
  { name: "DVR/NVR Systems",   to: "/category/dvr-nvr-systems" },
  { name: "Smart Locks",       to: "/category/smart-locks" },
  { name: "Outdoor Cameras",   to: "/category/outdoor-cameras" },
  { name: "GPS Trackers",      to: "/category/gps-trackers" },
];

const helpLinks = [
  { name: "My Account",         to: "/account" },
  { name: "Track My Order",     to: "/track-order" },
  { name: "Returns & Refunds",  to: "/returns-and-refunds-policy" },
  { name: "Shipping Policy",    to: "/shipping-policy" },
  { name: "Privacy Policy",     to: "/privacy-policy" },
  { name: "Terms & Conditions", to: "/terms-and-conditions" },
  { name: "Contact Us",         to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-500 border-t border-gray-200">

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#2563eb]" />
            <span className="font-sora font-extrabold text-xl tracking-tight text-gray-900">
              Suraksha<span className="text-[#2563eb]">Market</span>
            </span>
          </Link>
          <p className="text-[12px] leading-relaxed text-gray-500">
            Delhi NCR&apos;s trusted destination for professional surveillance &amp; security solutions — CCTV cameras, video door phones, alarms, and more.
          </p>
          <div className="flex gap-4 mt-1">
            <a href="https://instagram.com/surakhshamarket" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-[#2563eb] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/@surakhshamarket" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-[#2563eb] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/surakhshamarket" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-[#2563eb] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-900 mb-5">
            Product Categories
          </h4>
          <ul className="flex flex-col gap-3">
            {shopCategories.map((cat) => (
              <li key={cat.to}>
                <Link href={cat.to} className="text-[12px] text-gray-500 hover:text-[#2563eb] transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-900 mb-5">
            Help & Info
          </h4>
          <ul className="flex flex-col gap-3">
            {helpLinks.map((link) => (
              <li key={link.to}>
                <Link href={link.to} className="text-[12px] text-gray-500 hover:text-[#2563eb] transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-900 mb-5">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="tel:+919911636888"
                 className="flex items-start gap-3 text-[12px] text-gray-500 hover:text-[#2563eb] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                +91 99116 36888
              </a>
            </li>
            <li>
              <a href="mailto:support@surakhshamarket.com"
                 className="flex items-start gap-3 text-[12px] text-gray-500 hover:text-[#2563eb] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                support@surakhshamarket.com
              </a>
            </li>
            <li className="flex items-start gap-3 text-[12px] text-gray-500">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Delhi NCR, India
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-200" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] tracking-widest text-gray-400">
          © {new Date().getFullYear()} Suraksha Market. All rights reserved. Serving Delhi NCR.
        </p>
        <div className="flex items-center gap-3">
          {["Visa", "Mastercard", "UPI", "Razorpay"].map((method) => (
            <span key={method}
              className="text-[10px] uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-1">
              {method}
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}
