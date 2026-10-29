import type { Metadata, Viewport } from 'next';
import { Box } from '@/components/atoms/box';
import { SiteHeader } from '@/components/organisms/site-header';
import { site } from '@/content/site';
import { NAV_ID } from '@/constants/navigation';
import { TAG } from '@/constants/tag';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';
import { ActivityContainer } from '@/sections/activity/activity-container';
import { ActivityFooter } from '@/sections/activity/activity-footer';
import { OpenerContainer } from '@/sections/opener/opener-container';

export const revalidate = 3600;

export const viewport: Viewport = { themeColor: '#0B1428' };

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
      <Box className='absolute inset-x-0 top-0 z-20'>
        <SiteHeader dark current={NAV_ID.ACTIVITY} />
      </Box>
      <Box as={TAG.MAIN} id='main-content' tabIndex={-1}>
        <ActivityContainer />
      </Box>
      <ActivityFooter />
      <OpenerContainer />
    </Box>
  );
}
