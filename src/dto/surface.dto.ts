export interface SurfaceTile {
  label: string;
  sub?: string;
}

export interface SurfaceRow extends SurfaceTile {
  wide?: string;
  branch?: SurfaceTile;
}
