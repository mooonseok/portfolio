import { EMO_STATE } from '@/constants/emo-state';
import { VISUAL_SLOT } from '@/constants/visual';
import type { CaseContent } from '@/dto/case.dto';

export const emosaveCase: CaseContent = {
  role: ['4인 팀에서 감정 탭과 편집 화면에 들어가는 기능 전반을 담당했습니다.'],
  contextProblem: [],
  systemFlows: [],
  interactionFocus: [
    {
      title: '마을 꾸미기',
      body: [
        '마을을 구성하는 캐릭터와 아이템을 배치하고 변경하는 꾸미기 UI를 작업했습니다.',
      ],
      visual: VISUAL_SLOT.CUSTOM,
      withStates: true,
    },
    {
      title: '캐릭터와 마을',
      body: [
        '캐릭터와 이모티콘 데이터를 기반으로 마을 화면의 상태를 구성하고 표시하는 기능을 작업했습니다.',
      ],
      visual: VISUAL_SLOT.VILLAGE,
    },
    {
      title: '이모티콘과 스토어',
      body: ['이모티콘 삭제, 스토어 UI 수정과 로컬라이징을 작업했습니다.'],
      visual: VISUAL_SLOT.STORE,
    },
  ],
  stateExample: {
    label: '꾸미기 상태',
    intro:
      '마을 꾸미기에서 사용자가 아이템을 선택하고 배치한 결과가 화면 상태에 반영되는 흐름을 단순화해 표현합니다.',
    caption: '편집 상태를 단순화한 설명용 도식 · 실제 앱 화면 아님',
    homeCaption: '설명용 예시 · 실제 앱 화면 아님',
    slotLabel: '배치 영역',
    trayLabel: '아이템',
    states: [
      {
        id: EMO_STATE.DEFAULT,
        label: '기본',
        code: 'DEFAULT',
        title: '아이템을 고르기 전',
        body: '선택된 아이템이 없습니다. 배치 영역은 현재 마을 구성을 그대로 보여줍니다.',
      },
      {
        id: EMO_STATE.SELECTED,
        label: '선택',
        code: 'SELECTED',
        title: '아이템을 고른 상태',
        body: '고른 아이템에 선택 외곽선이 표시됩니다. 선택한 아이템을 이동하거나 회전할 수 있습니다.',
      },
      {
        id: EMO_STATE.PLACED,
        label: '배치',
        code: 'PLACED',
        title: '배치 영역에 놓은 결과',
        body: '선택한 아이템이 배치 영역에 놓이고, 그 결과가 마을 화면 상태에 반영됩니다.',
      },
    ],
  },
  work: [
    {
      title: '감정 기록',
      body: [
        '감정 탭의 선택과 상태 처리를 개발하고 화면에 선택 결과를 반영했습니다.',
      ],
    },
    {
      title: '마을 편집',
      body: [
        '아이템 선택·이동·회전·삭제를 다루는 편집 UI와 상태 처리를 개발했습니다.',
      ],
    },
    {
      title: '저장·공유',
      body: [
        '편집 결과의 API·로컬 저장을 처리하고, 다이어리 상세 화면을 이미지로 캡처해 공유하는 기능을 개발했습니다.',
      ],
    },
    {
      title: '스토어와 이모티콘',
      body: ['이모티콘 삭제, 스토어 UI 수정과 로컬라이징을 작업했습니다.'],
    },
  ],
  workParagraphs: [],
  decisions: [],
  techNotes: [
    {
      id: 'editor-state',
      title: '편집 상태와 화면 갱신',
      fields: [
        {
          label: '문제',
          body: [
            '아이템의 선택 상태, 이동량, 회전 각도가 각각 바뀌므로 화면 표시와 저장할 배치 정보를 함께 다뤄야 했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '이동량과 회전 각도를 각각 Cubit으로 관리하고 BlocBuilder의 배치를 수정했습니다. 저장 데이터에는 기존 좌표와 이동량을 합산하고 현재 회전 각도를 반영했습니다.',
          ],
        },
        {
          label: '처리 결과',
          body: [
            '선택한 아이템의 위치·회전·크기를 최종 배치 데이터로 구성하고, 일반 마을 화면은 저장된 위치와 회전 정보를 이용해 표시합니다.',
          ],
        },
        {
          label: '저장 경계',
          body: [
            '로컬 저장소에 변경을 반영하고 마을 API에 최종 배치 정보를 요청합니다. 두 저장 경로는 하나의 트랜잭션으로 처리하지 않습니다.',
          ],
        },
      ],
    },
  ],
  currentState: [
    '이때 쌓은 경험은 이후 IndianBob을 비롯한 프로젝트에서 상태 관리 구조를 이해하고 구현하는 바탕이 됐습니다.',
  ],
};
