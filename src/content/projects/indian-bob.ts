import { FLOOR } from '@/constants/floor';
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
  num: '02',
  title: 'INDIAN BOB',
  category: 'APP / API / ADMIN',
  period: '2024—2025',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.MEDIUM,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / API / Admin',
  boardService: '해빗 참여 서비스',
  layers: [
    {
      floor: FLOOR.APP,
      summary: '해빗 이용·입력 검증',
      lines: ['해빗 이용 화면과 상태 처리, 단계별 입력 검증을 개발했습니다.'],
      tech: 'Flutter',
    },
    {
      floor: FLOOR.ADMIN,
      summary: '해빗·이벤트 관리',
      lines: [
        '해빗 생성·수정·복제와 이벤트 관리 화면을 개발했습니다.',
        '기간·숫자·이미지 입력을 검증하고, 복제 시 기존 이미지와 새 파일을 처리했습니다.',
      ],
      tech: 'Next.js',
    },
    {
      floor: FLOOR.API,
      summary: '해빗·팀 기능',
      lines: [
        '해빗 기능의 서버 API를 작업했습니다.',
        '팀 생성·수정과 승인 방식에 따른 회원 등록·가입 요청 저장을 구현했습니다. 정원·중복 요청과 설정 변경 권한도 확인하도록 했습니다.',
      ],
      tech: 'NestJS',
    },
  ],
  summary: '해빗에 참여하고 팀원들과 함께 활동하는 서비스입니다.',
  links: [
    {
      label: 'Google Play에서 앱 보기',
      href: 'https://play.google.com/store/apps/details?id=com.connecto.indianbob&hl=ko',
    },
  ],
  home: {
    features: [
      {
        title: '해빗 이용',
        body: [
          '앱 화면과 상태 처리, 입력 검증을 개발하고 해빗 기능의 서버 API를 작업했습니다.',
        ],
      },
      {
        title: '관리자 운영',
        body: [
          '해빗 생성·수정·복제와 이벤트 관리 화면을 만들고, 기간·숫자·이미지 입력을 검증했습니다.',
        ],
      },
      {
        title: '팀 기능',
        body: [
          '팀 생성·수정과 회원 등록·가입 요청 처리를 구현하고, 정원·중복 요청·설정 변경 권한을 확인하도록 했습니다.',
        ],
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
