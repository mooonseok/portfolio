import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import { LIST_TAG, TAG } from '@/constants/tag';
import type { SurfaceRow } from '@/dto/surface.dto';
import { cx } from '@/lib/cx';

const nodeCls =
  'relative z-1 row-[1] size-[9px] rounded-[50%] border-[1.25px] border-ink bg-paper';
const labelCls =
  'row-[1] flex min-h-(--rh) items-center leading-[1.2] whitespace-nowrap';
const subCls =
  'row-[2] mt-0.5 font-sans text-[13px] leading-[1.4] tracking-[0] whitespace-nowrap text-subtle tab:row-[1] tab:mt-0 lap:hidden';

const Label = ({ label, wide }: { label: string; wide?: string }) =>
  wide ? (
    <>
      <Text as={TAG.SPAN} className='lap:hidden'>
        {label}
      </Text>
      <Text as={TAG.SPAN} className='hidden lap:inline'>
        {wide}
      </Text>
    </>
  ) : (
    label
  );

export function SurfaceRelation({
  rows,
  showSubs = true,
  label,
  className,
}: {
  rows: SurfaceRow[];
  showSubs?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <Column
      as={LIST_TAG.OL}
      className={cx(
        'border-t border-t-ink px-0 pt-5 pb-1 font-mono text-[15px] tracking-[0.06em] [--bl:32px] [--lw:64px] [--rh:20px] [--seg:22px] tab:pb-0 tab:[--bl:64px] tab:[--lw:80px] tab:[--seg:24px] lap:p-0 lap:text-(length:--fs-meta) lap:[--lw:40px] lap:[--rh:16px] lap:[--seg:28px] lap:[border-top:0]',
        className
      )}
      aria-label={label}
    >
      {rows.map((r) => (
        <Grid
          as={TAG.LI}
          key={r.label}
          className='surface-row relative auto-rows-auto grid-cols-[9px_var(--lw)_var(--bl)_9px_auto] items-center [justify-content:start] gap-x-3.5 pb-(--seg) last:pb-0 tab:grid-cols-[9px_var(--lw)_72px_var(--bl)_9px_auto_auto] lap:grid-cols-[9px_var(--lw)_minmax(0,var(--bl))_9px_auto]'
        >
          <Box
            as={TAG.SPAN}
            className={`${nodeCls} col-[1]`}
            aria-hidden='true'
          />
          <Text as={TAG.SPAN} className={`${labelCls} col-[2]`}>
            <Label label={r.label} wide={r.wide} />
          </Text>
          {showSubs && r.sub ? (
            <Text as={TAG.SPAN} className={`${subCls} col-[2] tab:col-[3]`}>
              {r.sub}
            </Text>
          ) : null}
          {r.branch ? (
            <Box as={TAG.SPAN} className='contents'>
              <Box
                as={TAG.SPAN}
                className='col-[3] row-[1] border-t-[1.25px] border-t-ink tab:col-[4] lap:col-[3]'
                aria-hidden='true'
              />
              <Box
                as={TAG.SPAN}
                className={`${nodeCls} col-[4] tab:col-[5] lap:col-[4]`}
                aria-hidden='true'
              />
              <Text
                as={TAG.SPAN}
                className={`${labelCls} col-[5] tab:col-[6] lap:col-[5]`}
              >
                {r.branch.label}
              </Text>
              {showSubs && r.branch.sub ? (
                <Text
                  as={TAG.SPAN}
                  className={`${subCls} col-[4/6] tab:col-[7]`}
                >
                  {r.branch.sub}
                </Text>
              ) : null}
            </Box>
          ) : null}
        </Grid>
      ))}
    </Column>
  );
}
