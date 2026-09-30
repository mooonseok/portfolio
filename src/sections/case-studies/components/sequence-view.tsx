import { Fragment } from 'react';
import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { FlowNode } from '@/dto/flow.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function SequenceView({
  nodes,
  links,
  label,
}: {
  nodes: FlowNode[];
  links: string[];
  label: string;
}) {
  return (
    <List
      as={LIST_TAG.OL}
      aria-label={label}
      className='flex flex-col lap:flex-row lap:[align-items:stretch]'
    >
      {nodes.map((n, i) => (
        <Fragment key={n.label}>
          <ListItem className='flex flex-col gap-0.5 border border-dark-sub px-3.5 py-3 lap:w-[168px] lap:flex-none'>
            <Text as={TAG.SPAN} className='mono'>
              {n.label}
            </Text>
            {n.sub ? (
              <Text as={TAG.SPAN} className='text-small text-dark-sub'>
                {n.sub}
              </Text>
            ) : null}
          </ListItem>
          {i < nodes.length - 1 ? (
            <ListItem
              aria-hidden={links[i] ? undefined : 'true'}
              className='relative flex min-h-10 items-center pl-9 lap:min-h-0 lap:min-w-0 lap:flex-1 lap:px-2'
            >
              <Box
                as={TAG.SPAN}
                aria-hidden='true'
                className='absolute inset-y-0 left-5 border-l border-l-paper lap:inset-x-2 lap:top-1/2 lap:bottom-auto lap:left-2 lap:border-t lap:border-l-0 lap:border-t-paper'
              />
              <Text
                as={TAG.SPAN}
                aria-hidden='true'
                className='absolute bottom-0 left-[15px] leading-none text-paper lap:top-1/2 lap:right-1 lap:bottom-auto lap:left-auto lap:-translate-y-1/2'
              >
                <Text as={TAG.SPAN} className='lap:hidden'>
                  ▾
                </Text>
                <Text as={TAG.SPAN} className='hidden lap:inline'>
                  ▸
                </Text>
              </Text>
              {links[i] ? (
                <Text
                  as={TAG.SPAN}
                  className='relative text-small leading-[1.4] text-dark-sub lap:absolute lap:inset-x-2 lap:bottom-[calc(50%+8px)] lap:text-center'
                >
                  {links[i]}
                </Text>
              ) : null}
            </ListItem>
          ) : null}
        </Fragment>
      ))}
    </List>
  );
}
