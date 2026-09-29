import { FarmFamPlusCaseView } from './farmfam-plus-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { RelationMap, RelationSection } from '@/dto/explorer.dto';
import type { Project } from '@/dto/project.dto';

function toRelation(map: RelationMap): RelationSection {
  const descId = (id: string) => `${map.id}-${id}-desc`;
  return {
    title: map.title,
    label: map.label,
    map: {
      titleId: map.id,
      noteId: `${map.id}-note`,
      note: map.note,
      hasNote: has(map.note),
      origin: { ...map.origin, descId: descId(map.origin.id) },
      targets: map.targets.map((t) => ({ ...t, descId: descId(t.id) })),
    },
  };
}

export function FarmFamPlusCase({ p }: { p: Project }) {
  const c = p.case;
  return (
    <FarmFamPlusCaseView
      p={p}
      groups={caseGroupTags(p)}
      relation={c.relationMap ? toRelation(c.relationMap) : undefined}
      showScope={has(p.home.scope)}
      showContext={has(c.contextProblem)}
      showFlows={has(c.systemFlows)}
      showWork={has(c.work)}
      showTech={has(c.techNotes)}
      showCurrent={has(c.currentState)}
    />
  );
}
