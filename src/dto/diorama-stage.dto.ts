import type { ProjectSlug } from '@/constants/project';

export interface DioramaStageOptions {
  onSelect: (slug: ProjectSlug) => void;
  onError: () => void;
  reducedMotion: boolean;
}

export interface DioramaStage {
  setSelected: (selected: ProjectSlug | null, immediate?: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  dispose: () => void;
}
