import { HeroView } from './hero-view';
import { SiteHeader } from '@/components/organisms/site-header';
import { site } from '@/content/site';

export function HeroContainer() {
  return (
    <HeroView
      header={<SiteHeader />}
      name={site.name}
      role={site.role}
      disciplines={site.disciplines}
      range={site.range}
    />
  );
}
