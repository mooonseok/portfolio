import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { site } from '@/content/site';

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex',
  display: 'swap',
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
          rel='preconnect'
          href='https://api.fontshare.com'
          crossOrigin=''
        />
        <link
          rel='preconnect'
          href='https://cdn.fontshare.com'
          crossOrigin=''
        />
        <link rel='preconnect' href='https://cdn.jsdelivr.net' crossOrigin='' />
        <link
          rel='stylesheet'
          href='https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
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
