import type { Metadata } from 'next';
import { DioramaPreviewContainer } from '@/components/organisms/project-workshop/diorama-preview-container';

export const metadata: Metadata = {
  title: '프로젝트 작업실 미리보기 — 박문석',
  description: '다섯 프로젝트의 담당 영역을 살펴보는 디오라마 미리보기',
  robots: { index: false, follow: false },
};

export default function DioramaPreviewPage() {
  return <DioramaPreviewContainer />;
}
