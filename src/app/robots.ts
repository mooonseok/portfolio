import type { MetadataRoute } from 'next';
import { siteRobots, siteSettings } from '@/lib/site-metadata';

export default function robots(): MetadataRoute.Robots {
  return siteRobots(
    siteSettings(process.env.SITE_URL, process.env.SITE_INDEXABLE)
  );
}
