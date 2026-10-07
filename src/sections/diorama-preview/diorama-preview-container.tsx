'use client';

import { farmfamPlus } from '@/content/projects/farmfam-plus';
import { emosave } from '@/content/projects/emosave';
import { indianBob } from '@/content/projects/indian-bob';
import { apc } from '@/content/projects/apc';
import { smartFarm } from '@/content/projects/smart-farm';
import { FLOOR_LABEL } from '@/constants/floor';
import { STATUS_KIND } from '@/constants/status';
import { useDioramaStage } from '@/hooks/use-diorama-stage';
import { DioramaPreviewView } from './diorama-preview-view';

const projects = [emosave, indianBob, farmfamPlus, apc, smartFarm].map(
  (project) => ({
    slug: project.slug,
    title: project.title,
    service: project.boardService,
    summary: project.summary,
    period: project.period,
    href: `/work/${project.slug}`,
    experiment: project.status.some(
      (status) => status.kind === STATUS_KIND.EXPERIMENT
    ),
    layers: project.layers.map((layer) => ({
      label: FLOOR_LABEL[layer.floor],
      summary: layer.summary,
      lines: layer.lines,
    })),
  })
);

export function DioramaPreviewContainer() {
  const stage = useDioramaStage();
  return (
    <DioramaPreviewView
      {...stage}
      projects={projects}
      project={
        projects.find((project) => project.slug === stage.selected) ?? null
      }
    />
  );
}
