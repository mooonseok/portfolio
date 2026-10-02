import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { indianBobCase } from './indian-bob-case';

const mainVisual = {
  src: '/images/projects/indian-bob/main-restored.png',
  alt: '모바일과 관리자 기기의 연결을 표현한 개념 이미지',
};

export const indianBob: Project = {
  slug: PROJECT_SLUG.INDIAN_BOB,
  num: '01',
  title: 'INDIAN BOB',
  category: 'APP / API / ADMIN',
  period: '2024—2025',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.MEDIUM,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / API / Admin',
  summary:
    '해빗 참여와 팀 활동을 지원하는 서비스입니다. Flutter 앱, 관리자 웹, 서버 API에 걸쳐 기능을 개발했습니다.',
  home: {
    features: [
      {
        title: '해빗 이용',
        body: ['Flutter 앱에서 해빗을 이용하는 화면과 상태 처리'],
      },
      {
        title: '관리자 운영',
        body: ['해빗 생성·수정·복제와 기간·입력값 검증'],
      },
      {
        title: '팀 기능',
        body: ['팀 생성·수정과 자동 승인 여부에 따른 가입 처리'],
      },
    ],
    scope: ['Flutter App', 'Habit', 'Admin Web', 'Server API'],
    scopeMobile: ['Flutter', 'Habit', 'Web', 'API'],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '앱과 관리자 웹의 연결을 표현한 개념 이미지',
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 644px, (min-width: 1024px) calc(50vw - 58px), (min-width: 744px) calc(75vw - 65px), calc(100vw - 40px)',
      id: VISUAL_ID.INDIANBOB_HOME,
      brief: 'INDIAN BOB — mobile + admin surfaces, 4:3',
    },
    app: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 422px, (min-width: 1024px) 33vw, (min-width: 744px) 37.5vw, 50vw',
      position: '0% 60%',
      id: VISUAL_ID.INDIANBOB_APP,
      brief: 'mobile surface, 3:4',
    },
    admin: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 756px, (min-width: 1024px) 58.33vw, (min-width: 744px) 62.5vw, 50vw',
      position: '100% 60%',
      id: VISUAL_ID.INDIANBOB_ADMIN,
      brief: 'admin surface, 4:3',
    },
  },
  case: indianBobCase,
};
