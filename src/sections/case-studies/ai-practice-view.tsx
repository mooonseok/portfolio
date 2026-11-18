import { Box } from '@/components/atoms/box';
import { CaseStudyTemplateView } from '@/components/templates/case-study-template/case-study-template-view';
import { NAV_ID } from '@/constants/navigation';
import { TONE } from '@/constants/tone';
import type { AiPracticeViewProps } from '@/dto/ai-practice.dto';
import { AiCheckLoop } from './components/ai-check-flow';
import styles from './ai-practice.module.css';

export function AiPracticeView({ content }: AiPracticeViewProps) {
  return (
    <Box className={styles.page}>
      <CaseStudyTemplateView
        header={{ title: content.title }}
        titleTone={TONE.INK}
        showSummary={false}
        meta={[]}
        next={content.next}
        nav={{ back: false, current: NAV_ID.AI }}
        intro={
          <Box id='overview' className={styles.intro}>
            <AiCheckLoop />
          </Box>
        }
        hero={null}
      />
    </Box>
  );
}
