export interface DioramaStageOptions {
  onSelect: () => void;
  onError: () => void;
  reducedMotion: boolean;
}

export interface DioramaStage {
  setSelected: (selected: boolean, immediate?: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  dispose: () => void;
}
