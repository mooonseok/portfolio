import { ProjectSummaryView } from '@/components/organisms/project-summary-view';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { EmosaveBlock } from '@/dto/featured-work.dto';
import { TAG } from '@/constants/tag';

export function EmosaveBlockView({ project, href }: EmosaveBlock) {
  return (
    <ScrollScene
      as={TAG.ARTICLE}
      id={project.slug}
      steps={false}
      className='col-span-full border-t border-t-hairline pt-10 tab:pt-14'
    >
      <ProjectSummaryView project={project} href={href} />
    </ScrollScene>
  );
}
