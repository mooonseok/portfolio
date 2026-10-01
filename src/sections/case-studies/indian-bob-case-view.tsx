import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import { HabitExplorer } from './components/habit-explorer';
import { IndianBobNoteView } from './indian-bob-note-view';
import { Box } from '@/components/atoms/box';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { SurfaceRelation } from '@/components/molecules/surface-relation';
import type { IndianBobCaseViewProps } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, CASE_SPACE } from '@/constants/case';
import { RULE } from '@/constants/rule';
import { SIZE } from '@/constants/size';

const HABIT_TITLE_ID = 'habit';

export function IndianBobCaseView({
  p,
  groups,
  showContext,
  showRelation,
  relationLabel,
  rows,
  showWork,
  showNoteFields,
  showCurrent,
}: IndianBobCaseViewProps) {
  const c = p.case;
  const note = c.engineeringNote;
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
        {showRelation ? (
          <Box className='max-w-[560px] pt-2'>
            <SurfaceRelation label={relationLabel} rows={rows} />
          </Box>
        ) : null}
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
      {c.feature ? (
        <CaseSectionView
          group={groups.system}
          depth={CASE_DEPTH.L2}
          title={c.feature.title}
          titleId={HABIT_TITLE_ID}
          layout={CASE_LAYOUT.WIDE}
          loose
        >
          <HabitExplorer feature={c.feature} labelId={HABIT_TITLE_ID} />
        </CaseSectionView>
      ) : null}
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='What I Worked On'
          space={CASE_SPACE.SM}
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
          title='배운 점'
          space={CASE_SPACE.SM}
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
