import { Box } from '@/components/atoms/box';
import { SiteHeader } from '@/components/organisms/site-header';
import { SignalLine } from '@/components/organisms/signal-line';
import { SiteFooter } from '@/components/organisms/site-footer';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { ExperienceContainer } from '@/sections/experience/experience-container';
import { FeaturedWorkContainer } from '@/sections/featured-work/featured-work-container';
import { HeroContainer } from '@/sections/hero/hero-container';
import { SelectedWorkContainer } from '@/sections/selected-work/selected-work-container';
import { ThisWebsiteContainer } from '@/sections/this-website/this-website-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
import { TAG } from '@/constants/tag';

export default function HomePage() {
  return (
    <Box className='relative [--signal-bottom:0px] [--signal-top:560px] short-land:[--signal-top:320px]'>
      <SignalLine />
      <SiteHeader />
      <Box as={TAG.MAIN} id='main-content' tabIndex={-1}>
        <HeroContainer />
        <SelectedWorkContainer />
        <FeaturedWorkContainer />
        <EngineeringStoriesContainer />
        <ExperienceContainer />
        <ToolsContainer />
        <ThisWebsiteContainer />
      </Box>
      <SiteFooter />
    </Box>
  );
}
