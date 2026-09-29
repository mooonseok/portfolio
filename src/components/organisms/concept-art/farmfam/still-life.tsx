import { tone } from '../art-svg';
import { IsoBox, floor } from '../iso';
import { ProduceTray, RewardBox } from './boxes';
import { ink, kraft, soft } from './palette';
import { InventoryTag, Label, Slip } from './paper';

export function StillLife() {
  return (
    <>
      <g transform={floor(200, 118)}>
        <rect width={250} height={250} fill={tone.paper} />
      </g>
      <g transform={floor(48, 70)}>
        <Slip w={78} h={54} />
      </g>
      <IsoBox
        x={172}
        y={186}
        a={122}
        b={92}
        h={98}
        tones={kraft}
        left={<Label x={18} y={20} w={58} h={40} />}
        right={<line x1={0} x2={92} y1={14} y2={14} {...soft} />}
      />
      <IsoBox
        x={176}
        y={150}
        a={70}
        b={54}
        h={44}
        tones={kraft}
        left={<Label x={10} y={9} w={34} h={22} />}
      />
      <ProduceTray x={318} y={292} a={62} b={48} />
      <ProduceTray x={352} y={214} a={44} b={36} />
      <RewardBox x={98} y={378} s={40} />
      <g transform={floor(252, 398)}>
        <InventoryTag />
      </g>
      <path d='M254 410 C 236 396, 222 380, 214 366' {...ink} />
    </>
  );
}
