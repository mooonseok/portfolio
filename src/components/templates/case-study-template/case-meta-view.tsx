import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { CaseMetaRow } from '@/dto/case-template.dto';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';

export function CaseMetaView({
  meta,
  darkHeader,
}: {
  meta: CaseMetaRow[];
  darkHeader?: boolean;
}) {
  return (
    <Grid
      as={TAG.DL}
      className='col-[1/-1] mx-0 mt-2 mb-0 grid-cols-2 gap-x-4 tab:col-[3/-1] tab:mt-0 lap:col-[10/13] lap:grid-cols-[1fr] lap:[align-content:start]'
      data-reveal-item='meta'
    >
      {meta.map((r) => (
        <Column
          key={r.key}
          className={cx(
            'gap-1 border-t py-3 text-[15px] leading-[1.5] lap:gap-1.5',
            darkHeader ? 'border-t-dark-line' : 'border-t-hairline',
            r.wide && 'order-1 col-[1/-1] lap:order-0',
            r.span && 'col-[1/-1]'
          )}
          data-wide={r.wide || undefined}
          data-span={r.span || undefined}
          data-dark={darkHeader || undefined}
        >
          <Text as={TAG.DT} className='mono muted'>
            {r.key}
          </Text>
          <Box as={TAG.DD} className='m-0'>
            {r.status ? (
              <>
                <Text as={TAG.SPAN} aria-hidden='true'>
                  {r.status === STATUS_KIND.PRODUCT ? '● ' : '◇ '}
                </Text>
                {r.value}
              </>
            ) : (
              r.value
            )}
          </Box>
        </Column>
      ))}
    </Grid>
  );
}
