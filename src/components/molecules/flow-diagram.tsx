import type { CSSProperties } from 'react';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { FlowNode } from '@/dto/flow.dto';
import {
  FLOW_ORIENT,
  FLOW_ROLE,
  type FlowOrient,
  type FlowRole,
  NODE_STATE,
} from '@/constants/flow';
import { RULE } from '@/constants/rule';
import { type FlowSize, SIZE } from '@/constants/size';
import { LIST_TAG, TAG } from '@/constants/tag';
import { type FlowTone, TONE } from '@/constants/tone';
import { cx } from '@/lib/cx';

export function FlowDiagram({
  nodes,
  orient = FLOW_ORIENT.AUTO,
  tone = TONE.DEFAULT,
  size = SIZE.MD,
  role = FLOW_ROLE.PRIMARY,
  gap,
  label,
  className,
}: {
  nodes: FlowNode[];
  orient?: FlowOrient;
  tone?: FlowTone;
  size?: FlowSize;
  role?: FlowRole;
  gap?: number;
  label?: string;
  className?: string;
}) {
  const lastMobile = nodes
    .map((n, i) => (!n.hideOnMobile ? i : -1))
    .filter((i) => i >= 0)
    .pop();
  const isStatic = role === FLOW_ROLE.STATIC;
  return (
    <List
      as={LIST_TAG.OL}
      className={cx('flow-diagram', className)}
      data-flow={role}
      data-orient={orient}
      data-tone={tone}
      data-size={orient === FLOW_ORIENT.SEQUENCE ? SIZE.SM : size}
      data-draw=''
      aria-label={label}
      style={
        gap != null
          ? ({ '--flow-gap': `${gap}px` } as CSSProperties)
          : undefined
      }
    >
      {nodes.map((n, i) => {
        const next = nodes[i + 1];
        const experiment = n.state === NODE_STATE.EXPERIMENT;
        const current = isStatic && n.state === NODE_STATE.ACTIVE;
        return (
          <ListItem
            key={n.label + i}
            className='flow-step'
            data-step={i}
            data-node={n.label}
            data-kind={experiment ? NODE_STATE.EXPERIMENT : undefined}
            data-state={current ? NODE_STATE.ACTIVE : undefined}
            data-next={
              next?.state === NODE_STATE.EXPERIMENT ? RULE.DASHED : undefined
            }
            data-hide-mobile={n.hideOnMobile || undefined}
            data-mobile-last={i === lastMobile || undefined}
            style={{ '--i': i } as CSSProperties}
          >
            <Box
              as={TAG.SPAN}
              className='flow-node-row col-[1] row-[1] items-center'
              aria-hidden='true'
            >
              <Box as={TAG.SPAN} className='flow-node flex-none' />
              <Box as={TAG.SPAN} className='flow-line' />
            </Box>
            <Column
              as={TAG.SPAN}
              className='flow-label col-[2] row-[1] justify-center gap-0.5'
            >
              <Text
                as={TAG.SPAN}
                className='flow-name font-mono text-(length:--fs-meta) tracking-[0.06em] [transition:color_150ms_var(--ease)]'
              >
                {n.label}
              </Text>
              {n.sub ? (
                <Text
                  as={TAG.SPAN}
                  className='text-[14px] leading-[1.45] text-subtle'
                >
                  {n.sub}
                </Text>
              ) : null}
              {experiment ? (
                <Text as={TAG.SPAN} className='sr-only'>
                  {' (experiment)'}
                </Text>
              ) : null}
              {current ? (
                <Text as={TAG.SPAN} className='sr-only'>
                  {' (current)'}
                </Text>
              ) : null}
            </Column>
          </ListItem>
        );
      })}
    </List>
  );
}
