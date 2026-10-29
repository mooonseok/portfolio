import { gsap } from 'gsap';
import type { OpenerElements } from '@/dto/opener.dto';
import { landing, squash, tall } from './geometry';

export const present = <T>(items: (T | null)[]) =>
  items.filter((item): item is T => item !== null);

export function prepare(el: OpenerElements) {
  const orbits = present(el.orbits);
  orbits.forEach((orbit) => {
    orbit.setAttribute('ry', String(Number(orbit.dataset.ry) * squash()));
    const length = orbit.getTotalLength();
    gsap.set(orbit, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set([el.name, el.end], { autoAlpha: 0 });
  gsap.set(el.moon, { scale: 0, svgOrigin: '0 0' });
  gsap.set(present(el.sats), { scale: 0 });
  gsap.set(el.dot, { scale: 0 });
  gsap.set(el.frame, { scaleX: 0 });
  gsap.set(el.tagText, { clipPath: 'inset(0 100% 0 0)' });
  gsap.set(present(el.rings), { scale: 0.35, opacity: 0 });
}

export function landEnd(
  el: OpenerElements,
  tl: gsap.core.Timeline,
  at: number
) {
  const sats = present(el.sats);
  const end = el.end;
  tl.set(end, { autoAlpha: 1 }, at)
    .to(
      el.moon,
      { scale: tall() ? 1.4 : 1, duration: 0.4, ease: 'elastic.out(1, 0.55)' },
      at + 0.06
    )
    .to(
      present(el.orbits),
      { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05 },
      at + 0.1
    );
  if (end)
    tl.to(
      sats,
      {
        x: (i: number) => landing(end, i).x,
        y: (i: number) => landing(end, i).y,
        scale: tall() ? 0.95 : 0.72,
        duration: 0.42,
        ease: 'power3.inOut',
        stagger: 0.04,
      },
      at - 0.07
    );
}

export function buildReducedOpener(el: OpenerElements) {
  prepare(el);
  gsap.set([el.line, ...present(el.sats)], { autoAlpha: 0 });
  gsap.set(el.dot, { scale: 1 });
  gsap.set(el.frame, { scaleX: 1 });
  gsap.set(el.tagText, { clipPath: 'inset(0 0% 0 0)' });
  const tl = gsap.timeline();
  tl.to(el.line, { autoAlpha: 1, duration: 0.15 })
    .to(el.line, { autoAlpha: 0, duration: 0.15 }, '+=0.7')
    .to(el.name, { autoAlpha: 1, duration: 0.15 })
    .to(el.name, { autoAlpha: 0, duration: 0.15 }, '+=0.8');
  return tl;
}
