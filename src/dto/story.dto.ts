import type { StoryKind } from '@/constants/project';
import type { FlowNode } from '@/dto/flow.dto';

export interface Story {
  id: string;
  title: string;
  kind: StoryKind;
  flow: FlowNode[];
  description: string;
  keywords?: string[];
}
