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
  title: 'Tap2Buy - Shop Everything You Love | Best Deals Online India',
  description: 'Tap2Buy is your one-stop online shopping destination in India. Shop electronics, fashion, home essentials, beauty, sports, toys & more at the best prices. 100% authentic products with fast delivery.',
  keywords: 'online shopping india, buy electronics online, fashion online india, home essentials, beauty products, sports equipment, tap2buy, best deals india, authentic products, fast delivery, tap2buy.in',
  openGraph: {
    title: 'Tap2Buy - Shop Everything You Love',
    description: 'Your trusted online shopping destination. Best prices on electronics, fashion, home essentials & more with 100% authentic products.',
    url: 'https://tap2buy.in',
    siteName: 'Tap2Buy',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tap2Buy - Shop Everything You Love',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tap2Buy - Shop Everything You Love',
    description: 'Your trusted online shopping destination in India. Best prices, fast delivery, easy returns.',
    images: ['/logo.png'],
    creator: '@tap2buyin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://tap2buy.in',
  },
  category: 'ecommerce',
  classification: 'Online Shopping & Retail',
  authors: [{ name: 'Tap2Buy' }],
  creator: 'Tap2Buy',
  publisher: 'Tap2Buy',
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
        <meta name="theme-color" content="#FF6B00" />
        <meta name="msapplication-TileColor" content="#1B2A4A" />

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
              "name": "Tap2Buy",
              "description": "India's trusted online shopping destination offering electronics, fashion, home essentials, beauty, sports and more at best prices.",
              "url": "https://tap2buy.in",
              "logo": "https://tap2buy.in/logo.png",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Tap2Buy Founder"
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
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "support@tap2buy.in",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.facebook.com/tap2buyin",
                "https://www.instagram.com/tap2buyin",
                "https://www.youtube.com/@tap2buyin"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Tap2Buy",
                "logo": "https://tap2buy.in/logo.png",
                "slogan": "Shop Everything You Love"
              },
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": [
                  { "@type": "Product", "name": "Electronics", "category": "Consumer Electronics", "brand": "Tap2Buy" },
                  { "@type": "Product", "name": "Fashion", "category": "Clothing & Apparel", "brand": "Tap2Buy" },
                  { "@type": "Product", "name": "Home & Living", "category": "Home Essentials", "brand": "Tap2Buy" },
                  { "@type": "Product", "name": "Beauty & Personal Care", "category": "Beauty", "brand": "Tap2Buy" },
                  { "@type": "Product", "name": "Sports & Fitness", "category": "Sports", "brand": "Tap2Buy" }
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
              "name": "Tap2Buy",
              "url": "https://tap2buy.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://tap2buy.in/shop?search={search_term_string}"
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
              "name": "Tap2Buy Product Categories",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Electronics", "url": "https://tap2buy.in/shop?category=electronics" },
                { "@type": "ListItem", "position": 2, "name": "Fashion", "url": "https://tap2buy.in/shop?category=fashion" },
                { "@type": "ListItem", "position": 3, "name": "Home & Living", "url": "https://tap2buy.in/shop?category=home-living" },
                { "@type": "ListItem", "position": 4, "name": "Beauty", "url": "https://tap2buy.in/shop?category=beauty" },
                { "@type": "ListItem", "position": 5, "name": "Sports", "url": "https://tap2buy.in/shop?category=sports" },
                { "@type": "ListItem", "position": 6, "name": "Books", "url": "https://tap2buy.in/shop?category=books" },
                { "@type": "ListItem", "position": 7, "name": "Toys", "url": "https://tap2buy.in/shop?category=toys" },
                { "@type": "ListItem", "position": 8, "name": "Grocery", "url": "https://tap2buy.in/shop?category=grocery" }
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
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tap2buy.in" },
                { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://tap2buy.in/shop" },
                { "@type": "ListItem", "position": 3, "name": "Collections", "item": "https://tap2buy.in/collections" }
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
              page_title: 'Tap2Buy',
              page_location: window.location.href,
              content_group1: 'Online Shopping',
              content_group2: 'Ecommerce India',
              custom_map: {
                'dimension1': 'tap2buy',
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
                'item_brand': 'Tap2Buy'
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

      <body className="overflow-x-hidden overflow-y-scroll antialiased bg-[#0f0f0f] text-white">
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
