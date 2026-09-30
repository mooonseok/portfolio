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

export const shouldCopyState = (
  saved: { hash: string; state: unknown } | null,
  state: unknown,
  hash: string
) => !!saved && saved.state !== null && state === null && saved.hash === hash;
