export interface ArtPoint {
  x: number;
  y: number;
}

export interface ArtRect extends ArtPoint {
  w: number;
  h: number;
}

export type ArtVec = [number, number];

export interface BoxTones {
  top: string;
  left: string;
  right: string;
  line?: string;
}
