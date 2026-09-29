import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { emosaveCase } from './emosave-case';

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
      id: VISUAL_ID.EMOSAVE_HOME,
      alt: '둥근 모듈형 오브젝트와 캐릭터 토큰 — 개념 이미지',
      brief: 'EMOSAVE — modular objects, 4:5 r20',
    },
    main: {
      id: VISUAL_ID.EMOSAVE_MAIN,
      alt: '모듈형 오브젝트와 캐릭터 토큰 — 개념 이미지',
      brief: 'modular objects, 4:5 r24',
    },
    custom: {
      id: VISUAL_ID.EMOSAVE_CUSTOM,
      alt: '꾸미기 오브젝트 배치 — 개념 이미지',
      brief: 'customization, 1:1',
    },
    village: {
      id: VISUAL_ID.EMOSAVE_VILLAGE,
      alt: '캐릭터와 마을 그리드 — 개념 이미지',
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
