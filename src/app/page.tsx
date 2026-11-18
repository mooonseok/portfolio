import type { Metadata, Viewport } from 'next';
import { Box } from '@/components/atoms/box';
import { SiteHeader } from '@/components/organisms/site-header';
import { site } from '@/content/site';
import { NAV_ID } from '@/constants/navigation';
import { TAG } from '@/constants/tag';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';
import { ActivityContainer } from '@/sections/activity/activity-container';
import { ActivityFooter } from '@/sections/activity/activity-footer';

export const revalidate = 3600;

export const viewport: Viewport = { themeColor: '#060513' };

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
  return (
    <Box className='relative bg-night-deep text-moonlight'>
      <SiteHeader dark current={NAV_ID.ACTIVITY} />
      <Box as={TAG.MAIN} id='main-content' tabIndex={-1}>
        <ActivityContainer />
      </Box>
      <ActivityFooter />
    </Box>
  );
}
