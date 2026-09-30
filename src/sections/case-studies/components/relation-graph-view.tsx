import { type CSSProperties, Fragment } from 'react';
import { RelationNodeView } from './relation-node-view';
import { Box } from '@/components/atoms/box';
import { Grid } from '@/components/atoms/grid';
import type { RelationMapViewProps } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

const seg =
  'absolute border-graphite [transition:border-color_150ms_var(--ease),border-width_150ms_var(--ease)] data-on:border-ink';

const center = (i: number, n: number) => ((i + 0.5) / n) * 100;

export function RelationGraphView({
  titleId,
  noteId,
  panelId,
  origin,
  targets,
  selected,
  onSelect,
  buttonRef,
}: RelationMapViewProps) {
  const n = targets.length;
  const all = selected === origin.id;
  const on = (id: string) => all || id === selected || undefined;
  const any = all || targets.some((t) => t.id === selected) || undefined;
  return (
    <Grid
      role='group'
      aria-labelledby={titleId}
      aria-describedby={noteId}
      className='hidden tab:grid tab:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] tab:grid-rows-[repeat(var(--n),minmax(88px,auto))]'
      style={{ '--n': Math.max(n, 1) } as CSSProperties}
    >
      <Box className='col-[1] row-[1/-1] self-center'>
        <RelationNodeView
          node={origin}
          selected={all}
          lead
          panelId={panelId}
          onSelect={onSelect}
          buttonRef={buttonRef}
        />
      </Box>
      {n ? (
        <Box aria-hidden='true' className='relative col-[2] row-[1/-1]'>
          <Box
            as={TAG.SPAN}
            className={`${seg} top-1/2 left-0 w-5 border-t data-on:border-t-2`}
            data-on={any}
          />
          {targets.map((t, i) => {
            const c = center(i, n);
            return (
              <Fragment key={t.id}>
                <Box
                  as={TAG.SPAN}
                  className={`${seg} left-5 border-l data-on:border-l-2`}
                  style={{
                    top: `${Math.min(c, 50)}%`,
                    height: `${Math.abs(c - 50)}%`,
                  }}
                  data-on={on(t.id)}
                />
                <Box
                  as={TAG.SPAN}
                  className={`${seg} right-0 left-5 border-t data-on:border-t-2`}
                  style={{ top: `${c}%` }}
                  data-on={on(t.id)}
                />
              </Fragment>
            );
          })}
        </Box>
      ) : null}
      {targets.map((t, i) => (
        <Box
          key={t.id}
          className='col-[3] row-[var(--row)] self-center'
          style={{ '--row': i + 1 } as CSSProperties}
        >
          <RelationNodeView
            node={t}
            selected={t.id === selected}
            lead={false}
            panelId={panelId}
            onSelect={onSelect}
            buttonRef={buttonRef}
          />
        </Box>
      ))}
    </Grid>
  );
}
