import { ApcCaseView } from './apc-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';

export function ApcCase({ p }: { p: Project }) {
  const groups = caseGroupTags(p);
  const c = p.case;
  const flows = has(c.systemFlows) ? c.systemFlows : p.home.flows;
  const showTech = has(c.techNotes);
  return (
    <ApcCaseView
      p={p}
      groups={groups}
      flows={flows}
      showContext={has(c.contextProblem)}
      showFlows={has(flows)}
      showWork={has(c.work)}
      showTech={showTech}
      showCurrent={has(c.currentState)}
      experimentGroup={showTech ? undefined : groups.engineering}
      experimentRail={showTech ? 'ENGINEERING' : undefined}
    />
  );
}
