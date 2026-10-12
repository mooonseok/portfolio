import { AiPracticeView } from './ai-practice-view';
import { aiPractice } from '@/content/ai-practice';
import { groupTagsFrom } from '@/lib/content';
import type { ContentsGroup } from '@/dto/navigation.dto';
import { GROUP_ID, GROUP_LABEL } from '@/constants/case';

const groups: ContentsGroup[] = [
  { id: GROUP_ID.OVERVIEW, label: GROUP_LABEL[GROUP_ID.OVERVIEW] },
  { id: GROUP_ID.WORK, label: aiPractice.workTitle },
  { id: GROUP_ID.DECISIONS, label: aiPractice.decisionsTitle },
  { id: GROUP_ID.ENGINEERING, label: aiPractice.engineeringTitle },
  { id: GROUP_ID.COLLABORATION, label: aiPractice.collaborationTitle },
];

const tag = groupTagsFrom(groups);

export function AiPractice() {
  return (
    <AiPracticeView
      content={aiPractice}
      groups={groups}
      tags={{
        work: tag(GROUP_ID.WORK),
        decisions: tag(GROUP_ID.DECISIONS),
        engineering: tag(GROUP_ID.ENGINEERING),
        collaboration: tag(GROUP_ID.COLLABORATION),
      }}
    />
  );
}
