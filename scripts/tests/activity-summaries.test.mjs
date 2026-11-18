import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activitySnapshot } from '../../src/content/activity-snapshot.ts';
import {
  isPublicActivity,
  toProjects,
} from '../../src/lib/activity/to-projects.ts';
import { readActivity } from '../../src/lib/github/read-activity.ts';

const config = {
  owner: 'owner',
  exclude: [],
  hideCommits: [],
  parts: { client: '웹', server: '서버' },
  topics: {},
  fallbackSkin: 'site',
};

const internal = [
  '개편 작업용 진행표와 검토 에이전트 추가',
  '경로별 첫 로딩 JS 크기 예산 검사 추가',
  '커밋 메시지 규칙 검사 훅 추가',
  'pre-push 경량화와 PR 전체 품질 검사 유지',
  '터미널 배포 시 검증된 이미지 재사용',
  '자동매매 연구 시스템 저장소 시작',
  'B안 네이비 테마 통일과 이미지 API 없는 로컬 SVG·PNG 생성 연결',
  'chore(deps): update dependencies',
  'test: add regression coverage',
  'ci: run checks on pull requests',
  'docs: update README',
  'build!: update bundler',
  'refactor(auth): extract helper',
  'style: format sources',
  'fix(ci): retry failed checks',
  'feat: 개발 환경 설정 추가',
  '설정 변경',
  '빌드 오류 수정',
  'ESLint 설정 변경',
  'Update dependencies',
  'Update CI configuration',
  '개발 서버 설정 변경',
  'README 문서 보완',
  '배포 오류 수정',
  'fix: 빌드 오류 수정',
  'fix: Fix build errors',
  '검증 보완',
  '로그인 화면 추가와 회귀 테스트 보완',
  'Merge pull request #10 from feature',
  'initial commit',
  '   ',
];

const visible = [
  '알림 설정 화면 추가',
  '결제 입력 검증 개선',
  '사용자 설정 저장 오류 수정',
  '관리자 로그인·인증 화면 디자인 통일',
  '사진 검색 추가',
  '홈 작업 탐색과 대체 화면 보완',
  'feat(album): add photo search',
  'fix: restore notification preferences',
  'perf: speed up photo loading',
  '문서 검색 기능 추가',
  '배포 화면에서 진행 상태 표시',
  '개인정보 설정 변경',
  '구매 내역 다운로드 추가',
  '  사진 모아보기 추가  ',
];

test('명시적인 내부 작업과 내부 용어가 섞인 제목은 제외한다', () => {
  for (const title of internal)
    assert.equal(isPublicActivity(title), false, title);
});

test('등록하지 않은 기능 제목과 제품의 설정·검증 기능은 표시한다', () => {
  for (const title of visible)
    assert.equal(isPublicActivity(title), true, title);
  const commits = visible.map((title) => ({ date: '2026-11-09', title }));
  const [project] = toProjects(
    [
      {
        name: 'new-project',
        private: false,
        count: 20,
        last: '2026-11-09',
        commits,
      },
    ],
    config,
    4,
    20
  );
  assert.deepEqual(
    project.commits.map((commit) => commit.title),
    visible
  );
});

test('저장 기록의 원문·활동 건수·날짜를 유지하며 내부 작업만 제외한다', () => {
  const original = structuredClone(activitySnapshot);
  const projects = toProjects(activitySnapshot.repos, config, 4, 3);
  const blog = projects.find((project) => project.key === 'blog-automation');
  assert.deepEqual(
    blog.commits.map((commit) => commit.title),
    ['본문·요약·표 크기 확대와 이미지 추가 서비스 비용 제한']
  );
  const album = projects.find((project) => project.key === 'woori');
  assert.deepEqual(
    album.commits.map((commit) => commit.title),
    [
      '관리자 대시보드 디자인 통일과 반응형 개선',
      '관리자 로그인·인증 화면 디자인 통일',
    ]
  );
  assert.equal(album.count, 80);
  assert.equal(album.last, '2026-10-26');
  assert.deepEqual(
    projects.find((project) => project.key === 'portfolio').commits,
    []
  );
  assert.deepEqual(activitySnapshot, original);
});

test('실시간 응답과 저장 기록에 같은 필터를 적용한다', () => {
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

test('원문 필터 뒤 최신순으로 제한하며 원래 활동 날짜와 건수를 보존한다', () => {
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
  const [project] = toProjects([repo], config, 4, 1);
  assert.deepEqual(project.commits, [
    {
      date: '2026-11-06',
      title: '홈 작업 탐색과 대체 화면 보완',
      part: null,
    },
  ]);
  assert.equal(project.count, 12);
  assert.equal(project.last, '2026-11-09');
});
