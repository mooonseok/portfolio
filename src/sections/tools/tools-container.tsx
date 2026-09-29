import { ToolsView } from './tools-view';
import { tools } from '@/content/site';

export function ToolsContainer() {
  return <ToolsView rows={tools} />;
}
