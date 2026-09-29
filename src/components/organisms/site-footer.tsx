import { SiteFooterView } from './site-footer-view';
import { site } from '@/content/site';
import { hasContact } from '@/lib/content';

export function SiteFooter() {
  const { email, github } = site.contact;
  return (
    <SiteFooterView
      name={site.name}
      email={email}
      github={github}
      contact={hasContact()}
    />
  );
}
