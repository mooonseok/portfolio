import type { ReactNode } from 'react';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import {
  BREAKPOINT,
  type LabelFrom,
  type RailFrom,
} from '@/constants/breakpoint';
import { type HeadingRule, RULE } from '@/constants/rule';
import { HEADING, TAG } from '@/constants/tag';
import { cx } from '@/lib/cx';

export function SectionHeading({
  id,
  label,
  title,
  size = HEADING.H2,
  rule = true,
  railFrom = BREAKPOINT.TABLET,
  labelFrom = BREAKPOINT.ALL,
  anchor = true,
  aside,
  className,
}: {
  id: string;
  label: string;
  title: string;
  size?: typeof HEADING.H2 | typeof HEADING.H3;
  rule?: HeadingRule;
  railFrom?: RailFrom;
  labelFrom?: LabelFrom;
  anchor?: boolean;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <Box
      className={cx(
        'group/heading grid-page [align-items:end] gap-y-3 data-[rule=""]:border-t data-[rule=""]:border-t-ink data-[rule=""]:pt-3.5 lap:data-[size=h3]:[align-items:start] mob:data-[rule=mobile]:border-t mob:data-[rule=mobile]:border-t-ink mob:data-[rule=mobile]:pt-3.5',
        className
      )}
      data-rule={
        rule === true ? '' : rule === RULE.MOBILE ? RULE.MOBILE : undefined
      }
      data-size={size}
      data-rail-from={railFrom}
      data-label-from={labelFrom}
      data-signal-anchor={anchor ? id : undefined}
    >
      <Text
        as={TAG.SPAN}
        className='col-span-full mono max-lap:group-data-[label-from=desktop]/heading:hidden tab:group-data-[rail-from=tablet]/heading:col-[1/3] lap:col-[1/3] lap:group-data-[size=h3]/heading:pt-1.5'
      >
        {label}
      </Text>
      <Heading
        level={HEADING.H2}
        id={id}
        className='col-span-full group-data-[size=h2]/heading:text-h2 group-data-[size=h2]/heading:leading-[1.02] group-data-[size=h2]/heading:tracking-[-0.014em] group-data-[size=h3]/heading:text-h3 group-data-[size=h3]/heading:leading-[1.25] group-data-[size=h3]/heading:tracking-[-0.01em] tab:group-data-[rail-from=tablet]/heading:col-[3/-1] lap:col-[3/-1] lap:group-data-[size=h2]/heading:col-[3/9]'
        data-reveal-item='title'
      >
        {title}
      </Heading>
      {aside ? (
        <Box className='hidden lap:col-[10/13] lap:block'>{aside}</Box>
      ) : null}
    </Box>
  );
}
