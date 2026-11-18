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

function correctionPath(
  decision: RoutingAnchor,
  target: RoutingAnchor,
  side: number,
  anchors: Iterable<RoutingAnchor>
) {
  const from = decision.x + side * decision.halfWidth;
  const to = target.x + side * target.halfWidth;
  const start = (decision.top + decision.bottom) / 2;
  const end = (target.top + target.bottom) / 2;
  const between = Array.from(anchors).filter(
    (node) => node.top >= target.bottom && node.bottom <= decision.top
  );
  const edges = [
    from,
    to,
    ...between.map((node) => node.x + side * node.halfWidth),
  ];
  const outside = side > 0 ? Math.max(...edges) : Math.min(...edges);
  const rail = outside + side * 14;
  const radius = Math.min(6, (start - end) / 2);
  const dx = side * radius;
  return (
    `M${from} ${start}H${rail - dx}q${dx} 0 ${dx} ${-radius}V${end + radius}` +
    `q0 ${-radius} ${-dx} ${-radius}H${to}`
  );
}

export function routingTrackPaths(
  anchors: Map<string, RoutingAnchor>,
  owners: string[],
  width: number,
  height: number,
  issueOwner?: string,
  issueScope?: 'plan' | 'work'
) {
  const workers = owners.map((id) => anchors.get(id)!);
  const center = (workers[0].x + workers[workers.length - 1].x) / 2;
  const judge = { ...anchors.get('judge')!, x: center };
  const prepare = { ...anchors.get('prepare')!, x: center };
  const gather = { ...anchors.get('gather')!, x: center };
  const review = { ...anchors.get('review')!, x: center };
  const inspect = { ...anchors.get('inspect')!, x: center };
  const decision = { ...anchors.get('decision')!, x: center };
  const result = { ...anchors.get('result')!, x: center };
  const paths = new Map<string, string>();
  paths.set('prepare-link', connector(judge, prepare));
  for (const [index, id] of owners.entries()) {
    const worker = workers[index];
    const finish = anchors.get(`finish-${id}`)!;
    paths.set(`in-${id}`, connector(prepare, worker));
    paths.set(`task-${id}`, connector(worker, finish));
    paths.set(`join-${id}`, connector(finish, gather));
    if (id === issueOwner) {
      const target = issueScope === 'plan' ? prepare : finish;
      const side =
        issueScope !== 'plan' && workers.length > 1 && index === 0 ? -1 : 1;
      paths.set(
        `back-${id}`,
        correctionPath(decision, target, side, anchors.values())
      );
    }
  }
  paths.set('verify-link', connector(gather, review));
  paths.set('inspect-link', connector(review, inspect));
  paths.set('decide-link', connector(inspect, decision));
  paths.set('exit', connector(decision, result));

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
