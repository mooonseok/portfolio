'use client';

import { farmfamPlus } from '@/content/projects/farmfam-plus';
import { FLOOR_LABEL } from '@/constants/floor';
import { useDioramaStage } from '@/hooks/use-diorama-stage';
import { DioramaPreviewView } from './diorama-preview-view';

export function DioramaPreviewContainer() {
  const stage = useDioramaStage();
  return (
    <DioramaPreviewView
      {...stage}
      title={farmfamPlus.title}
      summary={farmfamPlus.summary}
      period={farmfamPlus.period}
      href={`/work/${farmfamPlus.slug}`}
      layers={farmfamPlus.layers.map((layer) => ({
        label: FLOOR_LABEL[layer.floor],
        summary: layer.summary,
        lines: layer.lines,
      }))}
      features={farmfamPlus.home.features}
    />
  );
}
