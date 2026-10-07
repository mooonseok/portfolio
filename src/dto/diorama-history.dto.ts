import type { ProjectSlug } from '@/constants/project';

export interface DioramaHistory {
  selected: ProjectSlug | null;
  scrollY: number;
}
