import { ParagraphsView } from './paragraphs-view';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import type { InteractionFocus } from '@/dto/case.dto';
import { HEADING } from '@/constants/tag';

export function FocusCardView({
  focus,
  className,
}: {
  focus: InteractionFocus;
  className?: string;
}) {
  return (
    <Column className={className ? `gap-4 ${className}` : 'gap-4'}>
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
