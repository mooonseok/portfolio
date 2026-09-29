import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import { cx } from '@/lib/cx';
import type { GroupTag } from '@/dto/navigation.dto';
import { HEADING, TAG } from '@/constants/tag';
import {
  CASE_LAYOUT,
  CASE_SPACE,
  type CaseDepth,
  type CaseLayout,
  type CaseSpace,
} from '@/constants/case';
import { type CaseRule, RULE } from '@/constants/rule';

const titleSize = {
  1: 'text-[length:clamp(22px,6.5vw,28px)] leading-[1.2] tracking-[-0.01em] tab:text-d1 tab:leading-[1.15] tab:tracking-[-0.014em]',
  2: 'text-[length:clamp(22px,6.5vw,28px)] leading-[1.2] tracking-[-0.01em] tab:text-d2 tab:leading-[1.2] tab:tracking-[-0.012em]',
  3: 'text-d3 leading-[1.2] tracking-[-0.01em] tab:leading-[1.3]',
  4: 'text-d4 leading-[1.35] tracking-[-0.005em]',
} as const;

const spaceTop = {
  120: 'tab:mt-24 lap:mt-30',
  160: 'tab:mt-30 lap:mt-40',
  200: 'tab:mt-35 lap:mt-50',
} as const;

const ruleTop = {
  ink: 'border-t border-t-ink tab:pt-6',
  hairline: 'border-t border-t-hairline tab:pt-4.5',
  dashed: '[border-top:1px_dashed_var(--hairline)] tab:pt-4.5',
  dark: 'border-t border-t-dark-rule tab:pt-4.5',
  none: 'tab:pt-0',
} as const;

const bodyCols = {
  split: 'lap:col-[6/12]',
  wide: 'tab:mt-5 lap:col-[3/13] lap:mt-9',
  free: 'lap:col-[3/13]',
} as const;

interface CaseSectionViewProps {
  group?: GroupTag;
  id?: string;
  depth: CaseDepth;
  title?: string;
  bareMobile?: boolean;
  intro?: React.ReactNode;
  layout?: CaseLayout;
  space?: CaseSpace;
  loose?: boolean;
  rule?: CaseRule;
  railLabel?: string;
  mark?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function CaseSectionView({
  group,
  id,
  depth,
  title,
  bareMobile,
  intro,
  layout = CASE_LAYOUT.SPLIT,
  space = CASE_SPACE.MD,
  loose,
  rule = RULE.INK,
  railLabel,
  mark,
  className,
  children,
}: CaseSectionViewProps) {
  const hasRail = !!(group || railLabel || mark);
  const bareRule = bareMobile && rule !== RULE.NONE;
  return (
    <ScrollScene
      as={TAG.SECTION}
      id={group?.id ?? id}
      className={cx(
        'mx-auto max-w-[1440px] pr-[max(var(--margin),env(safe-area-inset-right))] pl-[max(var(--margin),env(safe-area-inset-left))]',
        className
      )}
    >
      <Box
        className={cx(
          'grid-page gap-y-5',
          bareMobile ? 'mt-18' : loose ? 'mt-24' : 'mt-20',
          spaceTop[space],
          ruleTop[rule],
          rule === RULE.NONE || bareMobile ? 'pt-0' : 'pt-4',
          bareRule && 'mob:[border-top:0]'
        )}
        data-depth={depth}
        data-layout={layout}
        data-space={space}
        data-loose={loose || undefined}
        data-rule={rule}
        data-bare-mobile={bareMobile || undefined}
        data-intro={intro ? '' : undefined}
      >
        <Box
          className={cx(
            'col-[1/-1] flex-wrap items-center gap-x-2.5 gap-y-1.5 mono tab:col-[1/3] tab:flex tab:flex-col tab:items-start tab:gap-2 tab:pt-1.5',
            !hasRail || bareMobile ? 'hidden' : 'flex'
          )}
          data-empty={!hasRail || undefined}
        >
          {group ? (
            <>
              <Text as={TAG.SPAN}>{group.num}</Text>
              <Text as={TAG.SPAN} className='muted'>
                {group.label}
              </Text>
            </>
          ) : null}
          {railLabel ? (
            <Text as={TAG.SPAN} className='muted'>
              {railLabel}
            </Text>
          ) : null}
          {mark ? (
            <Text as={TAG.SPAN} className='inline-flex muted'>
              {mark}
            </Text>
          ) : null}
        </Box>
        {title && layout !== CASE_LAYOUT.FREE ? (
          <Heading
            level={HEADING.H2}
            className={cx(
              'col-[1/-1] font-medium tab:col-[3/-1]',
              layout === CASE_LAYOUT.WIDE && !intro
                ? 'lap:col-[3/10]'
                : 'lap:col-[3/6]',
              titleSize[depth],
              bareMobile &&
                'mob:absolute mob:-m-px mob:h-px mob:w-px mob:overflow-hidden mob:whitespace-nowrap mob:[clip:rect(0_0_0_0)]'
            )}
            data-reveal-item='title'
          >
            {title}
          </Heading>
        ) : null}
        {intro ? (
          <Box className='col-[1/-1] tab:col-[3/-1] lap:col-[6/12]'>
            {intro}
          </Box>
        ) : null}
        <Column
          className={cx(
            'col-[1/-1] min-w-0 gap-6 tab:col-[3/-1]',
            bodyCols[layout]
          )}
        >
          {children}
        </Column>
      </Box>
    </ScrollScene>
  );
}
