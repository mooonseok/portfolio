import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { cx } from '@/lib/cx';
import type { Flow } from '@/dto/flow.dto';
import { FLOW_ORIENT, FLOW_ROLE } from '@/constants/flow';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

const flowBodyLap = ['lap:col-[3/11]', 'lap:col-[3/9]', 'lap:col-[3/8]'];

export function ApcFlowsView({ flows }: { flows: Flow[] }) {
  return (
    <Box className='flex flex-col gap-4.5 tab:grid tab:grid-cols-6 tab:gap-x-(--gutter) tab:gap-y-14 lap:grid-cols-10'>
      {flows.map((f, i) => (
        <Box
          key={f.id}
          className={cx(
            'flex flex-col tab:contents',
            i === 0
              ? 'gap-4.5 [--flow-gap:26px]'
              : 'gap-3 border-t border-t-hairline pt-4 [--flow-gap:12px]'
          )}
        >
          <Text
            as={TAG.SPAN}
            className={cx('mono', i > 0 && 'muted', 'tab:col-[1/3]')}
          >
            {f.label}
          </Text>
          <Box className={cx('tab:col-[3/7] tab:min-w-0', flowBodyLap[i])}>
            <FlowDiagram
              nodes={f.nodes}
              orient={FLOW_ORIENT.AUTO}
              tone={i === 0 ? TONE.DEFAULT : TONE.MUTED}
              role={i === 0 ? FLOW_ROLE.PRIMARY : FLOW_ROLE.SECONDARY}
              label={f.label}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
