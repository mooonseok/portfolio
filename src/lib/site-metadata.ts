import { isIP } from 'node:net';
import type { Metadata, MetadataRoute } from 'next';
import type { SiteSettings } from '@/dto/site-metadata.dto';

export function siteSettings(url?: string, indexable?: string): SiteSettings {
  if (indexable && indexable !== 'true' && indexable !== 'false') {
    throw new Error('SITE_INDEXABLE must be "true", "false", or unset.');
  }
  if (!url) return { indexable: false };
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('SITE_URL must be a valid HTTPS origin.');
  }
  const host = parsed.hostname.toLowerCase().replace(/\.$/, '');
  const local =
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    isIP(host.replace(/^\[|\]$/g, '')) !== 0;
  if (
    !/^https:\/\/[^/?#]+\/?$/.test(url) ||
    parsed.protocol !== 'https:' ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash ||
    local
  ) {
    throw new Error(
      'SITE_URL must be a public HTTPS origin without credentials, path, query, or fragment.'
    );
  }
  return { origin: parsed.origin, indexable: indexable === 'true' };
}

export function pageMetadata(
  settings: SiteSettings,
  page: { title: string; description: string; path: string; siteName: string }
): Metadata {
  const { title, description, path, siteName } = page;
  const { origin, indexable } = settings;
  const url = origin ? new URL(path, origin).href : undefined;
  const images = origin
    ? [
        {
          url: new URL('/social/portfolio.png', origin).href,
          width: 1200,
          height: 630,
          alt: `${siteName} 포트폴리오`,
        },
      ]
    : undefined;
  return {
    title,
    description,
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    ...(url ? { alternates: { canonical: url } } : {}),
    robots: { index: indexable, follow: indexable },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName,
      title,
      description,
      ...(url ? { url } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export function siteRobots(settings: SiteSettings): MetadataRoute.Robots {
  if (!settings.indexable || !settings.origin) {
    return { rules: { userAgent: '*', allow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', settings.origin).href,
  };
}

export function siteSitemap(
  settings: SiteSettings,
  slugs: readonly string[]
): MetadataRoute.Sitemap {
  if (!settings.indexable || !settings.origin) return [];
  return ['/', ...slugs.map((slug) => `/work/${slug}`)].map((path) => ({
    url: new URL(path, settings.origin).href,
  }));
}
