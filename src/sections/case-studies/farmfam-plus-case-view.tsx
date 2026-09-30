import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import { TilesView } from './components/tiles-view';
import { RelationMap } from './components/relation-map';
import { StateScopeView } from './components/state-scope-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { TechNotes } from '@/components/organisms/tech-notes';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { FarmFamPlusCaseViewProps } from '@/dto/case-view.dto';
import {
  CASE_DEPTH,
  CASE_LAYOUT,
  CASE_SPACE,
  TECH_COLS,
} from '@/constants/case';
import { RULE } from '@/constants/rule';
import { HEADING, TAG } from '@/constants/tag';
import { IMAGE_SIZES } from '@/constants/visual';

export function FarmFamPlusCaseView({
  p,
  groups,
  relation,
  showScope,
  showStateScope,
  showContext,
  showWork,
  showTech,
  showCurrent,
}: FarmFamPlusCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate
      project={p}
      hero={
        <Box className='container'>
          <ConceptFrame
            visual={p.visuals.hero}
            className='[--ratio:3/2]'
            parallax={10}
            priority
            sizes={IMAGE_SIZES.FULL}
          />
        </Box>
      }
    >
      <CaseSectionView depth={CASE_DEPTH.L1} title='Role / Scope' id='role'>
        <ParagraphsView list={c.role} />
        {c.roleSurfaces ? <TilesView list={c.roleSurfaces} /> : null}
        {showStateScope && c.stateScope ? (
          <StateScopeView scope={c.stateScope} />
        ) : null}
        {showScope ? (
          <Row className='flex-wrap items-baseline gap-x-6 gap-y-2 text-[15px]'>
            <Text as={TAG.SPAN} className='mono muted'>
              SCOPE
            </Text>
            <List className='contents'>
              {p.home.scope.map((k) => (
                <ListItem key={k}>{k}</ListItem>
              ))}
            </List>
          </Row>
        ) : null}
      </CaseSectionView>
      {showContext ? (
        <CaseSectionView
          depth={CASE_DEPTH.L1}
          id='context'
          layout={CASE_LAYOUT.FREE}
        >
          <Grid className='grid-cols-[1fr] gap-y-8 tab:grid-cols-6 tab:[align-items:start] tab:gap-x-(--gutter) lap:grid-cols-10'>
            <Column className='gap-5 tab:col-[1/4] tab:gap-8 lap:col-[1/5]'>
              <Heading
                level={HEADING.H2}
                className='text-[length:clamp(22px,6.5vw,28px)] leading-[1.2] tracking-[-0.01em] tab:text-d1 tab:leading-[1.15] tab:tracking-[-0.014em]'
                data-reveal-item='title'
              >
                Context / Problem
              </Heading>
              <ParagraphsView list={c.contextProblem} />
            </Column>
            {p.visuals.detail ? (
              <Box
                className='tab:col-[4/7] lap:col-[6/11]'
                data-reveal-item='visual'
              >
                <ConceptFrame
                  visual={p.visuals.detail}
                  className='[--ratio:4/5]'
                  parallax={10}
                />
              </Box>
            ) : null}
          </Grid>
        </CaseSectionView>
      ) : null}
      {relation ? (
        <CaseSectionView
          group={groups.system}
          depth={CASE_DEPTH.L2}
          title={relation.title}
          titleId={relation.map.titleId}
          railLabel={relation.label}
          layout={CASE_LAYOUT.WIDE}
          space={CASE_SPACE.LG}
          loose
        >
          <RelationMap {...relation.map} />
        </CaseSectionView>
      ) : null}
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='What I Worked On'
        >
          <WorkRowsView items={c.work} />
        </CaseSectionView>
      ) : null}
      {showTech ? (
        <CaseSectionView
          group={groups.engineering}
          depth={CASE_DEPTH.L4}
          title='Technical Details'
          space={CASE_SPACE.LG}
          loose
          rule={RULE.HAIRLINE}
        >
          <TechNotes notes={c.techNotes} cols={TECH_COLS.TWO} />
        </CaseSectionView>
      ) : null}
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='Current State'
          loose
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
