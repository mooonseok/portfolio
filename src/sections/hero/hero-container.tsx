import { HeroView } from './hero-view';
import { site } from '@/content/site';

export function HeroContainer() {
  return (
    <HeroView
      primaryAction={site.primaryAction}
      name={site.name}
      github={site.contact.github}
      role={site.role}
      disciplines={site.disciplines}
      range={site.range}
      headline={site.headline}
      introduction={site.introduction}
    />
  );
}
