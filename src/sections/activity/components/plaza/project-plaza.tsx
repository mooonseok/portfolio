'use client';

import { useEffect, useRef, useState } from 'react';
import type { ActivityCopy } from '@/dto/activity-copy.dto';
import type { OrbitProjectView } from '@/dto/orbit.dto';
import { PlazaView } from './plaza-view';

export type PlazaCopy = Pick<
  ActivityCopy,
  'heading' | 'close' | 'lastCommit' | 'empty' | 'history'
>;

export function ProjectPlaza({
  projects,
  copy,
}: {
  projects: OrbitProjectView[];
  copy: PlazaCopy;
}) {
  const [key, setKey] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const current = projects.find((project) => project.key === key);

  function dismiss() {
    setKey(null);
    trigger.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (!current) return;
    closeButton.current?.focus({ preventScroll: true });
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current]);

  return (
    <PlazaView
      projects={projects}
      copy={copy}
      current={current}
      closeRef={closeButton}
      select={(project, button) => {
        if (project.key === key) {
          dismiss();
          return;
        }
        trigger.current = button;
        setKey(project.key);
      }}
      dismiss={dismiss}
    />
  );
}
