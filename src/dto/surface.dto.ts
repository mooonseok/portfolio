export interface SurfaceTile {
  label: string;
  sub?: string;
}

export interface SurfaceRow extends SurfaceTile {
  wide?: string;
  branch?: SurfaceTile;
}

export interface SurfaceRelationContent {
  label: string;
  rows: SurfaceRow[];
}
