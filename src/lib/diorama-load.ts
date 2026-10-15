interface ConnectionInfo {
  saveData?: boolean;
}

export interface StageLoadEnv {
  reducedMotion: boolean;
  saveData: boolean;
  webgl: boolean;
}

export function readStageLoadEnv(
  win: Window,
  reducedQuery: string
): StageLoadEnv {
  const nav = win.navigator as Navigator & { connection?: ConnectionInfo };
  return {
    reducedMotion: win.matchMedia(reducedQuery).matches,
    saveData: nav.connection?.saveData === true,
    webgl: 'WebGLRenderingContext' in win,
  };
}

export const shouldLoadStage = (env: StageLoadEnv) =>
  env.webgl && !env.reducedMotion && !env.saveData;
