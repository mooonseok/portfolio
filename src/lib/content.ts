import { GROUP_ID, GROUP_LABEL, type GroupId } from '@/constants/case';
import {
  CASE_LENGTH,
  PROJECT_SLUG,
  type ProjectSlug,
} from '@/constants/project';
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

const group = (id: GroupId, p: Project): ContentsGroup => {
  if (
    id === GROUP_ID.CURRENT_STATE &&
    (p.slug === PROJECT_SLUG.EMOSAVE || p.slug === PROJECT_SLUG.INDIAN_BOB)
  ) {
    return { id, label: '배운 점' };
  }
  if (id === GROUP_ID.ENGINEERING && p.slug === PROJECT_SLUG.FARMFAM_PLUS) {
    return { id, label: '협업과 검증' };
  }
  return { id, label: GROUP_LABEL[id] };
};

const present = (list: (ContentsGroup | null)[]) =>
  list.filter((g): g is ContentsGroup => g !== null);

function shortGroups(p: Project): ContentsGroup[] {
  const c = p.case;
  return present([
    group(GROUP_ID.OVERVIEW, p),
    has(c.interactionFocus ?? []) ? group(GROUP_ID.INTERACTION, p) : null,
    has(c.workParagraphs ?? []) ? group(GROUP_ID.WORK, p) : null,
    has(c.currentState) ? group(GROUP_ID.CURRENT_STATE, p) : null,
  ]);
}

export function groupsFor(p: Project): ContentsGroup[] {
  if (p.caseLength === CASE_LENGTH.SHORT) return shortGroups(p);
  const c = p.case;
  const system =
    p.slug === PROJECT_SLUG.INDIAN_BOB
      ? !!c.feature
      : p.slug === PROJECT_SLUG.FARMFAM_PLUS
        ? !!c.relationMap
        : p.slug === PROJECT_SLUG.APC
          ? has(c.domains ?? [])
          : !!c.monitoringFlow;
  const engineering =
    p.slug === PROJECT_SLUG.INDIAN_BOB
      ? !!c.engineeringNote
      : p.slug === PROJECT_SLUG.SMART_FARM
        ? !!c.controlExperiment
        : p.slug === PROJECT_SLUG.APC
          ? has(c.techNotes) || !!c.experiment
          : has(c.techNotes);
  const current =
    p.slug === PROJECT_SLUG.SMART_FARM
      ? has(c.currentStateTracks?.monitoring ?? []) ||
        has(c.currentStateTracks?.control ?? [])
      : has(c.currentState);
  return present([
    group(GROUP_ID.OVERVIEW, p),
    system ? group(GROUP_ID.SYSTEM, p) : null,
    has(c.work) ? group(GROUP_ID.WORK, p) : null,
    engineering ? group(GROUP_ID.ENGINEERING, p) : null,
    current ? group(GROUP_ID.CURRENT_STATE, p) : null,
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
