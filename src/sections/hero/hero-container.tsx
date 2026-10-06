import { HeroView } from './hero-view';
import { Whiteboard } from '@/components/organisms/whiteboard/whiteboard';
import { site } from '@/content/site';
import { boardColumns, boardFloors } from '@/lib/board';
import { getProjects } from '@/lib/content';

export function HeroContainer() {
  return (
    <HeroView
      primaryAction={site.primaryAction}
      name={site.name}
      github={site.contact.github}
      role={site.role}
      disciplines={site.disciplines}
      range={site.range}
      headline={site.headline}
      introduction={site.introduction}
      board={
        <Whiteboard
          floors={boardFloors()}
          columns={boardColumns(getProjects())}
          copy={site.board}
        />
      }
    />
  );
}
