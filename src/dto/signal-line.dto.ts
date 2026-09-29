export interface Marker {
  id: string;
  y: number;
  dark: boolean;
}

export interface Branch {
  el: HTMLElement;
  y: number;
}

export interface SignalGeometry {
  top: number;
  height: number;
  markers: Marker[];
  branches: Branch[];
  current: string;
}
