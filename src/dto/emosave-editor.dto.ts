import type {
  EDITOR_CHARACTER,
  EDITOR_GESTURE,
} from '@/constants/emosave-editor';

export type EditorItemId =
  (typeof EDITOR_CHARACTER)[keyof typeof EDITOR_CHARACTER];

export type EditorGesture =
  (typeof EDITOR_GESTURE)[keyof typeof EDITOR_GESTURE];

export interface EditorPoint {
  x: number;
  y: number;
}

export interface EditorItem extends EditorPoint {
  id: EditorItemId;
  angle: number;
  scale: number;
}

export interface EditorState {
  items: EditorItem[];
  selectedId: EditorItemId | null;
}

export interface EditorSession {
  get: () => EditorState;
  select: (id: EditorItemId | null) => void;
  place: (point: EditorPoint, transient?: boolean) => void;
  move: (x: number, y: number) => void;
  rotate: (direction: number) => void;
  rotateTo: (angle: number, transient?: boolean) => void;
  resizeTo: (scale: number, transient?: boolean) => void;
  resize: (direction: number) => void;
  remove: () => void;
  reset: () => void;
  restore: (value: EditorState) => void;
  finish: (kind?: EditorGesture) => void;
}

export interface EditorHit {
  point: EditorPoint;
  item: EditorItemId | null;
  inside: boolean;
  withinStage?: boolean;
  mode?: EditorGesture;
}

export interface EditorPointer {
  pointerId: number;
  pointerType: string;
  button: number;
  clientX: number;
  clientY: number;
  isPrimary: boolean;
}

export interface EditorInput {
  cancel: () => void;
  dispose: () => void;
}

export interface EditorBubbleState {
  itemId: EditorItemId | null;
  paused: boolean;
}

export interface EditorBubbleClock {
  schedule: (callback: () => void, delay: number) => number;
  clear: (id: number) => void;
}

export interface EditorBubbleOptions {
  reducedMotion?: boolean;
  visible?: boolean;
  editing?: boolean;
  clock?: EditorBubbleClock;
}

export interface EditorBubbles {
  get: () => EditorBubbleState;
  setItems: (ids: readonly EditorItemId[]) => void;
  setEditing: (editing: boolean) => void;
  setVisible: (visible: boolean) => void;
  setPaused: (paused: boolean) => void;
  dispose: () => void;
}
