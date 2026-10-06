import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';
import { Box } from '@/components/atoms/box';
import { SiteHeader } from '@/components/organisms/site-header';
import { SignalLine } from '@/components/organisms/signal-line';
import { SiteFooter } from '@/components/organisms/site-footer';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { FeaturedWorkContainer } from '@/sections/featured-work/featured-work-container';
import { HeroContainer } from '@/sections/hero/hero-container';
import { SelectedWorkContainer } from '@/sections/selected-work/selected-work-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
import { TAG } from '@/constants/tag';

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
    <Box className='relative [--signal-bottom:0px] [--signal-top:560px] short-land:[--signal-top:320px]'>
      <SignalLine />
      <SiteHeader />
      <Box as={TAG.MAIN} id='main-content' tabIndex={-1}>
        <HeroContainer />
        <FeaturedWorkContainer />
        <SelectedWorkContainer />
        <EngineeringStoriesContainer />
        <ToolsContainer />
      </Box>
      <SiteFooter />
    </Box>
  );
}
