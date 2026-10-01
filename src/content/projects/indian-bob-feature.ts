import { IB_EDGE, IB_SYSTEM } from '@/constants/surface';
import type { Feature } from '@/dto/feature.dto';

export const indianBobFeature: Feature = {
  label: 'HABIT',
  title: 'HABIT — 하나의 기능이 걸친 영역',
  hint: '영역을 선택하면 관련 시스템과 작업이 표시됩니다',
  note: '설명용 도식 · 선택 항목의 순서는 실행 순서가 아니며, 선은 시스템 사이의 연결만 나타냅니다',
  systems: [
    { id: IB_SYSTEM.ADMIN, sub: 'Next.js' },
    { id: IB_SYSTEM.API, sub: 'NestJS' },
    { id: IB_SYSTEM.APP, sub: 'Flutter' },
    { id: IB_SYSTEM.DATA },
  ],
  steps: [
    {
      id: 'admin',
      label: '관리자 설정',
      surface: 'ADMIN',
      systems: [IB_SYSTEM.ADMIN],
      edges: [IB_EDGE.ADMIN_API],
      body: 'Next.js 관리자에서 해빗 생성·수정·복제와 이벤트 관리 기능, 기간·숫자 입력 검증을 작업했습니다.',
    },
    {
      id: 'api',
      label: '서버 처리',
      surface: 'API',
      systems: [IB_SYSTEM.API, IB_SYSTEM.DATA],
      edges: [IB_EDGE.ADMIN_API, IB_EDGE.APP_API, IB_EDGE.API_DATA],
      body: 'NestJS API에서 해빗·이벤트 데이터와 관련 로직을 작업했습니다.',
    },
    {
      id: 'app',
      label: '앱 참여',
      surface: 'APP',
      systems: [IB_SYSTEM.APP],
      edges: [IB_EDGE.APP_API],
      body: 'Flutter 앱에서 사용자가 해빗·이벤트에 참여하는 UI를 작업했습니다.',
    },
    {
      id: 'reward',
      label: '데이터 연동',
      surface: 'API',
      systems: [IB_SYSTEM.API, IB_SYSTEM.DATA],
      edges: [IB_EDGE.API_DATA],
      body: '해빗 기능에 필요한 데이터 구조의 변경을 팀원들과 조율하고 서버와 화면에 반영했습니다.',
    },
  ],
};
