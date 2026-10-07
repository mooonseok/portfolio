import type { Metadata } from 'next';
import { ClassicHome } from '@/app/_home/classic-home';
export const metadata: Metadata = {
  title: '기존 홈 미리보기 — 박문석',
  robots: { index: false, follow: false },
};
export default function ClassicPreviewPage() {
  return <ClassicHome />;
}
