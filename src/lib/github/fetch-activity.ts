import { ACTIVITY } from '@/constants/orbit';
import { activitySnapshot } from '@/content/activity-snapshot';
import type { ActivitySnapshot } from '@/dto/activity.dto';
import { readActivity, type ActivityResponse } from './read-activity';

const QUERY = `query($since: GitTimestamp!, $repos: Int!, $commits: Int!) {
  viewer {
    repositories(first: $repos, ownerAffiliations: OWNER, orderBy: { field: PUSHED_AT, direction: DESC }) {
      nodes {
        name
        isPrivate
        isArchived
        defaultBranchRef {
          target {
            ... on Commit {
              history(since: $since, first: $commits) {
                totalCount
                nodes { committedDate messageHeadline }
              }
            }
          }
        }
      }
    }
  }
}`;

const DAY = 86_400_000;

export async function fetchActivity(
  now = Date.now()
): Promise<ActivitySnapshot> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return activitySnapshot;
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          since: new Date(now - ACTIVITY.WINDOW_DAYS * DAY).toISOString(),
          repos: ACTIVITY.REPOS,
          commits: ACTIVITY.FETCH_COMMITS,
        },
      }),
      next: { tags: [ACTIVITY.TAG], revalidate: ACTIVITY.REVALIDATE },
    });
    if (!response.ok) return { ...activitySnapshot, live: false };
    const repos = readActivity(
      (await response.json()) as ActivityResponse,
      ACTIVITY.COMMITS
    );
    return {
      asOf: new Date(now).toISOString().slice(0, 10),
      live: true,
      repos,
    };
  } catch {
    return { ...activitySnapshot, live: false };
  }
}
