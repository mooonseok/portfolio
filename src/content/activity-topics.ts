import type { ActivityConfig } from '@/dto/activity.dto';
import { ORBIT_SKIN } from '@/constants/orbit';
import { activitySummaries } from '@/content/activity-summaries';

export const activityConfig: ActivityConfig = {
  owner: 'mooonseok',
  exclude: ['pair'],
  hideCommits: [],
  commitSummaries: activitySummaries,
  parts: {
    client: '웹',
    web: '웹',
    app: '앱',
    server: '서버',
    api: 'API',
    admin: '관리자',
  },
  topics: {
    portfolio: {
      title: '포트폴리오',
      sub: '개인 사이트',
      skin: ORBIT_SKIN.SITE,
    },
    'blog-automation': {
      title: '블로그 자동화',
      sub: '유튜브 영상으로 블로그 글 작성',
      skin: ORBIT_SKIN.TEXT,
    },
    woori: {
      title: '우리 앨범',
      sub: '그룹 사진 앨범 앱',
      skin: ORBIT_SKIN.ALBUM,
    },
    'auto-trading': {
      title: '자동매매 연구',
      sub: '주식·코인 매매 전략 연구 시스템',
      skin: ORBIT_SKIN.CANDLE,
      tag: '모의 운용',
    },
  },
  fallbackSkin: ORBIT_SKIN.SITE,
};
