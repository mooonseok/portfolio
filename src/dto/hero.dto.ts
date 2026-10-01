import type { YearRange } from '@/dto/site.dto';

export interface HeroViewProps {
  name: string;
  primaryAction: { href: string; label: string };
  role: string;
  disciplines: string;
  headline: string;
  introduction: string;
  range: YearRange;
}
