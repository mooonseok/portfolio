import { designFlow } from '../../src/content/design-routing.ts';
import { developmentFlow } from '../../src/content/request-routing.ts';

const workflows = [developmentFlow, designFlow];
const assigned = [
  'judge',
  'prepareLink',
  'prepare',
  'route',
  'work',
  'handoff',
  'implement',
  'join',
  'gather',
  'verifyLink',
  'review',
  'inspectLink',
  'inspect',
  'decideLink',
  'decide',
];
const correction = [
  'issue',
  'back',
  'fix',
  'retry',
  'regather',
  'reverifyLink',
  'recheck',
  'reinspectLink',
  'reinspect',
  'redecideLink',
  'passed',
];

function* routes() {
  for (const request of workflows) {
    yield { ...request, issue: undefined };
    for (const id of Object.keys(request.jobs)) {
      const issue = { owner: id, finding: '수용 조건 미충족' };
      yield { ...request, issue };
      yield { ...request, issue: { ...issue, scope: 'plan' } };
      const single = { ...request, jobs: { [id]: request.jobs[id] } };
      yield { ...single, issue };
      yield { ...single, issue: { ...issue, scope: 'plan' } };
      yield { ...single, issue: undefined };
    }
  }
}

function correctionSteps(issue) {
  if (!issue) return [];
  if (issue.scope !== 'plan') return correction;
  return [
    'issue',
    'back',
    'fix',
    ...assigned.slice(assigned.indexOf('route'), -1),
    'passed',
  ];
}

function measuredEdges(request) {
  const edges = new Map([
    ['prepare-link', 54],
    ['verify-link', 63],
    ['inspect-link', 36],
    ['decide-link', 27],
    ['exit', 18],
    ['restart', 315],
  ]);
  for (const id of Object.keys(request.jobs)) {
    edges.set(`in-${id}`, 99);
    edges.set(`task-${id}`, 45);
    edges.set(`join-${id}`, 117);
    edges.set(`back-${id}`, 252);
  }
  return edges;
}

const reading = [
  'judge',
  'prepare',
  'work',
  'implement',
  'gather',
  'review',
  'inspect',
  'decide',
  'issue',
  'fix',
  'regather',
  'recheck',
  'reinspect',
  'passed',
  'done',
];

export {
  assigned,
  correctionSteps,
  developmentFlow,
  measuredEdges,
  reading,
  routes,
  workflows,
};
