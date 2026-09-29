import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import { TilesView } from './components/tiles-view';
import { IndianBobNoteView } from './indian-bob-note-view';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { SurfaceRelation } from '@/components/molecules/surface-relation';
import type { IndianBobCaseViewProps } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, CASE_SPACE } from '@/constants/case';
import { FLOW_ORIENT } from '@/constants/flow';
import { RULE } from '@/constants/rule';
import { SIZE } from '@/constants/size';
import { TAG } from '@/constants/tag';

const sub =
  'flex flex-col gap-4 tab:grid tab:grid-cols-6 tab:[align-items:start] tab:gap-x-(--gutter) lap:grid-cols-10';

export function IndianBobCaseView({
  p,
  groups,
  showContext,
  showRelation,
  showWork,
  showNoteFields,
  showCurrent,
}: IndianBobCaseViewProps) {
  const c = p.case;
  const note = c.engineeringNote;
  const relation = showRelation ? c.surfaceRelation : undefined;
  return (
    <CaseStudyTemplate
      project={p}
      titleSize={SIZE.MD}
      hero={
        <Box className='container grid-page [align-items:end] gap-y-4'>
          <Box className='col-[1/3] tab:col-[1/4] lap:col-[1/5]'>
            <ConceptFrame
              visual={p.visuals.app}
              className='[--ratio:3/4]'
              parallax={10}
              priority
            />
          </Box>
          <Box className='col-[3/-1] tab:col-[4/-1] lap:col-[6/13]'>
            <ConceptFrame
              visual={p.visuals.admin}
              className='[--ratio:4/3]'
              parallax={10}
              priority
            />
          </Box>
        </Box>
      }
    >
      <CaseSectionView depth={CASE_DEPTH.L1} title='Role / Scope' id='role'>
        <ParagraphsView list={c.role} />
        {c.roleSurfaces ? <TilesView list={c.roleSurfaces} /> : null}
      </CaseSectionView>
      {showContext ? (
        <CaseSectionView
          depth={CASE_DEPTH.L1}
          title='Context / Problem'
          id='context'
        >
          <ParagraphsView list={c.contextProblem} />
        </CaseSectionView>
      ) : null}
      {relation ? (
        <CaseSectionView
          group={groups.system}
          depth={CASE_DEPTH.L2}
          title='System / Flow'
          layout={CASE_LAYOUT.WIDE}
          loose
        >
          <Box className={sub}>
            <Box className='tab:col-[1/-1] lap:col-[3/11]'>
              <SurfaceRelation
                label={relation.label}
                showSubs={false}
                rows={relation.rows}
              />
            </Box>
          </Box>
        </CaseSectionView>
      ) : null}
      {c.featureFlow ? (
        <CaseSectionView
          group={relation ? undefined : groups.system}
          depth={CASE_DEPTH.L2}
          title='Feature Flow'
          id='feature-flow'
          layout={CASE_LAYOUT.WIDE}
        >
          <Box className={sub}>
            <Text as={TAG.SPAN} className='mono muted tab:col-[1/3]'>
              {c.featureFlow.label}
            </Text>
            <Box className='tab:col-[3/7] tab:min-w-0 lap:col-[3/11]'>
              <FlowDiagram
                nodes={c.featureFlow.nodes}
                orient={FLOW_ORIENT.AUTO}
                label='Habit feature flow'
              />
            </Box>
          </Box>
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
      {note ? (
        <CaseSectionView
          group={groups.engineering}
          id='engineering-note'
          depth={CASE_DEPTH.L4}
          layout={CASE_LAYOUT.FREE}
          space={CASE_SPACE.SM}
          rule={RULE.HAIRLINE}
        >
          <IndianBobNoteView note={note} showFields={showNoteFields} />
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
