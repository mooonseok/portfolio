import { FarmFamPlusCaseView } from './farmfam-plus-case-view';
import { caseGroupTags } from './case-group-tags';
import type {
  RelationMap,
  RelationNode,
  RelationSection,
} from '@/dto/explorer.dto';
import type { NoteRef } from '@/dto/link.dto';
import type { Project } from '@/dto/project.dto';

const noteHref = (n?: NoteRef) => (n ? `#${n.target}` : undefined);

function toRelation(map: RelationMap): RelationSection {
  const item = (n: RelationNode) => ({
    ...n,
    buttonId: `${map.id}-${n.id}-node`,
    regionId: `${map.id}-${n.id}-region`,
    noteHref: noteHref(n.note),
  });
  return {
    title: map.title,
    label: map.label,
    map: {
      titleId: map.id,
      noteId: `${map.id}-note`,
      panelId: `${map.id}-panel`,
      hint: map.hint,
      hintMobile: map.hintMobile,
      note: map.note,
      origin: item(map.origin),
      targets: map.targets.map(item),
      check: map.check
        ? { ...map.check, noteHref: noteHref(map.check.note) }
        : undefined,
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
    />
  );
}
