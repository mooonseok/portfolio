import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/content';
import { siteSettings, siteSitemap } from '@/lib/site-metadata';
import { ROUTE } from '@/constants/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteSitemap(
    siteSettings(process.env.SITE_URL, process.env.SITE_INDEXABLE),
    getProjects().map((project) => project.slug),
    [ROUTE.HISTORY, ROUTE.AI_PRACTICE]
  );
}
