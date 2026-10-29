import { gsap } from 'gsap';
import type { OpenerElements } from '@/dto/opener.dto';
import { around, offscreen, wipeTravel } from './geometry';
import { landEnd, prepare, present } from './stages';

export function buildOpener(el: OpenerElements) {
  prepare(el);
  const tl = gsap.timeline();
  const chunks = present(el.chunks);
  const icons = chunks.map((chunk) => chunk.querySelector('svg'));
  chunks.forEach((chunk) =>
    gsap.set(chunk, {
      y: offscreen(chunk),
      scaleX: 0.9,
      scaleY: 1.2,
      autoAlpha: 0,
    })
  );
  gsap.set(icons, { scale: 0, rotation: -25 });
  chunks.forEach((chunk, i) => {
    const t = i * 0.17;
    tl.set(chunk, { autoAlpha: 1 }, t)
      .to(
        chunk,
        { y: 0, scaleX: 0.84, scaleY: 1.28, duration: 0.16, ease: 'power2.in' },
        t
      )
      .to(
        chunk,
        { scaleX: 1.14, scaleY: 0.82, duration: 0.06, ease: 'power1.out' },
        t + 0.16
      )
      .to(
        chunk,
        {
          scaleX: 1,
          scaleY: 1,
          duration: 0.42,
          ease: 'elastic.out(1.1, 0.42)',
        },
        t + 0.22
      )
      .to(
        icons[i],
        { scale: 1, rotation: 0, duration: 0.34, ease: 'back.out(3)' },
        t + 0.18
      );
  });
  tl.to(
    icons,
    {
      y: -8,
      duration: 0.11,
      ease: 'power2.out',
      stagger: 0.05,
      yoyo: true,
      repeat: 1,
    },
    0.62
  );
  const travel = wipeTravel();
  gsap.set(el.wipe, { xPercent: -travel * 4.6, skewX: -14, autoAlpha: 0 });
  tl.set(el.wipe, { autoAlpha: 1 }, 0.99)
    .to(
      el.wipe,
      { xPercent: travel * 4.6, duration: 0.44, ease: 'power3.inOut' },
      0.99
    )
    .set(el.wipe, { autoAlpha: 0 }, 1.43)
    .to(
      el.line,
      { scaleY: 0.06, y: -30, autoAlpha: 0, duration: 0.14, ease: 'power3.in' },
      1.01
    )
    .set(el.name, { autoAlpha: 1 }, 1.13);
  present(el.syllables).forEach((syllable, i) =>
    tl.fromTo(
      syllable,
      { scale: 2.2, y: -20, rotation: [-9, 7, -5][i], autoAlpha: 0 },
      {
        scale: 1,
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'back.out(2.4)',
      },
      [1.15, 1.25, 1.32][i]
    )
  );
  tl.to(
    el.root,
    {
      keyframes: { x: [9, -7, 5, -3, 0], y: [-5, 4, -2, 1, 0] },
      duration: 0.26,
      ease: 'none',
    },
    1.42
  )
    .fromTo(
      present(el.rings),
      { scale: 0.35, opacity: 0.9 },
      {
        scale: 2.1,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        immediateRender: false,
      },
      1.42
    )
    .fromTo(
      el.kicker,
      { y: 18, scale: 0.6, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.32, ease: 'back.out(3)' },
      1.48
    )
    .fromTo(
      el.dot,
      { scale: 0 },
      { scale: 1, duration: 0.34, ease: 'back.out(4)', immediateRender: false },
      1.58
    );
  const sats = present(el.sats);
  const block = el.block;
  const orbit = { a: 0 };
  const place = () =>
    block && sats.forEach((sat, i) => gsap.set(sat, around(block, i, orbit.a)));
  tl.add(place, 1.5)
    .fromTo(
      sats,
      { scale: 0, rotation: -40 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.36,
        ease: 'back.out(3.2)',
        stagger: 0.07,
      },
      1.5
    )
    .to(
      orbit,
      { a: Math.PI * 0.8, duration: 0.95, ease: 'sine.inOut', onUpdate: place },
      1.5
    )
    .to(el.frame, { scaleX: 1, duration: 0.22, ease: 'power4.out' }, 1.7)
    .to(
      el.tagText,
      { clipPath: 'inset(0 0% 0 0)', duration: 0.26, ease: 'power3.out' },
      1.76
    )
    .to(
      el.tag,
      { scaleY: 0.8, scaleX: 1.1, y: 2, duration: 0.06, ease: 'power1.out' },
      1.98
    )
    .to(
      el.tag,
      {
        scaleY: 1,
        scaleX: 1,
        y: 0,
        duration: 0.38,
        ease: 'elastic.out(1, 0.4)',
      },
      2.04
    )
    .to(el.name, { scale: 0.95, duration: 0.08, ease: 'power2.out' }, 2.45)
    .to(
      el.name,
      { scale: 0, autoAlpha: 0, duration: 0.2, ease: 'power3.in' },
      2.53
    );
  landEnd(el, tl, 2.6);
  return tl;
}
