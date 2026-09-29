import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { cx } from '@/lib/cx';
import type { StoryCard } from '@/dto/profile.dto';
import { FLOW_ORIENT, FLOW_ROLE } from '@/constants/flow';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function StoryCardView({ story: st, experiment, flowTone }: StoryCard) {
  return (
    <Column
      as={TAG.ARTICLE}
      className='gap-[18px] border-t border-t-ink pt-3.5 [--flow-gap:16px] data-[kind=experiment]:gap-4 data-[kind=experiment]:[padding:18px_16px_20px] data-[kind=experiment]:[--flow-gap:14px] data-[kind=experiment]:[border:1px_dashed_var(--ink)] data-[kind=sequence]:gap-3.5 data-[kind=sequence]:[--flow-gap:12px] tab:data-[kind=experiment]:p-4 lap:gap-7 lap:pt-4 lap:[--flow-gap:22px] lap:data-[kind=experiment]:gap-7 lap:data-[kind=experiment]:[padding:16px_20px_24px] lap:data-[kind=experiment]:[--flow-gap:22px] lap:data-[kind=sequence]:gap-7 lap:data-[kind=sequence]:[--flow-gap:22px]'
      data-kind={st.kind}
    >
      <Box
        className={cx(
          'flex-wrap items-center justify-between gap-2 lap:mb-[-18px]',
          experiment ? 'flex' : 'block'
        )}
      >
        <Text as={TAG.SPAN} className='mono muted'>
          {st.id}
        </Text>
        {experiment ? (
          <StatusLabel
            kind={STATUS_KIND.EXPERIMENT}
            label='EXPERIMENT'
            tone={TONE.INK}
          />
        ) : null}
      </Box>
      <Heading
        level={HEADING.H3}
        className='text-[18px] leading-[1.3] tracking-[-0.01em] text-balance lap:text-[20px]'
      >
        {st.title}
      </Heading>
      <FlowDiagram
        nodes={st.flow}
        orient={FLOW_ORIENT.VERTICAL}
        tone={flowTone}
        role={FLOW_ROLE.STATIC}
        label={st.title}
      />
      {st.keywords ? (
        <List className='hidden lap:flex lap:flex-col lap:gap-1 lap:text-small lap:leading-[1.5] lap:text-graphite'>
          {st.keywords.map((k) => (
            <ListItem key={k}>{k}</ListItem>
          ))}
        </List>
      ) : null}
    </Column>
  );
}
