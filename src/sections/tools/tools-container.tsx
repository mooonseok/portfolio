import { ToolsView } from './tools-view';
import type { HomeSectionProps } from '@/dto/profile.dto';
import { site, tools } from '@/content/site';

export function ToolsContainer({ compact = false }: HomeSectionProps) {
  return <ToolsView rows={tools} about={site.about} compact={compact} />;
}
