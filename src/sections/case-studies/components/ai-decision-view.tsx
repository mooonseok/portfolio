import { ParagraphsView } from './paragraphs-view';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Heading } from '@/components/atoms/heading';
import type { AiDecision } from '@/dto/ai-practice.dto';
import { HEADING } from '@/constants/tag';
import { cx } from '@/lib/cx';

export function AiDecisionView({
  decision,
  className,
}: {
  decision: AiDecision;
  className?: string;
}) {
  return (
    <Column className={cx('gap-4', className)}>
      <Heading
        level={HEADING.H3}
        className='text-[20px] font-medium tracking-[-0.01em]'
      >
        {decision.title}
      </Heading>
      <ParagraphsView list={decision.body} />
      {decision.link ? (
        <Cta href={decision.link.href} label={decision.link.label} />
      ) : null}
    </Column>
  );
}
