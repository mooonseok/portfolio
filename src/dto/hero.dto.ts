import type { ReactNode } from 'react';
import type { YearRange } from '@/dto/site.dto';

export interface HeroViewProps {
  header: ReactNode;
  name: string;
  role: string;
  disciplines: string;
  range: YearRange;
}
