import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { emosaveCase } from './emosave-case';

const mainVisual = {
  src: '/images/projects/emosave/main.jpg',
  alt: '모듈형 마을 커스터마이징을 표현한 개념 이미지',
  scale: 1.1,
};

export const emosave: Project = {
  slug: PROJECT_SLUG.EMOSAVE,
  num: '05',
  title: 'EMOSAVE',
  category: 'MOBILE INTERACTION',
  period: '2022',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.SHORT,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'Mobile / Flutter',
  summary:
    '감정 캐릭터와 마을을 중심으로 한 Flutter 앱에서 꾸미기와 이모티콘·스토어 등 상태 기반 모바일 UI를 개발했습니다.',
  home: {
    scope: ['Character / Village', 'Customization', 'Emoticon / Store'],
    flows: [],
    cta: 'PROJECT NOTE',
  },
  visuals: {
    home: {
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
      sizes: '(min-width: 744px) 33vw, 100vw',
      position: '50% 75%',
      id: VISUAL_ID.EMOSAVE_CUSTOM,
      brief: 'customization, 1:1',
    },
    village: {
      ...mainVisual,
      sizes: '(min-width: 744px) 33vw, 100vw',
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
