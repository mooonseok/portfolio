import { ArtSvg, tone } from '../art-svg';
import { CrateStack } from './crate';
import { Desk, Tablet } from './fixtures';
import { Floor } from './floor';

function Scene() {
  return (
    <>
      <Floor />
      <CrateStack x={-30} base={330} w={62} levels={4} cols={2} qr={[1, 3]} />
      <CrateStack x={70} base={236} w={44} levels={2} cols={2} qr={[0]} />
      <CrateStack x={206} base={206} w={34} levels={4} cols={2} qr={[2]} />
      <Tablet x={300} y={96} />
      <Desk x={372} y={226} />
      <CrateStack x={440} base={292} w={50} levels={3} cols={2} qr={[0, 2]} />
      <CrateStack x={568} base={250} w={40} levels={5} cols={2} qr={[1]} />
    </>
  );
}

export function ApcHome() {
  return (
    <ArtSvg viewBox='0 0 640 360' bg={tone.dark}>
      <Scene />
    </ArtSvg>
  );
}

export function ApcHero() {
  return (
    <ArtSvg viewBox='0 0 640 360' bg={tone.dark}>
      <g transform='matrix(-1 0 0 1 640 0)'>
        <Scene />
      </g>
    </ArtSvg>
  );
}
