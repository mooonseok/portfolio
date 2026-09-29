import { IndianBobCaseView } from './indian-bob-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';

export function IndianBobCase({ p }: { p: Project }) {
  const c = p.case;
  return (
    <IndianBobCaseView
      p={p}
      groups={caseGroupTags(p)}
      showContext={has(c.contextProblem)}
      showRelation={has(c.surfaceRelation?.rows ?? [])}
      showWork={has(c.work)}
      showNoteFields={!!c.engineeringNote && has(c.engineeringNote.fields)}
      showCurrent={has(c.currentState)}
    />
  );
}
