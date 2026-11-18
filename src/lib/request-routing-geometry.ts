export interface RoutingAnchor {
  x: number;
  top: number;
  bottom: number;
  halfWidth: number;
}

function connector(from: RoutingAnchor, to: RoutingAnchor) {
  const start = `M${from.x} ${from.bottom}`;
  if (from.x === to.x) return `${start}V${to.top}`;

  const middle = (from.bottom + to.top) / 2;
  const radius = Math.min(8, middle - from.bottom, Math.abs(to.x - from.x) / 2);
  const offset = Math.sign(to.x - from.x) * radius;
  return (
    `${start}V${middle - radius}q0 ${radius} ${offset} ${radius}` +
    `H${to.x - offset}q${offset} 0 ${offset} ${radius}V${to.top}`
  );
}

function cardSide(node: RoutingAnchor, side: number, upwards = false) {
  const { x, top, bottom, halfWidth } = node;
  const edge = x + side * halfWidth;
  const end = upwards ? top : bottom;
  const radius = Math.min(7.5, halfWidth, (bottom - top) / 2);
  const dx = side * radius;
  const dy = upwards ? -radius : radius;
  return (
    `H${edge - dx}q${dx} 0 ${dx} ${dy}V${end - dy}` +
    `Q${edge} ${end} ${edge - dx} ${end}H${x}`
  );
}

function through(node: RoutingAnchor, side = -1) {
  return `M${node.x} ${node.top}${cardSide(node, side)}`;
}

export function routingTrackPaths(
  anchors: Map<string, RoutingAnchor>,
  owners: string[],
  width: number,
  height: number
) {
  const workers = owners.map((id) => anchors.get(id)!);
  const center = (workers[0].x + workers[workers.length - 1].x) / 2;
  const judge = { ...anchors.get('judge')!, x: center };
  const review = { ...anchors.get('review')!, x: center };
  const result = { ...anchors.get('result')!, x: center };
  const paths = new Map<string, string>();
  paths.set('judge', through(judge));
  const halfWidth = Math.min(...workers.map((node) => node.halfWidth));
  for (const [index, id] of owners.entries()) {
    const worker = { ...workers[index], halfWidth };
    const side = index === 0 ? -1 : 1;
    paths.set(`in-${id}`, connector(judge, worker));
    paths.set(`work-${id}`, through(worker, side));
    paths.set(`join-${id}`, connector(worker, review));
    paths.set(
      `fix-${id}`,
      `M${worker.x} ${worker.bottom}${cardSide(worker, side, true)}${cardSide(worker, -side)}`
    );
  }
  paths.set('review', through(review));
  paths.set('exit', connector(review, result));
  paths.set('result', through(result));

  const top = 6;
  const bottom = height - 6;
  const outer = width - 4;
  const radius = Math.min(
    8,
    (judge.top - top) / 2,
    (bottom - result.bottom) / 2
  );
  paths.set(
    'restart',
    `M${center} ${result.bottom}V${bottom - radius}q0 ${radius} ${radius} ${radius}` +
      `H${outer - radius}q${radius} 0 ${radius} ${-radius}V${top + radius}` +
      `q0 ${-radius} ${-radius} ${-radius}H${center + radius}q${-radius} 0 ${-radius} ${radius}V${judge.top}`
  );
  return paths;
}
