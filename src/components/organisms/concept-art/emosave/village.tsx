import { ArtSvg, tone } from '../art-svg';
import { at, c, mid } from './palette';
import { Bench, House, Lane, Pond, TileGrid, Token, Tree } from './parts';

function Village() {
  return (
    <>
      <TileGrid cols={7} rows={8} ox={-80} oy={-70} />
      <Lane row={2} />
      <House {...at(0, 0)} />
      <Tree {...mid(1, 0)} r={26} />
      <House {...at(2, 0)} tint={c.mauve} />
      <Tree {...mid(3, 1)} r={24} />
      <House {...at(4, 0)} tint={c.blue} />
      <Bench {...at(0, 1)} />
      <House {...at(1, 1)} tint={c.sand} />
      <Token {...mid(2, 2)} r={28} />
      <Pond {...at(0, 3)} />
      <House {...at(1, 3)} tint={c.blue} />
      <Tree {...mid(2, 3)} r={22} />
      <House {...at(3, 3)} />
      <Tree {...mid(4, 3)} r={26} />
      <House {...at(0, 4)} tint={c.mauve} />
      <Bench {...at(2, 4)} />
      <Pond {...at(3, 4)} />
      <Tree {...mid(1, 5)} r={26} />
      <House {...at(2, 5)} tint={c.sand} />
      <House {...at(4, 5)} tint={c.peach} />
    </>
  );
}

export function EmosaveHome() {
  return (
    <ArtSvg viewBox='0 0 400 500' bg={tone.placeholder}>
      <Village />
    </ArtSvg>
  );
}

export function EmosaveMain() {
  return (
    <ArtSvg viewBox='0 0 400 500' bg={tone.placeholder}>
      <g transform='matrix(-1 0 0 1 400 -40)'>
        <Village />
      </g>
    </ArtSvg>
  );
}

export function EmosaveVillage() {
  return (
    <ArtSvg viewBox='0 0 400 400' bg={tone.placeholder}>
      <TileGrid cols={6} rows={6} ox={-40} oy={-40} />
      <House x={40} y={40} />
      <House x={200} y={40} tint={c.blue} />
      <Tree x={160} y={80} r={24} />
      <Bench x={40} y={200} />
      <Tree x={320} y={200} r={24} />
      <House x={120} y={280} tint={c.sand} />
      <Pond x={280} y={280} />
      <Token x={200} y={200} r={36} />
    </ArtSvg>
  );
}
