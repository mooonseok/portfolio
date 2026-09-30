import { SelectedWorkView } from './selected-work-view';
import { requireProject } from '@/lib/content';
import { toDomainItems } from '@/lib/domains';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';
import type {
  ApcWorkBlock,
  FarmFamWorkBlock,
  SmartFarmWorkBlock,
  WorkBlock,
  WorkIndexEntry,
} from '@/dto/selected-work.dto';
import { EXPLORER_MODE } from '@/constants/explorer';
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
  const domains = p.case.domains ?? [];
  return {
    ...toBlock(p),
    domains: {
      label: `${p.title} 현장 업무`,
      items: toDomainItems(p.slug, domains, EXPLORER_MODE.HOME),
      mode: EXPLORER_MODE.HOME,
    },
    domainsLabelId: `${p.slug}-domains-label`,
    hasDomains: has(domains),
  };
};

const toSmartFarm = (p: Project): SmartFarmWorkBlock => {
  const [first, ...rest] = p.title.split(' ');
  const zones = p.home.zones ?? [];
  return {
    ...toBlock(p),
    titleFirst: first,
    titleRest: rest.join(' '),
    hasTitleRest: rest.length > 0,
    zones,
    hasZones: has(zones),
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
