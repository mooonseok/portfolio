export interface HistoryClick {
  href: string;
  button: number;
  modified: boolean;
  target: string;
  download: boolean;
}

export interface PendingHash {
  hash: string;
  state: unknown;
  same: boolean;
}

export const isSameDocumentHash = (href: string, current: string) => {
  const from = new URL(current);
  const to = new URL(href, from);
  return (
    to.hash.length > 1 &&
    to.origin === from.origin &&
    to.pathname === from.pathname &&
    to.search === from.search
  );
};

const opensHere = (c: HistoryClick) =>
  c.button === 0 &&
  !c.modified &&
  !c.download &&
  (c.target === '' || c.target === '_self');

export const pendingFrom = (
  click: HistoryClick,
  current: string,
  state: unknown
): PendingHash | null => {
  if (!opensHere(click) || !isSameDocumentHash(click.href, current))
    return null;
  const to = new URL(click.href, current);
  return { hash: to.hash, state, same: to.href === new URL(current).href };
};

export const settleClick = (pending: PendingHash | null, cancelled: boolean) =>
  cancelled ? null : pending;

export const popDecision = (pending: PendingHash | null, hash: string) =>
  pending?.hash === hash
    ? { pause: false, pending: pending.same ? null : pending }
    : { pause: true, pending: null };

export const shouldCopyState = (
  pending: PendingHash | null,
  state: unknown,
  hash: string
) =>
  !!pending &&
  pending.state !== null &&
  state === null &&
  pending.hash === hash;
