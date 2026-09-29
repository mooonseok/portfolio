import { SmartFarmMonitorView } from './smart-farm-monitor-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { LineBreak } from '@/components/atoms/line-break';
import { NavLink } from '@/components/atoms/nav-link';
import { Row } from '@/components/atoms/row';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { SmartFarmWorkBlock } from '@/dto/selected-work.dto';
import { FLOW_ORIENT } from '@/constants/flow';
import { HEADING, TAG } from '@/constants/tag';
import { STATUS_KIND } from '@/constants/status';

export function SmartFarmBlockView({
  project: p,
  href,
  caseLabel,
  flowLabel,
  meta,
  titleFirst,
  titleRest,
  hasTitleRest,
}: SmartFarmWorkBlock) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      id={p.slug}
      className='container pt-24 tab:pt-40 lap:pt-(--section)'
    >
      <Box className='grid-page gap-y-5 tab:gap-y-0 lap:grid-rows-[auto_auto_auto_1fr]'>
        <Row
          className='col-[1/-1] flex-wrap gap-x-4 gap-y-1.5 mono tab:col-[1/3] tab:flex-col tab:flex-nowrap tab:gap-2 tab:pt-2 lap:row-1 lap:pt-3'
          data-reveal-item='meta'
        >
          <Text as={TAG.SPAN} data-signal-anchor={p.slug}>
            {p.num}
          </Text>
          <Text as={TAG.SPAN} className='nowrap muted'>
            {p.period}
          </Text>
        </Row>
        <Column className='col-[1/-1] gap-2.5 tab:col-[3/-1] tab:gap-4 lap:col-[3/7] lap:row-1 lap:gap-5'>
          <Heading
            level={HEADING.H3}
            className='text-smart leading-[0.98] font-medium tracking-[-0.016em] text-balance tab:leading-[0.96] tab:tracking-[-0.02em]'
            data-reveal-item='title'
          >
            {titleFirst}{' '}
            {hasTitleRest ? <LineBreak className='hidden lap:inline' /> : null}
            {titleRest}
          </Heading>
          <Text as={TAG.SPAN} className='mono'>
            {p.category}
          </Text>
          <Box className='mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-4 gap-y-3 border-t border-t-hairline pt-3.5 tab:mt-0 tab:flex tab:flex-wrap tab:gap-x-10 tab:gap-y-4 lap:mt-9 lap:grid lap:grid-cols-2 lap:gap-6 lap:pt-4'>
            {p.status.map((st) => (
              <Column key={st.label} className='gap-1.5'>
                <StatusLabel
                  kind={st.kind}
                  label={st.label}
                  pulse={st.kind === STATUS_KIND.PRODUCT}
                />
                <Text
                  as={TAG.SPAN}
                  className='text-small text-graphite lap:text-[15px]'
                >
                  {st.note}
                </Text>
              </Column>
            ))}
          </Box>
        </Column>
        <Column className='col-[1/-1] mt-2 gap-4 tab:mt-14 tab:gap-5 lap:col-[7/13] lap:row-[1/5] lap:mt-0 lap:gap-6'>
          <NavLink
            href={href}
            className='-mx-(--margin) block tab:mx-0'
            aria-label={caseLabel}
            data-reveal-item='visual'
          >
            <ConceptFrame
              visual={p.visuals.home}
              className='[--ratio:4_/_5] tab:[--ratio:4_/_3]'
              meta={meta}
              parallax={10}
            >
              <SmartFarmMonitorView />
            </ConceptFrame>
          </NavLink>
          <Grid className='grid-cols-2 gap-4 tab:gap-5 lap:gap-6'>
            <Column as={TAG.FIGURE} className='gap-3'>
              <ConceptFrame
                visual={p.visuals.sensor}
                className='[--ratio:1_/_1]'
                motion={false}
              />
              <Box
                as={TAG.FIGCAPTION}
                className='hidden items-center gap-2 mono lap:flex'
              >
                <Box
                  as={TAG.SPAN}
                  className='h-[9px] w-[9px] rounded-[50%] border-[1.25px] border-ink'
                  aria-hidden='true'
                />
                SENSOR
              </Box>
            </Column>
            <Column as={TAG.FIGURE} className='gap-3 lap:mt-20'>
              <ConceptFrame
                visual={p.visuals.equipment}
                className='[--ratio:1_/_1]'
                motion={false}
              />
              <Box
                as={TAG.FIGCAPTION}
                className='hidden items-center gap-2 mono lap:flex'
              >
                <Box
                  as={TAG.SPAN}
                  className='h-2 w-2 [transform:rotate(45deg)] border-[1.25px] border-ink'
                  aria-hidden='true'
                />
                EQUIPMENT
              </Box>
            </Column>
          </Grid>
        </Column>
        <Box className='col-[1/-1] border-t border-t-hairline pt-[18px] tab:mt-16 tab:flex tab:flex-col tab:gap-5 tab:pt-5 lap:col-[3/7] lap:row-2 lap:mt-20 lap:pt-0 lap:[--flow-gap:36px] lap:[border-top:0]'>
          <Text
            as={TAG.SPAN}
            className='hidden mono muted tab:block lap:hidden'
          >
            FLOW
          </Text>
          <FlowDiagram
            nodes={p.home.flows[0].nodes}
            orient={FLOW_ORIENT.TABLET}
            label={flowLabel}
          />
        </Box>
        <Box className='col-[1/-1] tab:mt-10 lap:col-[3/7] lap:row-3 lap:mt-20'>
          <Cta href={href} label={p.home.cta} />
        </Box>
      </Box>
    </ScrollScene>
  );
}
