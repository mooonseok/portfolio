import { EmosaveCaseView } from './emosave-case-view';
import { caseGroupTags } from './case-group-tags';
import type { Project } from '@/dto/project.dto';

export function EmosaveCase({ p }: { p: Project }) {
  const c = p.case;
  const focus = c.interactionFocus ?? [];
  return (
    <EmosaveCaseView
      p={p}
      groups={caseGroupTags(p)}
      lead={focus.find((f) => f.withStates)}
      rest={focus.filter((f) => !f.withStates)}
    />
  );
}
