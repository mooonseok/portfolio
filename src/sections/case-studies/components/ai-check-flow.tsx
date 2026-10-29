import { AiCheckLoopView } from './ai-check-flow-view';
import type { AiCheckFlow, AiLoopMarks } from '@/dto/ai-practice.dto';
import { AI_LOOP_COLS, LOOP_DIR } from '@/constants/ai-practice';

const SPAN = 'M0 50 H100';
const HEAD = 'M16 12 L88 50 L16 88';
const DOWN = 'M50 0 V100';

const marksOf = (flow: AiCheckFlow): AiLoopMarks => {
  const turn = AI_LOOP_COLS - 1;
  return {
    stages: flow.stages.map((_, i) => {
      const returning = i > turn;
      return {
        span: SPAN,
        head: i === turn ? undefined : HEAD,
        dir: returning ? LOOP_DIR.LEFT : LOOP_DIR.RIGHT,
        bend: i === turn,
        order: returning ? i + 1 : i,
      };
    }),
    back: { head: HEAD, order: flow.stages.length + 1 },
    down: { line: DOWN, head: HEAD },
  };
};

export function AiCheckLoop({ flow }: { flow: AiCheckFlow }) {
  return <AiCheckLoopView flow={flow} marks={marksOf(flow)} />;
}
