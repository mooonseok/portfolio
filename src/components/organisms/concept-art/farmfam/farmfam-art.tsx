import { ArtSvg, tone } from '../art-svg';
import { IsoBox, floor } from '../iso';
import { ink, kraft, soft } from './palette';
import { InventoryTag, Label } from './paper';
import { StillLife } from './still-life';

export function FarmfamHome() {
  return (
    <ArtSvg viewBox='0 0 400 500' bg={tone.placeholder}>
      <StillLife />
    </ArtSvg>
  );
}

export function FarmfamHero() {
  return (
    <ArtSvg viewBox='0 0 600 400' bg={tone.placeholder}>
      <g transform='translate(120 -30) scale(0.86)'>
        <StillLife />
      </g>
      <IsoBox
        x={540}
        y={150}
        a={70}
        b={70}
        h={70}
        tones={kraft}
        left={<Label x={12} y={14} w={38} h={26} />}
      />
      <IsoBox x={40} y={250} a={56} b={46} h={40} tones={kraft} />
      <g transform={floor(470, 300)}>
        <InventoryTag w={40} h={19} />
      </g>
    </ArtSvg>
  );
}

export function FarmfamDetail() {
  return (
    <ArtSvg viewBox='0 0 400 500' bg={tone.placeholder}>
      <IsoBox
        x={250}
        y={-60}
        a={330}
        b={200}
        h={560}
        tones={kraft}
        left={<Label x={46} y={150} w={200} h={128} />}
        right={<line x1={0} x2={200} y1={40} y2={40} {...soft} />}
      />
      <g transform='translate(64 392) rotate(-10)'>
        <InventoryTag w={128} h={60} />
      </g>
      <path d='M97 417 C 70 380, 60 330, 74 262' {...ink} />
    </ArtSvg>
  );
}
