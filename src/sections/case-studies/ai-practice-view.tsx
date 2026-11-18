import { Box } from '@/components/atoms/box';
import { AiCheckLoop } from './components/ai-check-flow';
import { AiPlazaCase } from './components/ai-plaza-case';
import { AiRuleRowsView } from './components/ai-rule-rows-view';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { TechNotes } from '@/components/organisms/tech-notes';
import { CaseStudyTemplateView } from '@/components/templates/case-study-template/case-study-template-view';
import type { AiPracticeViewProps } from '@/dto/ai-practice.dto';
import { CaseMetaView } from '@/components/templates/case-study-template/case-meta-view';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';
import { NAV_ID } from '@/constants/navigation';
import { TONE } from '@/constants/tone';

export function AiPracticeView({
  content: c,
  groups,
  tags,
}: AiPracticeViewProps) {
  return (
    <CaseStudyTemplateView
      header={{ title: c.title, summary: c.summary }}
      titleTone={TONE.INK}
      showSummary={false}
      meta={[]}
      groups={groups}
      next={c.next}
      nav={{ back: false, current: NAV_ID.AI }}
      intro={
        <Box
          id='overview'
          className='mx-auto w-[92%] max-w-[780px] pt-7 tab:pt-12'
        >
          <AiCheckLoop />
        </Box>
      }
      hero={
        <Box className='mx-auto max-w-[780px]'>
          <AiPlazaCase />
        </Box>
      }
    >
      <CaseSectionView
        depth={CASE_DEPTH.L2}
        title={c.rulesLabel}
        layout={CASE_LAYOUT.WIDE}
      >
        <AiRuleRowsView
          id='ai-rules-label'
          label={c.rulesLabel}
          rules={c.rules}
          note={c.rulesNote}
        />
        <CaseMetaView meta={c.meta} />
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
