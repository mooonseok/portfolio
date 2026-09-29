import Link from 'next/link';
import type { ComponentPropsWithRef } from 'react';

export type NavLinkProps = ComponentPropsWithRef<typeof Link>;

export function NavLink(props: NavLinkProps) {
  return <Link {...props} />;
}
