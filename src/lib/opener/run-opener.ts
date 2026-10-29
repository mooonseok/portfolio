import { gsap } from 'gsap';
import type { OpenerElements } from '@/dto/opener.dto';
import { buildReducedOpener } from './stages';
import { buildOpener } from './timeline';

export function runOpener(
  el: OpenerElements,
  reduced: boolean,
  onDone: (hadFocus: boolean) => void
) {
  const root = el.root;
  let closing = false;
  let timeline: gsap.core.Timeline | null = null;
  const close = () => {
    if (closing) return;
    closing = true;
    const hadFocus = document.activeElement === el.skip;
    gsap.to(root, {
      autoAlpha: 0,
      duration: 0.35,
      ease: 'power1.out',
      onComplete: () => onDone(hadFocus),
    });
  };
  const context = gsap.context(() => {
    timeline = reduced ? buildReducedOpener(el) : buildOpener(el);
    timeline.eventCallback('onComplete', close);
  }, root ?? undefined);
  if (root) root.dataset.live = '';
  return {
    skip() {
      if (!closing) timeline?.progress(1);
    },
    revert() {
      context.revert();
    },
  };
}
