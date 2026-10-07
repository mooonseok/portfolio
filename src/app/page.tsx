import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';
import { HOME } from '@/constants/home';
import { ClassicHome } from './_home/classic-home';
import { WorkshopHome } from './_home/workshop-home';

export const metadata: Metadata = pageMetadata(
  siteSettings(process.env.SITE_URL, process.env.SITE_INDEXABLE),
  {
    title: `${site.name} — ${site.role}`,
    description: site.headline,
    path: '/',
    siteName: site.name,
  }
);

export default function HomePage() {
  return HOME.WORKSHOP_ENABLED ? <WorkshopHome /> : <ClassicHome />;
}
