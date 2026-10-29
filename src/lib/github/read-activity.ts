import type { ActivityCommit, RepoActivity } from '@/dto/activity.dto';

interface HistoryNode {
  committedDate: string;
  messageHeadline: string;
}

interface RepoNode {
  name: string;
  isPrivate: boolean;
  isArchived: boolean;
  defaultBranchRef: {
    target: {
      history?: { totalCount: number; nodes: HistoryNode[] };
    } | null;
  } | null;
}

export interface ActivityResponse {
  data?: { viewer?: { repositories?: { nodes?: (RepoNode | null)[] } } };
}

const MERGE = /^Merge (pull request|branch|remote-tracking)/;

export function readActivity(
  response: ActivityResponse,
  commits: number
): RepoActivity[] {
  const nodes = response.data?.viewer?.repositories?.nodes ?? [];
  return nodes.flatMap((node) => {
    const history = node?.defaultBranchRef?.target?.history;
    if (!node || node.isArchived || !history || history.totalCount < 1)
      return [];
    const items: ActivityCommit[] = history.nodes
      .filter((item) => !MERGE.test(item.messageHeadline))
      .slice(0, commits)
      .map((item) => ({
        date: item.committedDate.slice(0, 10),
        title: item.messageHeadline,
      }));
    return [
      {
        name: node.name,
        private: node.isPrivate,
        count: history.totalCount,
        last: history.nodes[0]?.committedDate.slice(0, 10) ?? '',
        commits: items,
      },
    ];
  });
}
