import { SiteHeader } from '@/components/organisms/site-header';
import { NAV_ID } from '@/constants/navigation';
import { SiteFooter } from '@/components/organisms/site-footer';
import { DioramaPreviewContainer } from '@/components/organisms/project-workshop/diorama-preview-container';
import { OpeningReplay } from '@/components/organisms/project-workshop/opening-replay';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
import { AiPracticeSummaryContainer } from '@/sections/ai-practice-summary/ai-practice-summary-container';
export function WorkshopHome() {
  return (
    <DioramaPreviewContainer
      home
      header={<SiteHeader current={NAV_ID.HISTORY} />}
      footer={
        <SiteFooter>
          <OpeningReplay />
        </SiteFooter>
      }
    >
      <EngineeringStoriesContainer compact />
      <ToolsContainer compact />
      <AiPracticeSummaryContainer />
    </DioramaPreviewContainer>
  );
}
