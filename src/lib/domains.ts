import { EXPLORER_MODE, type ExplorerMode } from '@/constants/explorer';
import type { Domain, DomainItem } from '@/dto/domain.dto';

export const toDomainItems = (
  slug: string,
  domains: Domain[],
  mode: ExplorerMode
): DomainItem[] =>
  domains.map((d) => {
    const home = mode === EXPLORER_MODE.HOME;
    const base = `${slug}-${mode}-${d.id}`;
    return {
      ...d,
      tabId: `${base}-tab`,
      panelId: `${base}-panel`,
      noteHref: home
        ? `/work/${slug}#${d.note.target}`
        : `#${d.note.target}`,
      linkLabel: `${home ? '케이스스터디' : '기술 노트'} · ${d.note.label}`,
    };
  });
