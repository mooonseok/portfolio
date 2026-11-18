import { ProjectPlaza } from './components/plaza/project-plaza';
import { ORBIT_SKIN, ACTIVITY } from '@/constants/orbit';
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
  const order = [
    ORBIT_SKIN.SITE,
    ORBIT_SKIN.ALBUM,
    ORBIT_SKIN.TEXT,
    ORBIT_SKIN.CANDLE,
  ];
  return (
    <ProjectPlaza
      projects={projects
        .map(toView)
        .sort((a, b) => order.indexOf(a.skin) - order.indexOf(b.skin))}
      copy={{
        heading: activity.heading,
        close: activity.close,
        lastCommit: activity.lastCommit,
        empty: activity.empty,
        history: activity.history,
      }}
    />
  );
}
