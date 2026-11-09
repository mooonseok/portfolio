import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activitySnapshot } from '../../src/content/activity-snapshot.ts';
import { activitySummaries } from '../../src/content/activity-summaries.ts';
import { toProjects } from '../../src/lib/activity/to-projects.ts';
import { readActivity } from '../../src/lib/github/read-activity.ts';

const config = {
  owner: 'owner',
  exclude: [],
  hideCommits: [],
  commitSummaries: activitySummaries,
  parts: { client: '웹', server: '서버' },
  topics: {},
  fallbackSkin: 'site',
};

test('저장 기록은 원문을 보존하고 방문자용 기능 변화만 표시한다', () => {
  const original = structuredClone(activitySnapshot);
  const projects = toProjects(activitySnapshot.repos, config, 4, 3);
  const blog = projects.find((project) => project.key === 'blog-automation');
  assert.deepEqual(
    blog.commits.map((commit) => commit.title),
    [
      '글에 넣을 이미지 생성',
      '본문·표 글자 크기 확대',
      '불필요한 자동 문구 제거',
    ]
  );
  const album = projects.find((project) => project.key === 'woori');
  assert.deepEqual(
    album.commits.map((commit) => commit.title),
    ['관리자 화면 모바일 배치 개선', '로그인 화면 디자인 통일']
  );
  assert.equal(album.count, 80);
  assert.equal(album.last, '2026-10-26');
  assert.deepEqual(
    projects.find((project) => project.key === 'portfolio').commits,
    []
  );
  assert.deepEqual(activitySnapshot, original);
});

test('실시간 응답과 저장 기록에 같은 표시 문구를 적용한다', () => {
  const snapshot = activitySnapshot.repos.find(
    (repo) => repo.name === 'blog-automation'
  );
  const live = readActivity(
    {
      data: {
        viewer: {
          repositories: {
            nodes: [
              {
                name: snapshot.name,
                isPrivate: false,
                isArchived: false,
                defaultBranchRef: {
                  target: {
                    history: {
                      totalCount: snapshot.count,
                      nodes: [
                        '검토 에이전트 추가',
                        'B안 내부 설정 변경',
                        'pre-push 검사 정리',
                        ...snapshot.commits.map((commit) => commit.title),
                      ].map((title) => ({
                        committedDate: `${snapshot.last}T03:00:00Z`,
                        messageHeadline: title,
                      })),
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
    6
  );
  assert.deepEqual(
    toProjects(live, config, 4, 3),
    toProjects([snapshot], config, 4, 3)
  );
});

test('표시 문구 선별 뒤 최신순으로 제한하고 실제 활동 날짜와 건수는 유지한다', () => {
  const repo = {
    name: 'portfolio',
    private: false,
    count: 12,
    last: '2026-11-09',
    commits: [
      { date: '2026-11-09', title: '검토 에이전트 추가' },
      { date: '2026-11-08', title: 'B안 설정 변경' },
      { date: '2026-11-07', title: 'pre-push 검사 변경' },
      { date: '2026-11-05', title: '사진 검색 추가' },
      { date: '2026-11-06', title: '홈 작업 탐색과 대체 화면 보완' },
    ],
  };
  const [project] = toProjects(
    [repo],
    {
      ...config,
      commitSummaries: {
        portfolio: {
          ...activitySummaries.portfolio,
          '사진 검색 추가': '사진 검색 추가',
        },
      },
    },
    4,
    1
  );
  assert.deepEqual(project.commits, [
    {
      date: '2026-11-06',
      title: '최근 작업 더보기·선택 안내 추가',
      part: null,
    },
  ]);
  assert.equal(project.count, 12);
  assert.equal(project.last, '2026-11-09');
});

test('미등록 제목이나 다른 레포의 같은 제목을 추측해서 노출하지 않는다', () => {
  const repos = ['unknown', 'constructor', 'portfolio'].map((name) => ({
    name,
    private: false,
    count: 1,
    last: '2026-11-09',
    commits: [
      { date: '2026-11-09', title: 'constructor' },
      { date: '2026-11-09', title: '새 기능처럼 보이는 확인 전 작업' },
      ...(name === 'unknown'
        ? [{ date: '2026-11-09', title: '홈 작업 탐색과 대체 화면 보완' }]
        : []),
    ],
  }));
  const projects = toProjects(repos, config, 4, 3);
  assert.equal(projects.length, 3);
  assert.ok(projects.every((project) => project.commits.length === 0));
});
