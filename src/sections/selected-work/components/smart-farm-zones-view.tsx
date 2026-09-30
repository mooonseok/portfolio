import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { Zone } from '@/dto/status.dto';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function SmartFarmZonesView({ zones }: { zones: Zone[] }) {
  return (
    <Box className='grid grid-cols-[minmax(0,1fr)] gap-6 tab:grid-cols-2 tab:gap-(--gutter) lap:grid-cols-[minmax(0,1fr)] lap:gap-8'>
      {zones.map((z) => {
        const experiment = z.kind === STATUS_KIND.EXPERIMENT;
        return (
          <Column
            key={z.label}
            className={cx(
              'gap-3.5 pt-3.5',
              experiment
                ? '[border-top:1px_dashed_var(--ink)]'
                : 'border-t border-t-ink'
            )}
          >
            <Column className='gap-1'>
              <StatusLabel
                kind={z.kind}
                label={`${z.label} · ${z.note}`}
                tone={experiment ? TONE.INK : TONE.SIGNAL}
              />
              <Text as={TAG.SPAN} className='text-small text-subtle'>
                {z.caption}
              </Text>
            </Column>
            <List className='flex flex-col'>
              {z.steps.map((s, i) => (
                <ListItem
                  key={s.label}
                  className='relative grid grid-cols-[9px_minmax(0,1fr)] gap-x-3 pb-3 last:pb-0'
                >
                  <Box
                    as={TAG.SPAN}
                    aria-hidden='true'
                    className={cx(
                      'relative z-1 mt-[7px] flex-none border-[1.25px] border-ink bg-paper',
                      experiment
                        ? 'ml-[0.5px] size-[8px] [transform:rotate(45deg)]'
                        : 'size-[9px] rounded-[50%]'
                    )}
                  />
                  {i < z.steps.length - 1 ? (
                    <Box
                      as={TAG.SPAN}
                      aria-hidden='true'
                      className={cx(
                        'absolute left-[4px] border-l-ink',
                        experiment
                          ? 'top-[17px] bottom-[-5px] [border-left:1px_dashed_var(--ink)]'
                          : 'top-4 bottom-[-7px] border-l-[1.25px]'
                      )}
                    />
                  ) : null}
                  <Column className='min-w-0 gap-0.5'>
                    <Text as={TAG.SPAN} className='text-[15px] leading-[1.5]'>
                      {s.label}
                    </Text>
                    {s.sub ? (
                      <Text
                        as={TAG.SPAN}
                        className='text-small leading-[1.5] text-subtle'
                      >
                        {s.sub}
                      </Text>
                    ) : null}
                  </Column>
                </ListItem>
              ))}
            </List>
            {z.footnote ? (
              <Text className='text-small leading-[1.5] text-subtle'>
                {z.footnote}
              </Text>
            ) : null}
          </Column>
        );
      })}
    </Box>
  );
}
