import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import {
  EMO_STATE,
  type EmoState,
  SKETCH_DROP,
  SKETCH_PICK,
  SKETCH_SLOTS,
  SKETCH_TRAY,
  SLOT_SHAPE,
  type SlotShape,
} from '@/constants/emo-state';
import { TAG } from '@/constants/tag';

const shapeCls: Record<SlotShape, string> = {
  [SLOT_SHAPE.ROUND]: 'aspect-square w-[46%] rounded-[50%]',
  [SLOT_SHAPE.SQUARE]: 'aspect-square w-[46%] rounded-[22%]',
  [SLOT_SHAPE.PILL]: 'aspect-[2/1] w-[66%] rounded-full',
};

const trayCls: Record<SlotShape, string> = {
  [SLOT_SHAPE.ROUND]: 'aspect-square rounded-[50%]',
  [SLOT_SHAPE.SQUARE]: 'aspect-square rounded-[22%]',
  [SLOT_SHAPE.PILL]: 'aspect-[2/1] rounded-full',
};

function Shape({ shape, ink }: { shape: SlotShape; ink: boolean }) {
  return (
    <Box
      as={TAG.SPAN}
      className={cx(shapeCls[shape], ink ? 'bg-ink' : 'bg-graphite')}
    />
  );
}

export function StateSketch({
  state,
  compact = false,
  slotLabel,
  trayLabel,
}: {
  state: EmoState;
  compact?: boolean;
  slotLabel?: string;
  trayLabel?: string;
}) {
  const selecting = state === EMO_STATE.SELECTED;
  const placed = state === EMO_STATE.PLACED;
  const pick = SKETCH_TRAY[SKETCH_PICK];
  return (
    <Column aria-hidden='true' className={compact ? 'gap-0' : 'gap-3'}>
      {slotLabel ? (
        <Text as={TAG.SPAN} className='mono text-subtle'>
          {slotLabel}
        </Text>
      ) : null}
      <Grid
        className={cx(
          'grid-cols-3 border border-hairline bg-paper',
          compact ? 'gap-1.5 p-1.5' : 'gap-2.5 p-3 tab:gap-3 tab:p-4'
        )}
      >
        {SKETCH_SLOTS.map((shape, i) => {
          const drop = placed && i === SKETCH_DROP;
          const target = selecting && !shape;
          return (
            <Row
              key={i}
              className={cx(
                'relative aspect-square items-center justify-center border',
                drop
                  ? 'border-[1.5px] border-ink'
                  : target
                    ? 'border-dashed border-ink'
                    : 'border-hairline',
                shape || drop ? 'bg-placeholder' : 'bg-transparent'
              )}
            >
              {shape ? <Shape shape={shape} ink={false} /> : null}
              {drop ? <Shape shape={pick} ink /> : null}
              {target && !compact ? (
                <Text as={TAG.SPAN} className='absolute mono'>
                  +
                </Text>
              ) : null}
            </Row>
          );
        })}
      </Grid>
      {compact ? null : (
        <>
          {trayLabel ? (
            <Text as={TAG.SPAN} className='mono text-subtle'>
              {trayLabel}
            </Text>
          ) : null}
          <Grid className='grid-cols-3 gap-2.5 tab:gap-3'>
            {SKETCH_TRAY.map((shape, i) => {
              const picked = i === SKETCH_PICK;
              const gone = picked && placed;
              return (
                <Row
                  key={shape}
                  className={cx(
                    'h-14 items-center justify-center border tab:h-16',
                    gone
                      ? 'border-dashed border-graphite'
                      : 'border-hairline bg-placeholder',
                    picked &&
                      selecting &&
                      '[outline:2px_solid_var(--ink)] outline-offset-2'
                  )}
                >
                  {gone ? null : (
                    <Box
                      as={TAG.SPAN}
                      className={cx(
                        'h-[46%]',
                        trayCls[shape],
                        picked && state !== EMO_STATE.DEFAULT
                          ? 'bg-ink'
                          : 'bg-graphite'
                      )}
                    />
                  )}
                </Row>
              );
            })}
          </Grid>
        </>
      )}
    </Column>
  );
}
