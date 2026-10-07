import { EMO_STATE, type EmoState } from '@/constants/emo-state';
import { EmosaveHouseView } from './emosave-house-view';
import styles from './emosave-placement.module.css';

export function EmosavePlacementView({ state }: { state: EmoState }) {
  const editing = state === EMO_STATE.SELECTED;
  const changed = state !== EMO_STATE.DEFAULT;

  return (
    <svg
      viewBox='0 0 280 190'
      className={styles.scene}
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M16 120 143 56 264 116 137 180Z'
        fill='var(--paper)'
        stroke='var(--hairline)'
      />
      <path
        d='M36 120 51 112M137 164 152 157M229 115 244 122'
        fill='none'
        stroke='var(--hairline)'
        strokeWidth='2'
        strokeLinecap='round'
      />
      {editing ? (
        <>
          <g transform='translate(83 127)'>
            <EmosaveHouseView ghost />
          </g>
          <g
            fill='none'
            stroke='var(--subtle)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M110 141Q144 154 169 138' strokeDasharray='3 4' />
            <path d='m163 137 7 0-2 7' />
          </g>
        </>
      ) : null}
      <g transform={changed ? 'translate(192 118)' : 'translate(83 127)'}>
        <ellipse
          cx='0'
          cy='9'
          rx='37'
          ry='17'
          fill='var(--ink)'
          fillOpacity='0.06'
        />
        {editing ? (
          <rect
            x='-42'
            y='-79'
            width='84'
            height='109'
            fill='none'
            stroke='var(--marker-red)'
            strokeWidth='1.5'
          />
        ) : null}
        <g transform={changed ? 'scale(-1 1)' : undefined}>
          <EmosaveHouseView />
        </g>
        {editing ? (
          <g
            fill='none'
            stroke='var(--marker-red)'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M-28-88C-22-103 2-106 17-96' />
            <path d='m17-103 1 8-8 0' />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
