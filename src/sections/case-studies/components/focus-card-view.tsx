import { ParagraphsView } from './paragraphs-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { InteractionFocus } from '@/dto/case.dto';
import type { Visual } from '@/dto/visual.dto';
import { HEADING } from '@/constants/tag';

export function FocusCardView({
  focus,
  visual,
  className,
}: {
  focus: InteractionFocus;
  visual?: Visual;
  className?: string;
}) {
  return (
    <Column className={className ? `gap-4 ${className}` : 'gap-4'}>
      {visual ? (
        <Box data-reveal-item='visual'>
          <ConceptFrame
            visual={visual}
            className='[--ratio:1/1]'
            radius={20}
            parallax={0}
          />
        </Box>
      ) : null}
      <Heading
        level={HEADING.H3}
        className='text-[20px] font-medium tracking-[-0.01em]'
      >
        {focus.title}
      </Heading>
      <ParagraphsView list={focus.body} />
    </Column>
  );
}
