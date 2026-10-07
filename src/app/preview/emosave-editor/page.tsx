import type { Metadata } from 'next';
import { EmosaveEditorContainer } from '@/sections/emosave-editor/emosave-editor-container';

export const metadata: Metadata = {
  title: 'Emosave 배치 편집 미리보기 — 박문석',
  description: '집 아이템의 선택·이동·회전을 보여 주는 설명용 편집 예시',
  robots: { index: false, follow: false },
};

export default function EmosaveEditorPage() {
  return <EmosaveEditorContainer />;
}
