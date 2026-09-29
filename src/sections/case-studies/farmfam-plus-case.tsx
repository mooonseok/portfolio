import { FarmFamPlusCaseView } from './farmfam-plus-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';

export function FarmFamPlusCase({ p }: { p: Project }) {
  const c = p.case;
  return (
    <FarmFamPlusCaseView
      p={p}
      groups={caseGroupTags(p)}
      showScope={has(p.home.scope)}
      showContext={has(c.contextProblem)}
      showFlows={has(c.systemFlows)}
      showWork={has(c.work)}
      showTech={has(c.techNotes)}
      showCurrent={has(c.currentState)}
    />
  );
}
