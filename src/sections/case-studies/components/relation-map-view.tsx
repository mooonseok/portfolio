import { type CSSProperties, Fragment } from 'react';
import { RelationNodeView } from './relation-node-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { RelationMapViewProps } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

const seg =
  'absolute border-hairline [transition:border-color_150ms_var(--ease)] data-on:border-ink';

const center = (i: number, n: number) => ((i + 0.5) / n) * 100;

export function RelationMapView({
  titleId,
  noteId,
  note,
  hasNote,
  origin,
  targets,
  selected,
  onSelect,
}: RelationMapViewProps) {
  const n = targets.length;
  const pick = targets.findIndex((t) => t.id === selected);
  const all = pick < 0;
  const path = (i: number) => all || i === pick || undefined;
  const upper = (i: number) => all || i <= pick || undefined;
  const lower = (i: number) => all || i < pick || undefined;
  return (
    <Column className='gap-6 tab:gap-8'>
      {hasNote ? (
        <Text as={TAG.SPAN} id={noteId} className='text-small text-graphite'>
          {note}
        </Text>
      ) : null}
      <Grid
        role='group'
        aria-labelledby={titleId}
        aria-describedby={hasNote ? noteId : undefined}
        className='grid-cols-[minmax(0,1fr)] tab:grid-cols-[auto_minmax(56px,120px)_minmax(0,1fr)] tab:grid-rows-[repeat(var(--n),minmax(72px,auto))]'
        style={{ '--n': Math.max(n, 1) } as CSSProperties}
      >
        <RelationNodeView
          node={origin}
          selected={all}
          onSelect={onSelect}
          className='tab:col-[1] tab:row-[1/-1] tab:self-center tab:pr-3'
        >
          {n ? (
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className={`${seg} top-[calc(50%+5px)] bottom-0 left-1 border-l tab:hidden`}
              data-on
            />
          ) : null}
        </RelationNodeView>
        {n ? (
          <Box
            aria-hidden='true'
            className='relative hidden tab:col-[2] tab:row-[1/-1] tab:block'
          >
            <Box
              as={TAG.SPAN}
              className={`${seg} top-1/2 left-0 w-1/2 border-t`}
              data-on
            />
            {targets.map((t, i) => {
              const c = center(i, n);
              return (
                <Fragment key={t.id}>
                  <Box
                    as={TAG.SPAN}
                    className={`${seg} left-1/2 border-l`}
                    style={{
                      top: `${Math.min(c, 50)}%`,
                      height: `${Math.abs(c - 50)}%`,
                    }}
                    data-on={path(i)}
                  />
                  <Box
                    as={TAG.SPAN}
                    className={`${seg} left-1/2 w-1/2 border-t`}
                    style={{ top: `${c}%` }}
                    data-on={path(i)}
                  />
                </Fragment>
              );
            })}
          </Box>
        ) : null}
        {targets.map((t, i) => (
          <RelationNodeView
            key={t.id}
            node={t}
            selected={i === pick}
            onSelect={onSelect}
            className='pl-8 tab:col-[3] tab:row-[var(--row)] tab:self-center tab:pl-0'
            style={{ '--row': i + 1 } as CSSProperties}
          >
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className={`${seg} top-0 left-1 h-1/2 border-l tab:hidden`}
              data-on={upper(i)}
            />
            {i < n - 1 ? (
              <Box
                as={TAG.SPAN}
                aria-hidden='true'
                className={`${seg} top-1/2 bottom-0 left-1 border-l tab:hidden`}
                data-on={lower(i)}
              />
            ) : null}
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className={`${seg} top-1/2 left-1 w-7 border-t tab:hidden`}
              data-on={path(i)}
            />
          </RelationNodeView>
        ))}
      </Grid>
      <Grid className='border-t border-t-hairline pt-6 tab:pt-8'>
        {[origin, ...targets].map((d) => (
          <Column
            key={d.id}
            id={d.descId}
            data-selected={d.id === selected || undefined}
            className='invisible col-start-1 row-start-1 gap-3 opacity-0 data-selected:visible data-selected:opacity-100 data-selected:[transition:opacity_150ms_var(--ease)] mob:not-data-selected:hidden'
          >
            <Text as={TAG.SPAN} className='text-small text-graphite'>
              {d.label}
            </Text>
            <Heading
              level={HEADING.H3}
              className='text-d3 leading-[1.3] font-medium tracking-[-0.01em]'
            >
              {d.title}
            </Heading>
            {d.body.map((b) => (
              <Text key={b} className='max-w-[40em] text-body leading-[1.65]'>
                {b}
              </Text>
            ))}
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
