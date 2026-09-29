import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { SurfaceTile } from '@/dto/surface.dto';
import { TAG } from '@/constants/tag';

export function TilesView({ list }: { list: SurfaceTile[] }) {
  return (
    <Grid
      as={TAG.UL}
      className='grid-cols-[repeat(min(var(--n),2),minmax(0,1fr))] gap-x-(--gutter) gap-y-4 tab:grid-cols-[repeat(var(--n),minmax(0,1fr))]'
      style={{ ['--n' as string]: list.length } as React.CSSProperties}
    >
      {list.map((t) => (
        <Column
          as={TAG.LI}
          key={t.label}
          className='gap-1.5 border-t border-t-current pt-3 text-[15px]'
        >
          <Text as={TAG.SPAN} className='mono'>
            {t.label}
          </Text>
          {t.sub ? (
            <Text as={TAG.SPAN} className='muted'>
              {t.sub}
            </Text>
          ) : null}
        </Column>
      ))}
    </Grid>
  );
}
