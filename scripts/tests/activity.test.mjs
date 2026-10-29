import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { test } from 'node:test';
import {
  fullDate,
  shortDate,
  toProjects,
} from '../../src/lib/activity/to-projects.ts';
import { readActivity } from '../../src/lib/github/read-activity.ts';
import { verifySignature } from '../../src/lib/github/verify-signature.ts';

const config = {
  owner: 'owner',
  exclude: ['pair'],
  hideCommits: ['secret'],
  parts: { client: '웹', server: '서버' },
  topics: { woori: { title: '우리 앨범', sub: '앨범 앱', skin: 'album' } },
  fallbackSkin: 'site',
};

const repo = (name, last, count, extra = {}) => ({
  name,
  private: false,
  count,
  last,
  commits: [{ date: last, title: `${name} 커밋` }],
  ...extra,
});

test('client and server repos join into one topic with parts', () => {
  const [project] = toProjects(
    [
      repo('woori_client', '2026-10-26', 4),
      repo('woori_server', '2026-10-21', 3),
    ],
    config,
    4,
    3
  );
  assert.equal(project.title, '우리 앨범');
  assert.equal(project.count, 7);
  assert.equal(project.last, '2026-10-26');
  assert.deepEqual(
    project.repos.map((item) => item.part),
    ['웹', '서버']
  );
  assert.deepEqual(
    project.commits.map((item) => item.part),
    ['웹', '서버']
  );
});

test('excluded, idle and overflow repos are dropped, newest first', () => {
  const projects = toProjects(
    [
      repo('pair', '2026-10-29', 9),
      repo('idle', '2026-10-29', 0),
      repo('old-tool', '2026-09-30', 2),
      repo('new-tool', '2026-10-28', 1),
      repo('busy-tool', '2026-10-28', 5),
    ],
    config,
    2,
    3
  );
  assert.deepEqual(
    projects.map((item) => item.key),
    ['busy-tool', 'new-tool']
  );
  assert.equal(projects[0].title, 'Busy Tool');
});

test('private repos keep no link and hidden repos keep no commit titles', () => {
  const [project] = toProjects(
    [repo('secret', '2026-10-29', 2, { private: true })],
    config,
    4,
    3
  );
  assert.equal(project.private, true);
  assert.equal(project.repos[0].href, null);
  assert.deepEqual(project.commits, []);
});

test('GraphQL repos skip archived, empty and merge commits', () => {
  const node = (name, extra = {}) => ({
    name,
    isPrivate: false,
    isArchived: false,
    defaultBranchRef: {
      target: {
        history: {
          totalCount: 2,
          nodes: [
            {
              committedDate: '2026-10-29T03:00:00Z',
              messageHeadline: 'Merge pull request #1',
            },
            {
              committedDate: '2026-10-28T03:00:00Z',
              messageHeadline: '화면 추가',
            },
          ],
        },
      },
    },
    ...extra,
  });
  const repos = readActivity(
    {
      data: {
        viewer: {
          repositories: {
            nodes: [node('live'), node('gone', { isArchived: true }), null],
          },
        },
      },
    },
    3
  );
  assert.equal(repos.length, 1);
  assert.equal(repos[0].last, '2026-10-29');
  assert.deepEqual(repos[0].commits, [
    { date: '2026-10-28', title: '화면 추가' },
  ]);
});

test('webhook signature must match the body and secret', () => {
  const body = '{"ref":"refs/heads/main"}';
  const good = `sha256=${createHmac('sha256', 'key').update(body).digest('hex')}`;
  assert.equal(verifySignature('key', body, good), true);
  assert.equal(verifySignature('key', `${body} `, good), false);
  assert.equal(verifySignature('other', body, good), false);
  assert.equal(verifySignature('key', body, null), false);
  assert.equal(verifySignature('', body, good), false);
});

test('dates print as full and short dotted forms', () => {
  assert.equal(fullDate('2026-10-29'), '2026.10.29');
  assert.equal(shortDate('2026-10-29'), '10.29');
});
