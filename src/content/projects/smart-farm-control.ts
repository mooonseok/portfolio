import { CONTROL_ZONE } from '@/constants/control';
import type { ControlCondition } from '@/dto/experiment.dto';

export const smartFarmConditions: ControlCondition[] = [
  {
    id: 'command-expiry',
    label: '명령 만료',
    zone: CONTROL_ZONE.RECEIVE,
    location: '제어기 안전 로직 · 명령 수신 관련',
    fields: [
      {
        label: 'Edge case',
        body: [
          '네트워크 지연이나 연결 복구 이후 오래된 제어 명령이 뒤늦게 실행되는 상황을 방지할 필요가 있었습니다.',
        ],
      },
      {
        label: 'Handling',
        body: [
          '명령의 유효 시간을 검사해 만료된 명령이 장비 동작으로 이어지지 않도록 하는 로직을 구현했습니다.',
        ],
      },
    ],
  },
  {
    id: 'duplicate-command',
    label: '중복 명령 방지',
    zone: CONTROL_ZONE.RECEIVE,
    location: '제어기 안전 로직 · 명령 수신 관련',
    fields: [
      {
        label: 'Edge case',
        body: [
          '동일한 명령이 재전송되거나 중복 수신될 경우 장비 동작이 반복될 수 있습니다.',
        ],
      },
      {
        label: 'Handling',
        body: [
          '중복 명령을 구분해 동일 명령이 반복 실행되지 않도록 방어 로직을 구현했습니다.',
        ],
      },
    ],
  },
  {
    id: 'fail-safe',
    label: 'Fail-safe',
    zone: CONTROL_ZONE.ACTUATE,
    location: '제어기 안전 로직 · 장비 동작 관련',
    fields: [
      {
        label: 'Risk',
        body: [
          '서버나 네트워크 상태와 무관하게 장비가 예상하지 못한 상태로 계속 동작하는 상황을 고려해야 했습니다.',
        ],
      },
      {
        label: 'Behavior',
        body: [
          '브로커 연결이 일정 시간 끊기면 출력을 강제로 끄고 그 상태를 유지하는 fail-safe 동작을 제어기 내부에 구현했습니다.',
        ],
      },
    ],
  },
  {
    id: 'duty-limit',
    label: 'Duty 제한',
    zone: CONTROL_ZONE.ACTUATE,
    location: '제어기 안전 로직 · 장비 동작 관련',
    fields: [
      {
        label: 'Why it mattered',
        body: [
          '제어 명령이 정상적으로 전달되더라도 액추에이터를 무제한 동작시키는 구조는 피해야 했습니다.',
        ],
      },
      {
        label: 'Implementation',
        body: [
          '장비 동작 시간을 제한하기 위한 duty 관련 제어 로직을 구현했습니다.',
        ],
      },
    ],
  },
  {
    id: 'device-identity',
    label: '장치 식별 · bootId',
    zone: CONTROL_ZONE.CONTROLLER,
    location: '제어기 전체 · 장치 상태 식별',
    fields: [
      {
        label: 'Implementation',
        body: [
          '제어기 재시작 전후의 상태를 구분하고 명령 처리 맥락을 식별하기 위해 bootId를 포함한 장치 상태 식별 방식을 사용했습니다.',
        ],
      },
    ],
  },
];
