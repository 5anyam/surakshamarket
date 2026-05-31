import './styles/globals.css';
import ReactQueryProvider from '../../components/ReactQueryProvider';
import { CartProvider } from '../../lib/cart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthProvider } from '../../lib/AuthContext';
import Script from 'next/script';
import { ThemeProvider } from '../../components/ThemeProvider';
import Loader from '../../components/Loader';

export const metadata = {
  title: 'Suraksha Market - Professional Security & Surveillance Solutions | Delhi NCR',
  description: 'Suraksha Market is Delhi NCR\'s trusted destination for professional CCTV cameras, video door phones, alarms, access control & complete surveillance systems. 100% genuine products with fast delivery.',
  keywords: 'CCTV camera Delhi, video door phone, security camera, surveillance system, alarm system, access control Delhi NCR, smart lock, DVR NVR, outdoor camera, GPS tracker, surakhshamarket',
  openGraph: {
    title: 'Suraksha Market - Professional Security Solutions',
    description: 'Delhi NCR\'s trusted source for CCTV cameras, video door phones, alarms & complete surveillance systems. Genuine products with expert support.',
    url: 'https://surakhshamarket.com',
    siteName: 'Suraksha Market',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Suraksha Market - Professional Security Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suraksha Market - Professional Security Solutions',
    description: 'Delhi NCR\'s trusted source for professional security products. CCTV, alarms, access control & more.',
    images: ['/logo.png'],
    creator: '@surakhshamarket',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
    },
  },
  alternates: {
    canonical: 'https://surakhshamarket.com',
  },
  category: 'security',
  classification: 'Security & Surveillance Products',
  authors: [{ name: 'Suraksha Market' }],
  creator: 'Suraksha Market',
  publisher: 'Suraksha Market',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtagId = 'AW-XXXXXXXXX';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Sora (headings) + Inter (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#1e40af" />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />

        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Suraksha Market",
              "description": "Delhi NCR's trusted destination for professional CCTV cameras, video door phones, alarms, access control and complete surveillance systems.",
              "url": "https://surakhshamarket.com",
              "logo": "https://surakhshamarket.com/logo.png",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Suraksha Market Founder"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9911636888",
                "contactType": "customer service",
                "email": "support@surakhshamarket.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.facebook.com/surakhshamarket",
                "https://www.instagram.com/surakhshamarket",
                "https://www.youtube.com/@surakhshamarket"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Suraksha Market",
                "logo": "https://surakhshamarket.com/logo.png",
                "slogan": "Your Security, Our Priority"
              },
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": [
                  { "@type": "Product", "name": "CCTV Cameras", "category": "Surveillance", "brand": "Suraksha Market" },
                  { "@type": "Product", "name": "Video Door Phones", "category": "Security", "brand": "Suraksha Market" },
                  { "@type": "Product", "name": "Alarms & Sensors", "category": "Security", "brand": "Suraksha Market" },
                  { "@type": "Product", "name": "Access Control", "category": "Security", "brand": "Suraksha Market" },
                  { "@type": "Product", "name": "Smart Locks", "category": "Security", "brand": "Suraksha Market" }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1200",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* WebSite + Sitelinks Searchbox Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Suraksha Market",
              "url": "https://surakhshamarket.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://surakhshamarket.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Product Categories ItemList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Suraksha Market Product Categories",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "CCTV Cameras", "url": "https://surakhshamarket.com/category/cctv-cameras" },
                { "@type": "ListItem", "position": 2, "name": "Video Door Phones", "url": "https://surakhshamarket.com/category/video-door-phones" },
                { "@type": "ListItem", "position": 3, "name": "Alarms & Sensors", "url": "https://surakhshamarket.com/category/alarms-sensors" },
                { "@type": "ListItem", "position": 4, "name": "Access Control", "url": "https://surakhshamarket.com/category/access-control" },
                { "@type": "ListItem", "position": 5, "name": "DVR/NVR Systems", "url": "https://surakhshamarket.com/category/dvr-nvr-systems" },
                { "@type": "ListItem", "position": 6, "name": "Smart Locks", "url": "https://surakhshamarket.com/category/smart-locks" },
                { "@type": "ListItem", "position": 7, "name": "Outdoor Cameras", "url": "https://surakhshamarket.com/category/outdoor-cameras" },
                { "@type": "ListItem", "position": 8, "name": "GPS Trackers", "url": "https://surakhshamarket.com/category/gps-trackers" }
              ]
            })
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://surakhshamarket.com" },
                { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://surakhshamarket.com/collections" },
                { "@type": "ListItem", "position": 3, "name": "Deals", "item": "https://surakhshamarket.com/sale" }
              ]
            })
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "upgau66qzf");
            `
          }}
        />

        {/* Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1944720636112584');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1944720636112584&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}', {
              page_title: 'Suraksha Market',
              page_location: window.location.href,
              content_group1: 'Online Shopping',
              content_group2: 'Ecommerce India',
              custom_map: {
                'dimension1': 'surakhshamarket',
                'dimension2': 'ecommerce'
              }
            });
            gtag('config', '${gtagId}', {
              'enhanced_ecommerce': true
            });
            gtag('event', 'view_item_list', {
              'items': [{
                'item_name': 'Featured Products',
                'item_category': 'All Categories',
                'item_brand': 'Suraksha Market'
              }]
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
      </head>

      <body className="overflow-x-hidden overflow-y-scroll antialiased bg-white text-gray-900">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Loader />

        <ThemeProvider>
          <ReactQueryProvider>
            <CartProvider>
              <AuthProvider>
                <Header />
                <main role="main" className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </AuthProvider>
            </CartProvider>
          </ReactQueryProvider>
        </ThemeProvider>

        {/* Facebook Customer Chat */}
        <Script id="facebook-chat" strategy="lazyOnload">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            if(chatbox) {
              chatbox.setAttribute("page_id", "YOUR_PAGE_ID");
              chatbox.setAttribute("attribution", "biz_inbox");
            }
            window.fbAsyncInit = function() {
              FB.init({ xfbml: true, version: 'v18.0' });
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </body>
    </html>
  );
}
