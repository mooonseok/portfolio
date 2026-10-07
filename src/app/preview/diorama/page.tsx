import type { Metadata } from 'next';
import { DioramaPreviewContainer } from '@/sections/diorama-preview/diorama-preview-container';

export const metadata: Metadata = {
  title: 'FarmFam+ 디오라마 미리보기 — 박문석',
  description: 'FarmFam+ 프로젝트 선택 화면 미리보기',
  robots: { index: false, follow: false },
};

export default function DioramaPreviewPage() {
  return <DioramaPreviewContainer />;
}
