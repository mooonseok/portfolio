import { AiDecisionView } from './components/ai-decision-view';
import { AiRuleRowsView } from './components/ai-rule-rows-view';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import { Box } from '@/components/atoms/box';
import { TechNotes } from '@/components/organisms/tech-notes';
import { CaseStudyTemplateView } from '@/components/templates/case-study-template/case-study-template-view';
import type { AiPracticeViewProps } from '@/dto/ai-practice.dto';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';
import { NAV_ID } from '@/constants/navigation';
import { TONE } from '@/constants/tone';

export function AiPracticeView({
  content: c,
  groups,
  tags,
}: AiPracticeViewProps) {
  const [lead, ...rest] = c.decisions;
  return (
    <CaseStudyTemplateView
      header={{ title: c.title, summary: c.summary }}
      titleTone={TONE.INK}
      showSummary
      meta={c.meta}
      groups={groups}
      next={c.next}
      nav={{ back: false, current: NAV_ID.ABOUT }}
      hero={
        <AiRuleRowsView
          label={c.rulesLabel}
          rules={c.rules}
          note={c.rulesNote}
        />
      }
    >
      <CaseSectionView
        group={tags.work}
        depth={CASE_DEPTH.L1}
        title={c.workTitle}
      >
        <WorkRowsView items={c.work} />
      </CaseSectionView>
      <CaseSectionView
        group={tags.decisions}
        depth={CASE_DEPTH.L2}
        title={c.decisionsTitle}
        layout={CASE_LAYOUT.WIDE}
      >
        {lead ? (
          <AiDecisionView decision={lead} className='max-w-[600px]' />
        ) : null}
        <Box className='mt-8 grid grid-cols-1 gap-8 tab:grid-cols-2'>
          {rest.map((decision) => (
            <AiDecisionView key={decision.title} decision={decision} />
          ))}
        </Box>
      </CaseSectionView>
      <CaseSectionView
        group={tags.engineering}
        depth={CASE_DEPTH.L2}
        title={c.engineeringTitle}
        layout={CASE_LAYOUT.WIDE}
      >
        <TechNotes notes={c.techNotes} cols={TECH_COLS.TWO} />
      </CaseSectionView>
      <CaseSectionView
        group={tags.collaboration}
        depth={CASE_DEPTH.L3}
        title={c.collaborationTitle}
      >
        <ParagraphsView list={c.collaboration} />
      </CaseSectionView>
    </CaseStudyTemplateView>
  );
}
