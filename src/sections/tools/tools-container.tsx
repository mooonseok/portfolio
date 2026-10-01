import { ToolsView } from './tools-view';
import { site, tools } from '@/content/site';

export function ToolsContainer() {
  return <ToolsView rows={tools} about={site.about} />;
}
