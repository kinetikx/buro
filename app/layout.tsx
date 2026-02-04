import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Komlu Hukuk',
    default: 'Komlu Hukuk Bürosu - Av. Kürşat Komlu | Erzurum',
  },
  description: 'Erzurum odaklı, güvenilir ve başarılı hukuki danışmanlık hizmetleri. Boşanma, Ceza, İş ve Miras hukuku alanlarında uzman kadro.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://komluhukuk.com',
    siteName: 'Komlu Hukuk Bürosu',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Komlu Hukuk Bürosu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@komluhukuk',
    creator: '@kursatkomlu',
  },
  icons: {
    icon: '/hero-image.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Komlu Hukuk Bürosu',
  image: 'https://komluhukuk.com/hero-image.png',
  url: 'https://komluhukuk.com',
  telephone: '+905416255626',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Merkez',
    addressLocality: 'Erzurum',
    postalCode: '25000',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.9043,
    longitude: 41.2679,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/komluhukuk',
    'https://www.instagram.com/komluhukuk',
    'https://www.linkedin.com/company/komluhukuk',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased text-foreground selection:bg-gold-100 selection:text-navy-900',
          playfair.variable,
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
