import { ExperienceView } from './experience-view';
import { experience } from '@/content/site';

export function ExperienceContainer() {
  return (
    <ExperienceView
      years={experience}
      timeline={experience.filter((y) => y.items.length)}
    />
  );
}
