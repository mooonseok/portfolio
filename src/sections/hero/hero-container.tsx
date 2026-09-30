import { HeroView } from './hero-view';
import { site } from '@/content/site';

export function HeroContainer() {
  return (
    <HeroView
      name={site.name}
      role={site.role}
      disciplines={site.disciplines}
      range={site.range}
    />
  );
}
