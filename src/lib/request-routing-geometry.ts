export interface RoutingAnchor {
  x: number;
  top: number;
  bottom: number;
  rowTop: number;
}

function vertical(node: RoutingAnchor) {
  return `M${node.x} ${node.top}V${node.bottom}`;
}

function between(from: RoutingAnchor, to: RoutingAnchor) {
  const landing = Math.max(from.bottom, Math.min(to.top, to.rowTop - 7));
  const midpoint = (from.bottom + landing) / 2;
  return `M${from.x} ${from.bottom}C${from.x} ${midpoint} ${to.x} ${midpoint} ${to.x} ${landing}V${to.top}`;
}

function repairLoop({ x, top, bottom }: RoutingAnchor) {
  const turn = top + 10;
  return `M${x} ${bottom}C${x + 4} ${bottom - 7} ${x + 4} ${turn} ${x} ${turn}S${x - 4} ${bottom - 7} ${x} ${bottom}`;
}

export function routingTrackPaths(
  anchors: Map<string, RoutingAnchor>,
  owners: string[],
  right: number,
  height: number
) {
  const judge = anchors.get('judge')!;
  const review = anchors.get('review')!;
  const result = anchors.get('result')!;
  const paths = new Map<string, string>();
  const radius = 7;
  const bottom = Math.max(result.bottom + radius, height - 4);
  const outer = right + 5;
  const startX = outer - radius;
  paths.set(
    'request',
    `M${startX} 0H${judge.x + radius}Q${judge.x} 0 ${judge.x} ${radius}`
  );
  paths.set('entry', `M${judge.x} ${radius}V${judge.top}`);
  paths.set('judge', vertical(judge));
  for (const id of owners) {
    const worker = anchors.get(id)!;
    paths.set(`in-${id}`, between(judge, worker));
    paths.set(`work-${id}`, vertical(worker));
    paths.set(`join-${id}`, between(worker, review));
    paths.set(`fix-${id}`, repairLoop(worker));
  }
  paths.set('review', vertical(review));
  paths.set('exit', between(review, result));
  paths.set('result', vertical(result));
  paths.set(
    'restart',
    `M${result.x} ${result.bottom}V${bottom - radius}q0 ${radius} ${radius} ${radius}H${startX}q${radius} 0 ${radius} ${-radius}V${radius}Q${outer} 0 ${startX} 0`
  );
  return paths;
}
