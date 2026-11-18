import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { SiteHeader } from '@/components/organisms/site-header';
import { SiteFooter } from '@/components/organisms/site-footer';
import { HistoryPicker } from '@/components/organisms/project-workshop/history-picker';
import { NAV_ID } from '@/constants/navigation';
import { HEADING, TAG } from '@/constants/tag';
import { projects } from '@/content/projects';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
import { AiPracticeSummaryContainer } from '@/sections/ai-practice-summary/ai-practice-summary-container';

const entries = projects.map(
  ({ slug, title, period, surfaces, summary, visuals }) => ({
    slug,
    title,
    period,
    surfaces,
    summary,
    visual: visuals.home,
  })
);

export function WorkshopHome() {
  return (
    <>
      <SiteHeader current={NAV_ID.HISTORY} />
      <Box as={TAG.MAIN} id='main-content' tabIndex={-1}>
        <Box
          as={TAG.SECTION}
          id='work'
          className='mx-auto w-[92%] max-w-[1220px] pt-10 pb-12 tab:pt-16'
        >
          <Box id='flutter-work' />
          <Heading
            level={HEADING.H1}
            className='mb-8 text-[clamp(44px,6vw,84px)] leading-[1.1] font-medium tracking-[-.05em]'
          >
            프로젝트 이력
          </Heading>
          <HistoryPicker entries={entries} />
        </Box>
        <EngineeringStoriesContainer compact />
        <ToolsContainer compact />
        <AiPracticeSummaryContainer />
      </Box>
      <SiteFooter />
    </>
  );
}
