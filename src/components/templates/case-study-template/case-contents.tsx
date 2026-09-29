'use client';

import { CaseContentsView } from './case-contents-view';
import { useCaseContents } from '@/hooks/use-case-contents';
import type { ContentsGroup } from '@/dto/navigation.dto';

const num = (i: number) => String(i + 1).padStart(2, '0');

export function CaseContents({ groups }: { groups: ContentsGroup[] }) {
  const { current, stuck, listRef, detailsRef, close } =
    useCaseContents(groups);
  const items = groups.map((g, i) => ({
    id: g.id,
    label: g.label,
    num: num(i),
  }));
  return (
    <CaseContentsView
      items={items}
      currentIndex={current}
      currentNum={num(current)}
      currentLabel={groups[current]?.label.toUpperCase()}
      stuck={stuck}
      listRef={listRef}
      detailsRef={detailsRef}
      onClose={close}
    />
  );
}
