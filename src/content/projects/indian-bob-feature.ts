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
      body: '팀 가입은 자동 승인 여부에 따라 회원 등록과 가입 요청으로 나뉩니다. 기존 가입·요청을 확인하고, 자동 승인 시 정원을 검사합니다. 설정 변경은 서버에서 리더 권한을 확인합니다.',
    },
  ],
};
