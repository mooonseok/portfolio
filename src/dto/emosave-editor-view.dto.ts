import type { KeyboardEvent, RefObject } from 'react';
import type { EditorItemId, EditorState } from './emosave-editor.dto';

export interface EditorCharacter {
  id: EditorItemId;
  name: string;
  image: string;
  description: string;
  bubble: string;
}

export interface EditorViewProps {
  hostRef: RefObject<HTMLDivElement | null>;
  characters: readonly EditorCharacter[];
  snapshot: EditorState;
  notice: string;
  placementDescription: string;
  bubbleId: string | null;
  paused: boolean;
  failed: boolean;
  onAssetError: () => void;
  onSelect: (id: EditorItemId | null) => void;
  onRotate: (direction: number) => void;
  onDelete: () => void;
  onResize: (direction: number) => void;
  onReset: () => void;
  onToggleBubbles: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}
