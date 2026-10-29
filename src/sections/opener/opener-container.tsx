import { Opener } from '@/components/organisms/opener/opener';
import { activity } from '@/content/activity';

export function OpenerContainer() {
  return <Opener copy={activity.opener} />;
}
