'use client';

import { ControlConditionsView } from './control-conditions-view';
import type { ControlExperiment } from '@/dto/experiment.dto';
import { useHashSelection } from '@/hooks/use-hash-selection';

export function ControlConditions({ c }: { c: ControlExperiment }) {
  const { selected, select } = useHashSelection(c.conditions.map((x) => x.id));
  const current = c.conditions.find((x) => x.id === selected);
  if (!current) return null;
  return <ControlConditionsView c={c} current={current} onSelect={select} />;
}
