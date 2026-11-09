import type {
  ActivityConfig,
  ActivityProject,
  RepoActivity,
} from '@/dto/activity.dto';

const SPLIT = /^(.*?)[_-](client|web|app|server|api|admin)$/i;

const INTERNAL_ACTIVITY = [
  /^(?:chore|ci|build|test|docs|refactor|style)(?:\([^)]*\))?!?:/i,
  /^merge\b|^initial commit$|^revert\b/i,
  /\b(?:ci|cd|eslint|prettier|typecheck|lint|pnpm|npm|yarn|tsconfig|webpack|turbopack|husky)\b/i,
  /\b(?:pre-push|pre-commit|commit-msg|github actions|dependabot|renovate)\b/i,
  /\b(?:AGENTS|SKILL|HANDOFF|README)(?:\.md)?\b|package(?:-lock)?\.json|pnpm-lock|\.github\//i,
  /(?:검토|개발|코딩|서브)\s*에이전트|진행표|작업 지시서|하네스|권장안/,
  /(?:^|[\s·,(])(?:[A-Z]안|G[1-4])(?:[\s·,)]|$)/,
  /(?:개발(?:\s*서버)?|빌드|배포|프로젝트|로컬|환경|내부|도구)\s*(?:환경\s*)?설정|환경\s*변수/,
  /^(?:(?:feat|fix|perf)(?:\([^)]*\))?!?:\s*)?(?:설정|검증|테스트)\s*(?:추가|수정|변경|정리|보완|개선)/i,
  /커밋\s*(?:메시지|규칙|훅)|(?:품질|예산|경계|타입|자동)\s*(?:검사|검증)/,
  /(?:단위|통합|회귀|유닛|E2E)\s*테스트|테스트\s*(?:추가|수정|정리|보완)|테스트\s*커버리지/i,
  /(?:의존성|패키지)\s*(?:추가|업데이트|갱신|업그레이드)|리팩[터토]링/,
  /배포\s*(?:설정|자동화|파이프라인|시\s)|(?:터미널|서버|운영|프로덕션)\s*배포/,
  /^(?:빌드|배포)\s*(?:오류|실패)\s*(?:수정|해결|복구)/,
  /^(?:update|upgrade|bump|fix|configure|setup|add|remove)\s+(?:the\s+)?(?:dependencies|dev(?:elopment)?\s+server|build\s+(?:errors?|config)|deployment\s+(?:errors?|config)|test\s+(?:coverage|config))\b/i,
  /(?:저장소|레포|프로젝트)\s*(?:초기화|초기 설정|생성|시작)/,
] as const;

export function isPublicActivity(title: string): boolean {
  const subject = title
    .trim()
    .replace(/^(?:feat|fix|perf)(?:\([^)]*\))?!?:\s*/i, '');
  return (
    Boolean(subject) &&
    !INTERNAL_ACTIVITY.some(
      (rule) => rule.test(title.trim()) || rule.test(subject)
    )
  );
}

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
    if (!config.hideCommits.includes(repo.name)) {
      project.commits.push(
        ...repo.commits
          .filter((item) => isPublicActivity(item.title))
          .map((item) => ({ ...item, part }))
      );
    }
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
