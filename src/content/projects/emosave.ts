import { FLOOR } from '@/constants/floor';
import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { emosaveCase } from './emosave-case';

const mainVisual = {
  src: '/images/projects/emosave/main-restored.png',
  alt: '모듈형 마을 커스터마이징을 표현한 개념 이미지',
};

export const emosave: Project = {
  slug: PROJECT_SLUG.EMOSAVE,
  num: '02',
  title: 'EMOSAVE',
  category: 'MOBILE INTERACTION',
  period: '2022—2023',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.SHORT,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'Mobile / Flutter',
  boardService: '감정 기록 앱',
  layers: [
    {
      floor: FLOOR.APP,
      tech: 'Flutter',
      lines: ['감정 탭', '마을 편집 상태', '저장·캡처 공유'],
    },
  ],
  summary:
    '분저장(Emosave)은 감정을 기록하고 캐릭터와 아이템으로 마을을 꾸미는 앱입니다.',
  links: [
    {
      label: 'Google Play에서 앱 보기',
      href: 'https://play.google.com/store/apps/details?id=com.lab254.emosave&hl=ko',
    },
  ],
  home: {
    features: [
      {
        title: '감정 기록',
        body: ['감정 선택 화면과 상태 관리를 구현했습니다.'],
      },
      {
        title: '마을 편집',
        body: ['마을의 아이템을 편집하는 기능을 개발했습니다.'],
      },
      {
        title: '저장과 공유',
        body: ['편집 결과 저장과 다이어리 화면 공유를 구현했습니다.'],
      },
    ],
    scope: ['Character / Village', 'Customization', 'Emoticon / Store'],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '서비스 화면을 대신한 개념 이미지',
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 422px, (min-width: 1024px) calc(33.333vw - 45.333px), (min-width: 744px) calc(37.5vw - 42.5px), calc(100vw - 40px)',
      id: VISUAL_ID.EMOSAVE_HOME,
      brief: 'EMOSAVE — modular objects, 4:5 r20',
    },
    main: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 756px, (min-width: 1024px) 58.33vw, (min-width: 744px) 62.5vw, 100vw',
      position: '50% 65%',
      id: VISUAL_ID.EMOSAVE_MAIN,
      brief: 'modular objects, 4:5 r24',
    },
    custom: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 360px, (min-width: 1024px) calc(27.7778vw - 29.1111px), (min-width: 744px) calc(37.5vw - 42.5px), calc(100vw - 40px)',
      position: '50% 75%',
      id: VISUAL_ID.EMOSAVE_CUSTOM,
      brief: 'customization, 1:1',
    },
    village: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 360px, (min-width: 1024px) calc(27.7778vw - 29.1111px), (min-width: 744px) calc(25vw - 35px), calc(100vw - 40px)',
      position: '50% 40%',
      id: VISUAL_ID.EMOSAVE_VILLAGE,
      brief: 'character / village, 1:1',
    },
    store: {
      id: VISUAL_ID.EMOSAVE_STORE,
      alt: '이모티콘·스토어 오브젝트 — 개념 이미지',
      brief: 'emoticon / store, 1:1',
    },
  },
  case: emosaveCase,
};
