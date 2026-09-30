import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { site } from '@/content/site';
import { Anchor } from '@/components/atoms/anchor';
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
      </head>
      <body>
        <Anchor
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-paper focus:p-3 focus:text-ink'
        >
          본문으로 건너뛰기
        </Anchor>
        {children}
      </body>
    </html>
  );
}
