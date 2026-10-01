import { Cta } from '@/components/atoms/cta';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { LineBreak } from '@/components/atoms/line-break';
import { Text } from '@/components/atoms/text';
import type { HeroViewProps } from '@/dto/hero.dto';
import { HEADING, TAG } from '@/constants/tag';

export function HeroView({
  name,
  primaryAction,
  role,
  disciplines,
  range,
  headline,
  introduction,
}: HeroViewProps) {
  return (
    <Column
      as={TAG.SECTION}
      className='min-h-[calc(max(520px,min(100svh,760px))_-_56px)] justify-end pb-8 tab:min-h-[calc(max(640px,min(100svh,880px))_-_72px)] tab:pb-12 lap:min-h-[calc(min(100svh,780px)_-_72px)] lap:pb-16 short-land:min-h-[auto] short-land:pb-5'
      aria-label='Intro'
    >
      <Column className='container mt-20 gap-7 tab:gap-10 lap:gap-14 short-land:mt-12 short-land:gap-5'>
        <Heading
          level={HEADING.H1}
          className='text-hero leading-[0.96] tracking-[-0.02em] text-balance tab:whitespace-nowrap lap:tracking-[-0.022em] short-land:text-[length:clamp(40px,14svh,72px)] short-land:whitespace-normal'
        >
          {name}
        </Heading>
        <Column className='max-w-[760px] gap-3'>
          <Text className='text-[22px] leading-[1.45] font-medium text-balance tab:text-[28px]'>
            {headline}
          </Text>
          <Text className='max-w-[680px] text-[15px] leading-[1.8] text-subtle tab:text-[17px]'>
            {introduction}
          </Text>
          <Cta href={primaryAction.href} label={primaryAction.label} />
        </Column>
        <Grid className='grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-4 gap-y-3 border-t border-t-ink pt-3.5 mono leading-[1.6] tab:grid-cols-[repeat(var(--cols),minmax(0,1fr))] tab:gap-x-(--gutter) tab:gap-y-0 lap:pt-4'>
          <Text as={TAG.SPAN} className='tab:col-[1/5] tab:row-1'>
            {role}
          </Text>
          <Text
            as={TAG.SPAN}
            className='tab:col-[1/5] tab:row-2 lap:col-[5/9] lap:row-1'
          >
            {disciplines}
          </Text>
          <Text
            as={TAG.SPAN}
            className='text-subtle tab:col-[5/-1] tab:row-[1/span_2] tab:text-right tab:text-inherit lap:col-[9/13] lap:row-1'
          >
            {range.label}
            <LineBreak />
            <Text as={TAG.SPAN} className='nowrap'>
              {range.years}
            </Text>
          </Text>
        </Grid>
      </Column>
    </Column>
  );
}
