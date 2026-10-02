import type { Project } from '@/dto/project.dto';
import { farmfamPlus } from './farmfam-plus';
import { apc } from './apc';
import { smartFarm } from './smart-farm';
import { indianBob } from './indian-bob';
import { emosave } from './emosave';

export const projects: Project[] = [
  indianBob,
  emosave,
  farmfamPlus,
  apc,
  smartFarm,
];
