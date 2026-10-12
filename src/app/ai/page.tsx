import type { Metadata } from 'next';
import { aiPractice } from '@/content/ai-practice';
import { site } from '@/content/site';
import { ROUTE } from '@/constants/navigation';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';
import { AiPractice } from '@/sections/case-studies/ai-practice';

export const metadata: Metadata = pageMetadata(
  siteSettings(process.env.SITE_URL, process.env.SITE_INDEXABLE),
  {
    title: `${aiPractice.title} · Park Moonseok`,
    description: aiPractice.description,
    path: ROUTE.AI_PRACTICE,
    siteName: site.name,
  }
);

export default function AiPracticePage() {
  return <AiPractice />;
}
