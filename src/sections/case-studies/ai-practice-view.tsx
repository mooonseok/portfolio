import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { CaseMetaView } from '@/components/templates/case-study-template/case-meta-view';
import { CaseStudyTemplateView } from '@/components/templates/case-study-template/case-study-template-view';
import { GROUP_ID } from '@/constants/case';
import { NAV_ID } from '@/constants/navigation';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';
import type { AiPracticeViewProps } from '@/dto/ai-practice.dto';
import { AiCheckLoop } from './components/ai-check-flow';
import { AiPlazaCase } from './components/ai-plaza-case';
import { AiRuleRowsView } from './components/ai-rule-rows-view';
import { ParagraphsView } from './components/paragraphs-view';
import styles from './ai-practice.module.css';

export function AiPracticeView({ content: c, groups }: AiPracticeViewProps) {
  return (
    <Box className={styles.page}>
      <CaseStudyTemplateView
        header={{ title: c.title, summary: c.summary }}
        titleTone={TONE.INK}
        showSummary={false}
        meta={[]}
        groups={groups}
        next={c.next}
        nav={{ back: false, current: NAV_ID.AI }}
        intro={
          <Box id='overview' className={styles.intro}>
            <AiCheckLoop />
          </Box>
        }
        hero={<AiPlazaCase />}
      >
        <Box className={styles.reading}>
          <Box
            as={TAG.SECTION}
            id={GROUP_ID.GUIDELINES}
            className={styles.chapter}
          >
            <Heading level={HEADING.H2} className={styles.subheading}>
              {c.rulesLabel}
            </Heading>
            <Box>
              <AiRuleRowsView
                id='ai-rules-label'
                label={c.rulesLabel}
                rules={c.rules}
                note={c.rulesNote}
              />
              <CaseMetaView meta={c.meta} />
            </Box>
          </Box>
          <Box
            as={TAG.SECTION}
            id={GROUP_ID.COLLABORATION}
            className={styles.chapter}
          >
            <Heading level={HEADING.H2} className={styles.subheading}>
              {c.collaborationTitle}
            </Heading>
            <ParagraphsView list={c.collaboration} />
          </Box>
        </Box>
      </CaseStudyTemplateView>
    </Box>
  );
}
