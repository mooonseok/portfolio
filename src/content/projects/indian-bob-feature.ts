import { IB_EDGE, IB_SYSTEM } from '@/constants/surface';
import type { Feature } from '@/dto/feature.dto';

export const indianBobFeature: Feature = {
  label: 'FEATURE CONNECTIONS',
  title: '기능별로 연결되는 시스템',
  hint: '기능을 선택하면 관련 시스템과 연결 설명이 바뀝니다',
  note: '설명용 관계 도식 · 선은 시스템 연결을 나타내며 실행 순서가 아닙니다',
  systems: [
    { id: IB_SYSTEM.ADMIN, sub: 'Next.js' },
    { id: IB_SYSTEM.API, sub: 'NestJS' },
    { id: IB_SYSTEM.APP, sub: 'Flutter' },
    { id: IB_SYSTEM.DATA },
  ],
  steps: [
    {
      id: 'habit',
      label: '해빗 이용',
      surface: 'HABIT',
      systems: [IB_SYSTEM.APP, IB_SYSTEM.API, IB_SYSTEM.DATA],
      edges: [IB_EDGE.APP_API, IB_EDGE.API_DATA],
      body: '사용자 화면에 필요한 해빗 데이터와 서버 API의 응답 구조가 맞물립니다. 화면 상태와 데이터 변경을 함께 확인하며 앱과 API에 반영했습니다.',
    },
    {
      id: 'admin',
      label: '관리자 운영',
      surface: 'MANAGEMENT',
      systems: [IB_SYSTEM.ADMIN, IB_SYSTEM.API, IB_SYSTEM.DATA],
      edges: [IB_EDGE.ADMIN_API, IB_EDGE.API_DATA],
      body: '관리자 입력값과 API에서 처리하는 데이터 형태가 맞아야 합니다. 해빗 생성·수정·복제에 사용하는 기간·숫자·이미지 입력을 검증했습니다.',
    },
    {
      id: 'team',
      label: '팀 기능',
      surface: 'TEAM',
      systems: [IB_SYSTEM.APP, IB_SYSTEM.API, IB_SYSTEM.DATA],
      edges: [IB_EDGE.APP_API, IB_EDGE.API_DATA],
      body: '팀 화면의 생성·수정 요청은 서버의 권한 확인과 팀 데이터 처리에 연결됩니다. 공개 설정에 따른 가입 처리와 수정 권한을 서버에서 다뤘습니다.',
    },
  ],
};
