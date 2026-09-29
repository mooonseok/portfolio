import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { site } from '@/content/site';
import { LINK_AS } from '@/constants/tag';

const plex = localFont({
  src: '../../public/fonts/ibm-plex-mono/IBMPlexMono-Regular-latin.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-plex',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `${site.disciplines}. ${site.range.label} ${site.range.years}.`,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F3F2ED',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={plex.variable} suppressHydrationWarning>
      <head>
        <link
          rel='preload'
          href='/fonts/general-sans/GeneralSans-Medium.woff2'
          as={LINK_AS.FONT}
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
