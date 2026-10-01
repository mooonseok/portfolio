import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/sections/case-studies/case-registry';
import { getProject, getProjects } from '@/lib/content';
import { site } from '@/content/site';
import { pageMetadata, siteSettings } from '@/lib/site-metadata';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata(
    siteSettings(process.env.SITE_URL, process.env.SITE_INDEXABLE),
    {
      title: `${p.title} — ${p.category} · Park Moonseok`,
      description: p.summary,
      path: `/work/${p.slug}`,
      siteName: site.name,
    }
  );
}

export const dynamicParams = false;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  const Comp = p ? caseStudies[p.slug] : undefined;
  if (!p || !Comp) notFound();
  return <Comp p={p} />;
}
