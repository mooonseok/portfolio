import { OrbitHome } from '@/components/organisms/orbit/orbit-home';
import { ACTIVITY } from '@/constants/orbit';
import { activity } from '@/content/activity';
import { activityConfig } from '@/content/activity-topics';
import type { ActivityProject } from '@/dto/activity.dto';
import type { OrbitProjectView } from '@/dto/orbit.dto';
import { fullDate, shortDate, toProjects } from '@/lib/activity/to-projects';
import { fetchActivity } from '@/lib/github/fetch-activity';

function toView(project: ActivityProject): OrbitProjectView {
  const count = `${activity.countPrefix}${project.count}${activity.countSuffix}`;
  return {
    key: project.key,
    title: project.title,
    sub: project.sub,
    skin: project.skin,
    tag: project.tag,
    last: fullDate(project.last),
    count,
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
    commits: project.commits.map(
      (commit) =>
        `${shortDate(commit.date)}  ${commit.part ? `[${commit.part}] ` : ''}${commit.title}`
    ),
    aria: [
      project.title,
      project.tag,
      project.sub,
      `${activity.recent} ${count}`,
    ]
      .filter(Boolean)
      .join(', '),
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
        lastCommit: activity.lastCommit,
        recent: activity.recent,
        repo: activity.repo,
        empty: activity.empty,
        stale: snapshot.live
          ? null
          : `${activity.stale} ${fullDate(snapshot.asOf)}`,
        history: activity.history,
      }}
    />
  );
}
