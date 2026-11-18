const packetSpeed = 110;
const finalHoldMs = 720;
const fadeMs = 220;

export function workflowTravelMs(length: number) {
  return Math.max(1050, Math.min(3200, (length / packetSpeed) * 1000));
}

export function workflowFrame(
  elapsed: number,
  travel: number,
  first: boolean,
  last: boolean
) {
  const duration = last ? travel + finalHoldMs + fadeMs : travel;
  const fadeIn = first ? Math.min(1, elapsed / fadeMs) : 1;
  const fadeOut = last
    ? Math.min(1, Math.max(0, (duration - elapsed) / fadeMs))
    : 1;
  return {
    progress: Math.min(1, elapsed / travel),
    opacity: Math.min(fadeIn, fadeOut),
    remaining: elapsed >= duration ? elapsed - duration : null,
  };
}
