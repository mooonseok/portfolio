import { ApcHero, ApcHome } from './apc/apc-art';
import { EmosaveCustom } from './emosave/custom';
import { EmosaveStore } from './emosave/store';
import { EmosaveHome, EmosaveMain, EmosaveVillage } from './emosave/village';
import { FarmfamDetail, FarmfamHero, FarmfamHome } from './farmfam/farmfam-art';
import {
  IndianBobAdmin,
  IndianBobApp,
  IndianBobHome,
} from './indian-bob/indian-bob-art';
import { SmartEquipment } from './smart-farm/equipment';
import { SmartHero, SmartHome } from './smart-farm/greenhouse';
import { SmartMonitor } from './smart-farm/monitor';
import { SmartSensor } from './smart-farm/sensor';
import { VISUAL_ID, type VisualId } from '@/constants/visual';

const ART: Record<VisualId, () => React.ReactNode> = {
  [VISUAL_ID.FARMFAM_HOME]: FarmfamHome,
  [VISUAL_ID.FARMFAM_HERO]: FarmfamHero,
  [VISUAL_ID.FARMFAM_DETAIL]: FarmfamDetail,
  [VISUAL_ID.APC_HOME]: ApcHome,
  [VISUAL_ID.APC_HERO]: ApcHero,
  [VISUAL_ID.SMART_HOME]: SmartHome,
  [VISUAL_ID.SMART_SENSOR]: SmartSensor,
  [VISUAL_ID.SMART_EQUIPMENT]: SmartEquipment,
  [VISUAL_ID.SMART_HERO]: SmartHero,
  [VISUAL_ID.SMART_MONITOR]: SmartMonitor,
  [VISUAL_ID.INDIANBOB_HOME]: IndianBobHome,
  [VISUAL_ID.INDIANBOB_APP]: IndianBobApp,
  [VISUAL_ID.INDIANBOB_ADMIN]: IndianBobAdmin,
  [VISUAL_ID.EMOSAVE_HOME]: EmosaveHome,
  [VISUAL_ID.EMOSAVE_MAIN]: EmosaveMain,
  [VISUAL_ID.EMOSAVE_CUSTOM]: EmosaveCustom,
  [VISUAL_ID.EMOSAVE_VILLAGE]: EmosaveVillage,
  [VISUAL_ID.EMOSAVE_STORE]: EmosaveStore,
};

export function ConceptArt({ id }: { id: VisualId }): React.ReactNode {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
