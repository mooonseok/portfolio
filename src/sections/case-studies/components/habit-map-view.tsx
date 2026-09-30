import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { Feature, FeatureStep } from '@/dto/feature.dto';
import { IB_EDGE, IB_SYSTEM, type IbSystem } from '@/constants/surface';
import { TAG } from '@/constants/tag';

const place: Record<IbSystem, string> = {
  [IB_SYSTEM.ADMIN]: 'col-[1] row-[1]',
  [IB_SYSTEM.API]: 'col-[3] row-[1]',
  [IB_SYSTEM.APP]: 'col-[5] row-[1]',
  [IB_SYSTEM.DATA]: 'col-[3] row-[3]',
};

const wire =
  'self-center border-graphite [transition:border-color_150ms_var(--ease)] data-on:border-ink';

export function HabitMapView({
  feature,
  current,
}: {
  feature: Feature;
  current: FeatureStep;
}) {
  const edge = (id: string) =>
    (current.edges as string[]).includes(id) || undefined;
  return (
    <Grid
      aria-hidden='true'
      className='grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)_16px_minmax(0,1fr)] grid-rows-[auto_24px_auto] tab:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)]'
    >
      {feature.systems.map((s) => (
        <Column
          key={s.id}
          data-on={current.systems.includes(s.id) || undefined}
          className={cx(
            'min-h-15 justify-center gap-0.5 border border-hairline px-2.5 py-2 [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] data-on:border-ink data-on:bg-tint data-on:[box-shadow:inset_0_0_0_0.5px_var(--ink)] tab:px-3.5',
            place[s.id]
          )}
        >
          <Text as={TAG.SPAN} className='mono'>
            {s.id}
          </Text>
          {s.sub ? (
            <Text as={TAG.SPAN} className='text-small text-subtle'>
              {s.sub}
            </Text>
          ) : null}
        </Column>
      ))}
      <Box
        className={cx(wire, 'col-[2] row-[1] border-t data-on:border-t-2')}
        data-on={edge(IB_EDGE.ADMIN_API)}
      />
      <Box
        className={cx(wire, 'col-[4] row-[1] border-t data-on:border-t-2')}
        data-on={edge(IB_EDGE.APP_API)}
      />
      <Box
        className={cx(
          wire,
          'col-[3] row-[2] h-full justify-self-center border-l data-on:border-l-2'
        )}
        data-on={edge(IB_EDGE.API_DATA)}
      />
    </Grid>
  );
}
