import { EmosaveCaseView } from './emosave-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';

export function EmosaveCase({ p }: { p: Project }) {
  const c = p.case;
  const focus = c.interactionFocus ?? [];
  return (
    <EmosaveCaseView
      p={p}
      groups={caseGroupTags(p)}
      showInteraction={!!c.interactionFocus && has(c.interactionFocus)}
      showWork={!!c.workParagraphs && has(c.workParagraphs)}
      showCurrent={has(c.currentState)}
      lead={focus.find((f) => f.withStates)}
      rest={focus.filter((f) => !f.withStates)}
      workParagraphs={c.workParagraphs ?? []}
    />
  );
}
