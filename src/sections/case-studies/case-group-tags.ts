import { groupTags } from '@/lib/content';
import type { CaseGroupTags } from '@/dto/case-view.dto';
import type { Project } from '@/dto/project.dto';
import { GROUP_ID } from '@/constants/case';

export function caseGroupTags(p: Project): CaseGroupTags {
  const g = groupTags(p);
  return {
    system: g(GROUP_ID.SYSTEM),
    interaction: g(GROUP_ID.INTERACTION),
    work: g(GROUP_ID.WORK),
    engineering: g(GROUP_ID.ENGINEERING),
    currentState: g(GROUP_ID.CURRENT_STATE),
  };
}
