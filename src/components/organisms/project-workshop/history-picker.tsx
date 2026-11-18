'use client';

import { useSyncExternalStore } from 'react';
import { HistoryPickerView, type HistoryEntry } from './history-picker-view';
import { DIORAMA } from '@/constants/diorama';

function subscribe(notify: () => void) {
  window.addEventListener('hashchange', notify);
  return () => window.removeEventListener('hashchange', notify);
}

const readHash = () => window.location.hash;
const serverHash = () => null;

export function HistoryPicker({ entries }: { entries: HistoryEntry[] }) {
  const hash = useSyncExternalStore(subscribe, readHash, serverHash);
  const project =
    entries.find((item) => hash === '#' + DIORAMA.LABEL_ID + '-' + item.slug) ??
    entries[0];
  const select = (slug: HistoryEntry['slug']) => {
    history.replaceState(
      history.state,
      '',
      '#' + DIORAMA.LABEL_ID + '-' + slug
    );
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };
  return (
    <HistoryPickerView
      entries={entries}
      project={project}
      onSelect={hash === null ? undefined : select}
    />
  );
}
