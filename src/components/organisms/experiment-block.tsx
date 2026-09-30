import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { NotShipped } from '@/components/atoms/not-shipped';
import { Row } from '@/components/atoms/row';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { FieldRows } from '@/components/molecules/field-rows';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import type { Experiment } from '@/dto/experiment.dto';
import { FLOW_ORIENT, FLOW_ROLE } from '@/constants/flow';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function ExperimentBlock({
  title,
  flow,
  rows,
  notShipped,
  conclusion,
}: Experiment) {
  return (
    <Column className='gap-6 border border-dashed border-ink px-5 py-6 [--flow-gap:20px] tab:gap-8 tab:p-10'>
      <StatusLabel
        kind={STATUS_KIND.EXPERIMENT}
        label='EXPERIMENT'
        tone={TONE.INK}
      />
      <Column className='gap-3.5'>
        <Heading
          level={HEADING.H3}
          className='text-[length:clamp(20px,6vw,24px)] leading-[1.2] tracking-[-0.01em] tab:text-d2 tab:tracking-[-0.012em]'
          data-reveal-item='title'
        >
          {title}
        </Heading>
        {notShipped ? (
          <Row className='flex-wrap items-center gap-x-3 gap-y-2'>
            <NotShipped />
            <Text as={TAG.SPAN} className='text-body leading-[1.5]'>
              결론 · {conclusion}
            </Text>
          </Row>
        ) : null}
      </Column>
      <FlowDiagram
        nodes={flow}
        orient={FLOW_ORIENT.AUTO}
        role={FLOW_ROLE.STATIC}
        label={title}
      />
      <FieldRows rows={rows} />
    </Column>
  );
}
