'use client';

import { useState } from 'react';

export function useBoardSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const select = (slug: string, pointer: boolean) => {
    setAnimate(pointer);
    setSelected((current) => (current === slug ? null : slug));
  };
  return { selected, animate, select };
}
