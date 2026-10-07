import type { DioramaOpeningPolicy } from '@/dto/diorama-opening-policy.dto';

export function canPlayOpening(policy: DioramaOpeningPolicy) {
  return (
    policy.seen === null &&
    policy.navigationType === 'navigate' &&
    policy.hash === '' &&
    policy.scrollY === 0 &&
    !policy.reduced
  );
}
