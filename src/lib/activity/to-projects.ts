import type {
  ActivityConfig,
  ActivityProject,
  RepoActivity,
} from '@/dto/activity.dto';

const SPLIT = /^(.*?)[_-](client|web|app|server|api|admin)$/i;

const titleCase = (key: string) =>
  key
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

function emptyProject(key: string, config: ActivityConfig): ActivityProject {
  const topic = config.topics[key];
  return {
    key,
    title: topic?.title ?? titleCase(key),
    sub: topic?.sub ?? '',
    skin: topic?.skin ?? config.fallbackSkin,
    tag: topic?.tag ?? null,
    count: 0,
    last: '',
    private: true,
    repos: [],
    commits: [],
  };
}

export function toProjects(
  repos: RepoActivity[],
  config: ActivityConfig,
  limit: number,
  commits: number
): ActivityProject[] {
  const map = new Map<string, ActivityProject>();
  for (const repo of repos) {
    if (config.exclude.includes(repo.name) || repo.count < 1) continue;
    const match = repo.name.match(SPLIT);
    const key = match ? match[1] : repo.name;
    const part = match ? (config.parts[match[2].toLowerCase()] ?? null) : null;
    const project = map.get(key) ?? emptyProject(key, config);
    map.set(key, project);
    project.repos.push({
      name: repo.name,
      part,
      href: repo.private
        ? null
        : `https://github.com/${config.owner}/${repo.name}`,
    });
    project.count += repo.count;
    if (repo.last > project.last) project.last = repo.last;
    project.private = project.private && repo.private;
    if (!config.hideCommits.includes(repo.name))
      project.commits.push(...repo.commits.map((item) => ({ ...item, part })));
  }
  return [...map.values()]
    .map((project) => ({
      ...project,
      commits: [...project.commits]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, commits),
    }))
    .sort((a, b) => b.last.localeCompare(a.last) || b.count - a.count)
    .slice(0, limit);
}

export const fullDate = (iso: string) => iso.slice(0, 10).replaceAll('-', '.');

export const shortDate = (iso: string) => iso.slice(5, 10).replace('-', '.');
