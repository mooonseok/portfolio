import { OrbitHome } from '@/components/organisms/orbit/orbit-home';
import { ACTIVITY } from '@/constants/orbit';
import { activity } from '@/content/activity';
import { activityConfig } from '@/content/activity-topics';
import type { ActivityProject } from '@/dto/activity.dto';
import type { OrbitProjectView } from '@/dto/orbit.dto';
import { fullDate, toProjects } from '@/lib/activity/to-projects';
import { fetchActivity } from '@/lib/github/fetch-activity';

function toView(project: ActivityProject): OrbitProjectView {
  return {
    key: project.key,
    title: project.title,
    sub: project.sub,
    skin: project.skin,
    tag: project.tag,
    last: fullDate(project.last),
    repos: project.repos.flatMap((repo) =>
      repo.href
        ? [
            {
              label: repo.part
                ? `${repo.part} ${activity.repoSuffix}`
                : activity.open,
              href: repo.href,
              aria: repo.part
                ? `${repo.part} ${activity.repoSuffix}, ${project.title}, ${activity.newTab}`
                : `${activity.open}, ${project.title} ${activity.repoSuffix}, ${activity.newTab}`,
            },
          ]
        : []
    ),
    privateNote: project.private ? activity.privateNote : null,
    commits: project.commits.map((commit) => commit.title),
    aria: [project.title, project.tag, project.sub].filter(Boolean).join(', '),
  };
}

export async function ActivityContainer() {
  const snapshot = await fetchActivity();
  const projects = toProjects(
    snapshot.repos,
    activityConfig,
    ACTIVITY.PROJECTS,
    ACTIVITY.COMMITS
  );
  return (
    <OrbitHome
      projects={projects.map(toView)}
      bodies={projects.map((project) => ({
        skin: project.skin,
        count: project.count,
      }))}
      copy={{
        heading: activity.heading,
        panelLabel: activity.panelLabel,
        instruction: activity.instruction,
        fallbackInstruction: activity.fallbackInstruction,
        recentWork: activity.recentWork,
        moreWork: activity.moreWork,
        lessWork: activity.lessWork,
        lastCommit: activity.lastCommit,
        repo: activity.repo,
        empty: activity.empty,
        history: activity.history,
      }}
    />
  );
}
