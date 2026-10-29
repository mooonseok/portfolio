const generator = (seed: number) => {
  let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

export const seedOf = (text: string) =>
  [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 2147483647, 7);

export function markerRect(seed: number, jitter = 1.4) {
  const r = generator(seed);
  const p = (v: number) => (v + (r() - 0.5) * jitter * 2).toFixed(2);
  return [
    `M${p(3)} ${p(4)}`,
    `Q${p(50)} ${p(1.5)} ${p(97)} ${p(3)}`,
    `Q${p(98.5)} ${p(50)} ${p(97)} ${p(96)}`,
    `Q${p(50)} ${p(98.5)} ${p(3)} ${p(97)}`,
    `Q${p(1.5)} ${p(50)} ${p(4)} ${p(1)}`,
  ].join(' ');
}

export function markerLine(seed: number, jitter = 6) {
  const r = generator(seed);
  const p = (v: number) => (v + (r() - 0.5) * jitter * 2).toFixed(2);
  return `M${p(50)} 0 Q${p(50)} 50 ${p(50)} 100`;
}

export function markerLoop(seed: number) {
  const r = generator(seed);
  const p = (v: number) => (v + (r() - 0.5) * 5).toFixed(2);
  return [
    `M${p(12)} ${p(30)}`,
    `C${p(30)} ${p(2)} ${p(85)} ${p(4)} ${p(96)} ${p(40)}`,
    `C${p(104)} ${p(80)} ${p(40)} ${p(100)} ${p(10)} ${p(82)}`,
    `C${p(-6)} ${p(70)} ${p(4)} ${p(38)} ${p(30)} ${p(16)}`,
  ].join(' ');
}
