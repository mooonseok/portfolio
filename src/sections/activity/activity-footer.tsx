import { activity } from '@/content/activity';
import { site } from '@/content/site';
import { ActivityFooterView } from './components/activity-footer-view';

export function ActivityFooter() {
  return (
    <ActivityFooterView
      email={site.contact.email}
      github={site.contact.github}
      newTab={activity.newTab}
    />
  );
}
