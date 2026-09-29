import { ApcCase } from './apc-case';
import { EmosaveCase } from './emosave-case';
import { FarmFamPlusCase } from './farmfam-plus-case';
import { IndianBobCase } from './indian-bob-case';
import { SmartFarmCase } from './smart-farm-case';
import { PROJECT_SLUG, type ProjectSlug } from '@/constants/project';
import type { Project } from '@/dto/project.dto';

export const caseStudies: Record<
  ProjectSlug,
  (props: { p: Project }) => React.JSX.Element
> = {
  [PROJECT_SLUG.FARMFAM_PLUS]: FarmFamPlusCase,
  [PROJECT_SLUG.APC]: ApcCase,
  [PROJECT_SLUG.SMART_FARM]: SmartFarmCase,
  [PROJECT_SLUG.INDIAN_BOB]: IndianBobCase,
  [PROJECT_SLUG.EMOSAVE]: EmosaveCase,
};
