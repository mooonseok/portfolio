import { ProjectSummaryView } from '@/components/organisms/project-summary-view';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { FarmFamWorkBlock } from '@/dto/selected-work.dto';
import { TAG } from '@/constants/tag';

export function FarmFamBlockView({ project, href }: FarmFamWorkBlock) {
  return (
    <ScrollScene
      as={TAG.ARTICLE}
      id={project.slug}
      steps={false}
      className='container py-14 tab:py-24 lap:py-30'
    >
      <ProjectSummaryView project={project} href={href} />
    </ScrollScene>
  );
}
