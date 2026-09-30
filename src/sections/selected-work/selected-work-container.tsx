import { SelectedWorkView } from './selected-work-view';
import { requireProject } from '@/lib/content';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';
import type {
  ApcWorkBlock,
  FarmFamWorkBlock,
  SmartFarmWorkBlock,
  WorkBlock,
  WorkIndexEntry,
} from '@/dto/selected-work.dto';
import { SELECTED_SLUGS } from '@/constants/selected-work';

const toBlock = (p: Project): WorkBlock => {
  const surfaces = p.surfaces.toUpperCase();
  return {
    project: p,
    href: `/work/${p.slug}`,
    caseLabel: `${p.title} case study`,
    flowLabel: `${p.title} flow`,
    surfaces,
    meta: [p.period, surfaces],
  };
};

const toEntry = (p: Project): WorkIndexEntry => ({
  slug: p.slug,
  href: `#${p.slug}`,
  num: p.num,
  title: p.title,
});

const toFarmFam = (p: Project): FarmFamWorkBlock => {
  const areas = p.home.areas ?? [];
  const base = `${p.slug}-area`;
  return {
    ...toBlock(p),
    areas: {
      labelId: `${base}s-label`,
      items: areas.map((a, i) => ({
        ...a,
        num: String(i + 1).padStart(2, '0'),
        hasRelated: has(a.related),
        href: `/work/${p.slug}#${a.to.target}`,
        tabId: `${base}-${a.id}-tab`,
        panelId: `${base}-${a.id}-panel`,
        toggleId: `${base}-${a.id}-toggle`,
        regionId: `${base}-${a.id}-region`,
      })),
    },
    hasAreas: has(areas),
  };
};

const toApc = (p: Project): ApcWorkBlock => {
  const [material, ...secondary] = p.home.flows;
  return { ...toBlock(p), material, secondary };
};

const toSmartFarm = (p: Project): SmartFarmWorkBlock => {
  const [first, ...rest] = p.title.split(' ');
  return {
    ...toBlock(p),
    titleFirst: first,
    titleRest: rest.join(' '),
    hasTitleRest: rest.length > 0,
  };
};

export function SelectedWorkContainer() {
  const [farmfam, apc, smartFarm] = SELECTED_SLUGS.map(requireProject);
  return (
    <SelectedWorkView
      index={[farmfam, apc, smartFarm].map(toEntry)}
      farmfam={toFarmFam(farmfam)}
      apc={toApc(apc)}
      smartFarm={toSmartFarm(smartFarm)}
    />
  );
}
