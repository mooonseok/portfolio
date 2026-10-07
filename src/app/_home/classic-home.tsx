import { Box } from '@/components/atoms/box';
import { SiteHeader } from '@/components/organisms/site-header';
import { SiteFooter } from '@/components/organisms/site-footer';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { FeaturedWorkContainer } from '@/sections/featured-work/featured-work-container';
import { HeroContainer } from '@/sections/hero/hero-container';
import { SelectedWorkContainer } from '@/sections/selected-work/selected-work-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
import { TAG } from '@/constants/tag';

export function ClassicHome() {
  return (
    <Box className='relative'>
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
