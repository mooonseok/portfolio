import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { FieldRows } from '@/components/molecules/field-rows';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import type { Field } from '@/dto/field.dto';
import type { FlowNode } from '@/dto/flow.dto';
import { FLOW_ORIENT } from '@/constants/flow';
import { STATUS_KIND } from '@/constants/status';
import { HEADING } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function ExperimentBlock({
  title,
  flow,
  rows,
  notShipped,
}: {
  title: string;
  flow: FlowNode[];
  rows: Field[];
  notShipped: boolean;
}) {
  return (
    <Column className='gap-6 border border-dashed border-ink px-5 py-6 [--flow-gap:20px] tab:gap-8 tab:p-10'>
      <StatusLabel
        kind={STATUS_KIND.EXPERIMENT}
        label='EXPERIMENT'
        tone={TONE.INK}
      />
      <Heading
        level={HEADING.H3}
        className='text-[length:clamp(20px,6vw,24px)] leading-[1.2] tracking-[-0.01em] tab:text-d2 tab:tracking-[-0.012em]'
        data-reveal-item='title'
      >
        {title}
      </Heading>
      <FlowDiagram nodes={flow} orient={FLOW_ORIENT.AUTO} label={title} />
      <FieldRows rows={rows} notShipped={notShipped} />
    </Column>
  );
}
