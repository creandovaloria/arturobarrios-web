import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@lib/constants';
import SchemaMarkup from '@components/SchemaMarkup';
import Footer from '@components/organisms/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'full-stack developer',
    'digital products',
    'AI integration',
    'process automation',
    'Mexico',
    'software development',
    'next.js',
    'react',
  ],
  authors: [{ name: 'Arturo Barrios', url: SITE_URL }],
  creator: 'Arturo Barrios',
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'Technology',
  classification: 'Professional Services',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/hero-poster.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: '@arturobarrios',
    images: [`${SITE_URL}/images/hero-poster.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      'es-MX': SITE_URL,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* charset, viewport, theme-color, description y canonical los genera
            Next.js desde los exports `metadata` y `viewport` de este archivo.
            No duplicar aquí (duplicarlos rompe SEO y los tests E2E). */}
        <meta name="color-scheme" content="light dark" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <SchemaMarkup />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
