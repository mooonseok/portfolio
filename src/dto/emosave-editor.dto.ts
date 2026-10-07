import type { KeyboardEvent, RefObject } from 'react';

export interface EditorPoint {
  x: number;
  z: number;
}

export interface EditorState extends EditorPoint {
  turn: number;
  selected: boolean;
}

export interface EditorSession {
  get: () => EditorState;
  select: (selected: boolean) => void;
  place: (point: EditorPoint, transient?: boolean) => void;
  move: (x: number, z: number) => void;
  rotate: () => void;
  reset: () => void;
  restore: (value: EditorState) => void;
  finish: () => void;
}

export interface EditorHit {
  point: EditorPoint;
  item: boolean;
  inside: boolean;
}

export interface EditorPointer {
  pointerId: number;
  pointerType: string;
  button: number;
  clientX: number;
  clientY: number;
  isPrimary: boolean;
}

export interface EditorStage {
  paint: (value: EditorState) => void;
  cancel: () => void;
  dispose: () => void;
}

export interface EditorViewProps {
  hostRef: RefObject<HTMLDivElement | null>;
  selected: boolean;
  ready: boolean;
  failed: boolean;
  notice: string;
  front: string;
  onSelect: () => void;
  onMove: (x: number, z: number) => void;
  onRotate: () => void;
  onReset: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}
