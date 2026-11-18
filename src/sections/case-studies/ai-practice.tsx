import { AiPracticeView } from './ai-practice-view';
import { aiPractice } from '@/content/ai-practice';
import type { ContentsGroup } from '@/dto/navigation.dto';
import { GROUP_ID, GROUP_LABEL } from '@/constants/case';

const groups: ContentsGroup[] = [
  { id: GROUP_ID.WORK, label: '요청별 작업 흐름' },
  { id: GROUP_ID.PLAZA_CASE, label: GROUP_LABEL[GROUP_ID.PLAZA_CASE] },
  { id: GROUP_ID.GUIDELINES, label: GROUP_LABEL[GROUP_ID.GUIDELINES] },
  { id: GROUP_ID.ENGINEERING, label: '검사 사례' },
  { id: GROUP_ID.COLLABORATION, label: aiPractice.collaborationTitle },
];

export function AiPractice() {
  return <AiPracticeView content={aiPractice} groups={groups} />;
}
