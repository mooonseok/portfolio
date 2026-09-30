export interface TreeSegments {
  upper: boolean;
  lower: boolean;
  branch: boolean;
}

export const treeSegments = (
  targets: readonly string[],
  origin: string,
  open: string | null
): TreeSegments[] => {
  const n = targets.length;
  const all = open === origin;
  const k = open === null ? -1 : targets.indexOf(open);
  return targets.map((_, i) => ({
    upper: all || (k >= 0 && i <= k),
    lower: i < n - 1 && (all || i < k),
    branch: all || i === k,
  }));
};
