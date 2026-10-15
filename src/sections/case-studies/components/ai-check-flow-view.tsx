import { AiCheckStageView } from './ai-check-stage-view';
import { List } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { AiCheckFlow, AiLoopMarks } from '@/dto/ai-practice.dto';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { LIST_TAG } from '@/constants/tag';

export function AiCheckLoopView({
  flow,
  marks,
}: {
  flow: AiCheckFlow;
  marks: AiLoopMarks;
}) {
  const last = flow.stages.length - 1;
  return (
    <ScrollScene steps={false} className='work-sheet ai-loop'>
      <List
        as={LIST_TAG.OL}
        role='list'
        aria-labelledby={AI_LOOP_TITLE_ID}
        className='ai-loop-list'
      >
        {flow.stages.map((s, i) => (
          <AiCheckStageView
            key={s.id}
            stage={s}
            index={i}
            mark={marks.stages[i]}
            down={i < last ? marks.down : undefined}
            back={i === 0 ? marks.back : undefined}
          />
        ))}
      </List>
      <Text className='ai-loop-label'>{flow.loopLabel}</Text>
    </ScrollScene>
  );
}
