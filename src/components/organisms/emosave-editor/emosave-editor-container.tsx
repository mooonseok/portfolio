'use client';

import { useEmosaveEditor } from '@/hooks/use-emosave-editor';
import { editorCharacters } from '@/content/emosave-editor';
import { EmosaveEditorView } from './emosave-editor-view';

export function EmosaveEditorContainer() {
  const editor = useEmosaveEditor();
  return <EmosaveEditorView {...editor} characters={editorCharacters} />;
}
