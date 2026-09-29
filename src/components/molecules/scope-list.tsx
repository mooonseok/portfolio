import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { BREAKPOINT, type LabelFrom } from '@/constants/breakpoint';
import { TAG } from '@/constants/tag';
import { cx } from '@/lib/cx';
import { has } from '@/lib/has';

export function ScopeList({
  list,
  mobile,
  labelFrom = BREAKPOINT.ALL,
  className,
}: {
  list: string[];
  mobile?: string[];
  labelFrom?: LabelFrom;
  className?: string;
}) {
  if (!has(list)) return null;
  return (
    <Box className={cx('scope-list', className)} data-label-from={labelFrom}>
      <Text as={TAG.SPAN} className='scope-label mono muted'>
        SCOPE
      </Text>
      <List
        className='flex flex-wrap gap-x-4 gap-y-1 text-[15px] leading-[1.5] lap:flex-col lap:gap-x-1 lap:gap-y-1 mob:data-has-mobile:hidden'
        data-has-mobile={mobile ? '' : undefined}
      >
        {list.map((k) => (
          <ListItem key={k} className='nowrap'>
            {k}
          </ListItem>
        ))}
      </List>
      {mobile ? (
        <List className='hidden flex-wrap gap-x-4 gap-y-1 text-[15px] leading-[1.5] mob:flex'>
          {mobile.map((k) => (
            <ListItem key={k} className='nowrap'>
              {k}
            </ListItem>
          ))}
        </List>
      ) : null}
    </Box>
  );
}
