import { ThisWebsiteView } from './this-website-view';
import { site, thisWebsite } from '@/content/site';

export function ThisWebsiteContainer() {
  return <ThisWebsiteView rows={thisWebsite} note={site.visualsNoteKo} />;
}
