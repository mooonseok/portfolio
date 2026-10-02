import { IndianBobCaseView } from './indian-bob-case-view';
import { caseGroupTags } from './case-group-tags';
import type { Project } from '@/dto/project.dto';

export function IndianBobCase({ p }: { p: Project }) {
  return <IndianBobCaseView p={p} groups={caseGroupTags(p)} />;
}
