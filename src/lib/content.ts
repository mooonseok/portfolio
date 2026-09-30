import { GROUP_ID, GROUP_LABEL, type GroupId } from '@/constants/case';
import { CASE_LENGTH, type ProjectSlug } from '@/constants/project';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import type { ContentsGroup, GroupTag } from '@/dto/navigation.dto';
import type { Project } from '@/dto/project.dto';
import { has } from '@/lib/has';

export const getProjects = () => projects;

export const requireProject = (slug: ProjectSlug): Project => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Missing project: ${slug}`);
  return p;
};

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getNext = (slug: ProjectSlug): Project => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const hasContact = () =>
  has(site.contact.email) || has(site.contact.github);

const group = (id: GroupId): ContentsGroup => ({ id, label: GROUP_LABEL[id] });

const present = (list: (ContentsGroup | null)[]) =>
  list.filter((g): g is ContentsGroup => g !== null);

function shortGroups(p: Project): ContentsGroup[] {
  const c = p.case;
  return present([
    group(GROUP_ID.OVERVIEW),
    has(c.interactionFocus ?? []) || has(c.stateFlow ?? [])
      ? group(GROUP_ID.INTERACTION)
      : null,
    has(c.workParagraphs ?? []) || has(c.work) ? group(GROUP_ID.WORK) : null,
    has(c.currentState) ? group(GROUP_ID.CURRENT_STATE) : null,
  ]);
}

export function groupsFor(p: Project): ContentsGroup[] {
  if (p.caseLength === CASE_LENGTH.SHORT) return shortGroups(p);
  const c = p.case;
  const system =
    has(c.systemFlows) ||
    has(p.home.flows) ||
    has(c.domains ?? []) ||
    !!c.monitoringFlow ||
    !!c.feature ||
    !!c.relationMap ||
    has(c.surfaceRelation?.rows ?? []);
  const engineering =
    has(c.techNotes) ||
    !!c.controlExperiment ||
    !!c.experiment ||
    !!c.engineeringNote;
  const current = has(c.currentState) || !!c.currentStateTracks;
  return present([
    group(GROUP_ID.OVERVIEW),
    system ? group(GROUP_ID.SYSTEM) : null,
    has(c.work) ? group(GROUP_ID.WORK) : null,
    engineering ? group(GROUP_ID.ENGINEERING) : null,
    current ? group(GROUP_ID.CURRENT_STATE) : null,
  ]);
}

export const groupIndex = (groups: ContentsGroup[], id: GroupId) => {
  const i = groups.findIndex((g) => g.id === id);
  return i < 0 ? undefined : String(i + 1).padStart(2, '0');
};

export function groupTags(p: Project) {
  const groups = groupsFor(p);
  return (id: GroupId): GroupTag | undefined => {
    const num = groupIndex(groups, id);
    const grp = groups.find((x) => x.id === id);
    return num && grp ? { num, label: grp.label.toUpperCase(), id } : undefined;
  };
}
