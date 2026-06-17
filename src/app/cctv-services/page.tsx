'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Camera, Shield, CheckCircle, Phone, Star, Zap, Eye,
  Wifi, Clock, Award, ChevronDown, ChevronUp, ArrowRight,
  MapPin, Video, Lock, Radio, Monitor, Wrench, Users,
} from 'lucide-react';

const WHATSAPP_NUMBER = '918076781736';
const WHATSAPP_MSG = encodeURIComponent('Hello! I am interested in CCTV camera installation services. Please share more details.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const CAMERA_TYPES = [
  {
    icon: <Camera className="w-7 h-7" />,
    title: 'Dome Cameras',
    desc: 'Best for indoor ceilings. 360° coverage with vandal-proof design.',
    badge: 'Most Popular',
  },
  {
    icon: <Video className="w-7 h-7" />,
    title: 'Bullet Cameras',
    desc: 'Long-range outdoor surveillance with rain & dust proof housing.',
    badge: null,
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: 'PTZ Cameras',
    desc: 'Pan-Tilt-Zoom control for wide area coverage with remote operation.',
    badge: 'Premium',
  },
  {
    icon: <Wifi className="w-7 h-7" />,
    title: 'IP / WiFi Cameras',
    desc: 'Wire-free setup with live view on your phone, anywhere anytime.',
    badge: 'Smart',
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    title: 'DVR / NVR Systems',
    desc: 'Complete recording solution with HD storage up to 90 days.',
    badge: null,
  },
  {
    icon: <Radio className="w-7 h-7" />,
    title: 'AI / Smart Cameras',
    desc: 'Face detection, motion alerts & number plate recognition built-in.',
    badge: 'New',
  },
];

const SERVICES = [
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Professional Installation',
    desc: 'Clean wiring and proper camera angle setup by certified technicians.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'AMC & Maintenance',
    desc: 'Annual Maintenance Contract covering regular checkups, cleaning and repairs.',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Remote Monitoring Setup',
    desc: 'We configure live CCTV access on your smartphone — iOS and Android.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Same Day Service',
    desc: 'Urgent installation available across Delhi NCR — call us right now.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'System Upgrade',
    desc: 'Upgrade your old analog system to a modern HD / IP camera system.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Bulk / Society Orders',
    desc: 'Special packages available for housing societies, offices and factories.',
  },
];

const TRUST_POINTS = [
  { icon: <Award className="w-5 h-5" />, text: '5000+ Installations Done' },
  { icon: <Star className="w-5 h-5" />, text: '4.8★ Customer Rating' },
  { icon: <Clock className="w-5 h-5" />, text: '3 Year Warranty on Products' },
  { icon: <MapPin className="w-5 h-5" />, text: 'Serving All Delhi NCR' },
];

const FAQS = [
  {
    q: 'How long does CCTV installation take?',
    a: 'A standard home with 4 cameras typically takes 4–6 hours. Larger projects such as offices or societies may take 1–2 days.',
  },
  {
    q: 'Do your cameras record at night?',
    a: 'Yes! All our cameras come with infrared (IR) night vision. You get clear footage up to 30–100 metres even in complete darkness.',
  },
  {
    q: 'How can I watch live CCTV footage on my phone?',
    a: 'We connect the DVR/NVR to your WiFi and set up the mobile app for you. It works on both iPhone and Android devices.',
  },
  {
    q: 'How many cameras do I need for my home?',
    a: 'For a standard 3BHK we recommend 4–6 cameras covering the main door, back door, parking and living area. WhatsApp us for a free site survey.',
  },
  {
    q: 'Do you offer an AMC (Annual Maintenance Contract)?',
    a: 'Yes, our AMC covers regular checkups, cleaning, software updates and emergency repair visits — all under one plan.',
  },
  {
    q: 'Does CCTV work without the internet?',
    a: 'Absolutely. A local DVR/NVR system records continuously on its own storage without requiring any internet connection.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#2563eb] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

export default function CCTVServicesPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-[#1e3a8a] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Delhi NCR&apos;s Trusted Partner</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
                Professional CCTV<br />
                <span className="text-blue-400">Installation &</span><br />
                Security Solutions
              </h1>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
                Home or office — our certified technicians design and install the best CCTV setup for you. HD quality, night vision and mobile remote access all included.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+918076781736"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call: +91 80767 81736
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              {TRUST_POINTS.map((p, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                    {p.icon}
                  </div>
                  <span className="text-sm font-semibold text-white">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMERA TYPES ── */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-full px-4 py-1.5 mb-4">
            <Camera className="w-3.5 h-3.5 text-[#2563eb]" />
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider">Camera Range</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            A Camera for Every Need
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            We stock all types of CCTV cameras — for homes, offices, factories and shops.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAMERA_TYPES.map((cam, i) => (
            <div
              key={i}
              className="group relative border border-gray-200 rounded-2xl p-6 hover:border-[#2563eb]/40 hover:shadow-lg transition-all duration-200"
            >
              {cam.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2563eb] text-white uppercase tracking-wide">
                  {cam.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb] mb-4 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                {cam.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{cam.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cam.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-full px-4 py-1.5 mb-4">
              <Wrench className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              What We Do
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              We don&apos;t just sell cameras — we deliver complete, end-to-end security solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb] shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-full px-4 py-1.5 mb-5">
              <Star className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Why Choose<br />Suraksha Market?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              With 5000+ successful installations across Delhi NCR, we are a name you can trust. Our technicians are certified and we use only genuine, branded products.
            </p>
            <div className="space-y-3">
              {[
                'Hikvision, Dahua, CP Plus — 100% Original Brands',
                'Free Site Survey — No obligation, just call us',
                '1 Year Free Service After Installation',
                'Same Day Response — Call today, get it done tomorrow',
                'Transparent Pricing — No hidden charges',
                '24×7 WhatsApp Support Available',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: '5000+', label: 'Cameras Installed', color: 'bg-blue-50 border-blue-100' },
              { value: '4.8★', label: 'Average Rating', color: 'bg-yellow-50 border-yellow-100' },
              { value: '10+', label: 'Years Experience', color: 'bg-green-50 border-green-100' },
              { value: '24/7', label: 'Support Available', color: 'bg-purple-50 border-purple-100' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.color} border rounded-2xl p-6 text-center`}>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#2563eb] py-16 lg:py-20 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-blue-200 text-sm max-w-md mx-auto">Your CCTV system ready in just 4 simple steps</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'WhatsApp Us', desc: 'Share your requirements — location, number of cameras, budget.' },
              { step: '02', title: 'Free Site Survey', desc: 'Our expert visits and suggests the best camera placement.' },
              { step: '03', title: 'Get a Quote', desc: 'Receive a transparent quote — no hidden charges, ever.' },
              { step: '04', title: 'Installation Done!', desc: 'Same day or next day — professional installation complete.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-blue-200 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Your CCTV System<br />Installed Today!
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            WhatsApp us now for a free site survey. Our experts will understand your security needs and recommend the best solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm shadow-xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message Us on WhatsApp
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Browse CCTV Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 group"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.815 0 00-3.48-8.413z" />
        </svg>
        <span className="text-sm hidden sm:inline">WhatsApp for CCTV Services</span>
      </a>

    </div>
  );
}
