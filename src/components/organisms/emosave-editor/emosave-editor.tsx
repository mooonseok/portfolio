'use client';

import dynamic from 'next/dynamic';

export const EmosaveEditor = dynamic(() =>
  import('./emosave-editor-container').then(
    (module) => module.EmosaveEditorContainer
  )
);
