import { AiPracticeSummaryView } from './ai-practice-summary-view';
import { aiPractice } from '@/content/ai-practice';

export function AiPracticeSummaryContainer() {
  return <AiPracticeSummaryView home={aiPractice.home} />;
}
