import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@lib/constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['developer', 'designer', 'digital products', 'full-stack'],
  authors: [{ name: 'Arturo Barrios' }],
  creator: 'Arturo Barrios',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: '@arturobarrios',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
