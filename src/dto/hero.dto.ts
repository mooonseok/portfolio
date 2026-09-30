import type { YearRange } from '@/dto/site.dto';

export interface HeroViewProps {
  name: string;
  role: string;
  disciplines: string;
  range: YearRange;
}
