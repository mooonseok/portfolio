import { SiteHeader } from '@/components/organisms/site-header';
import { SiteFooter } from '@/components/organisms/site-footer';
import { DioramaPreviewContainer } from '@/components/organisms/project-workshop/diorama-preview-container';
import { EngineeringStoriesContainer } from '@/sections/engineering-stories/engineering-stories-container';
import { ToolsContainer } from '@/sections/tools/tools-container';
export function WorkshopHome() {
  return (
    <DioramaPreviewContainer
      home
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <EngineeringStoriesContainer compact />
      <ToolsContainer compact />
    </DioramaPreviewContainer>
  );
}
