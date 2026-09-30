import { ApcCaseView } from './apc-case-view';
import { caseGroupTags } from './case-group-tags';
import { toDomainItems } from '@/lib/domains';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';
import { EXPLORER_MODE } from '@/constants/explorer';

export function ApcCase({ p }: { p: Project }) {
  const groups = caseGroupTags(p);
  const c = p.case;
  const domains = c.domains ?? [];
  const showTech = has(c.techNotes);
  return (
    <ApcCaseView
      p={p}
      groups={groups}
      domains={{
        label: `${p.title} 현장 업무`,
        items: toDomainItems(p.slug, domains, EXPLORER_MODE.DETAIL),
        mode: EXPLORER_MODE.DETAIL,
      }}
      showContext={has(c.contextProblem)}
      showDomains={has(domains)}
      showWork={has(c.work)}
      showTech={showTech}
      showCurrent={has(c.currentState)}
      experimentGroup={showTech ? undefined : groups.engineering}
      experimentRail={showTech ? 'ENGINEERING' : undefined}
    />
  );
}
