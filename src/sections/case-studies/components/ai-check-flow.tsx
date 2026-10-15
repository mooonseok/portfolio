import { AiCheckLoopView } from './ai-check-flow-view';
import {
  markerBend,
  markerHead,
  markerLine,
  markerSpan,
  seedOf,
} from '@/lib/marker';
import type { AiCheckFlow, AiLoopMarks } from '@/dto/ai-practice.dto';
import { AI_LOOP_COLS, LOOP_DIR } from '@/constants/ai-practice';

const marksOf = (flow: AiCheckFlow): AiLoopMarks => {
  const turn = AI_LOOP_COLS - 1;
  const backSeed = seedOf(flow.loopLabel);
  const downSeed = seedOf(flow.title);
  return {
    stages: flow.stages.map((s, i) => {
      const seed = seedOf(s.id);
      const returning = i > turn;
      return {
        span: markerSpan(seed),
        head: i === turn ? undefined : markerHead(seed + 3),
        dir: returning ? LOOP_DIR.LEFT : LOOP_DIR.RIGHT,
        bend: i === turn ? markerBend(seed + 5) : undefined,
        order: returning ? i + 1 : i,
      };
    }),
    back: {
      bend: markerBend(backSeed),
      head: markerHead(backSeed + 3),
      order: flow.stages.length + 1,
    },
    down: { line: markerLine(downSeed, 3), head: markerHead(downSeed + 3) },
  };
};

export function AiCheckLoop({ flow }: { flow: AiCheckFlow }) {
  return <AiCheckLoopView flow={flow} marks={marksOf(flow)} />;
}
