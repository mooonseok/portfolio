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
      className='flex flex-col @min-[1000px]:flex-row @min-[1000px]:[align-items:stretch]'
    >
      {nodes.map((n, i) => (
        <Fragment key={n.label}>
          <ListItem className='flex min-w-0 flex-col gap-0.5 border border-dark-sub px-3.5 py-3 @min-[1000px]:flex-1'>
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
              className='relative flex min-h-10 items-center pl-9 @min-[1000px]:min-h-0 @min-[1000px]:w-[140px] @min-[1000px]:flex-none @min-[1000px]:px-2'
            >
              <Box
                as={TAG.SPAN}
                aria-hidden='true'
                className='absolute inset-y-0 left-5 border-l border-l-paper @min-[1000px]:inset-x-2 @min-[1000px]:top-1/2 @min-[1000px]:bottom-auto @min-[1000px]:left-2 @min-[1000px]:border-t @min-[1000px]:border-l-0 @min-[1000px]:border-t-paper'
              />
              <Text
                as={TAG.SPAN}
                aria-hidden='true'
                className='absolute bottom-0 left-[15px] leading-none text-paper @min-[1000px]:top-1/2 @min-[1000px]:right-1 @min-[1000px]:bottom-auto @min-[1000px]:left-auto @min-[1000px]:-translate-y-1/2'
              >
                <Text as={TAG.SPAN} className='@min-[1000px]:hidden'>
                  ▾
                </Text>
                <Text as={TAG.SPAN} className='hidden @min-[1000px]:inline'>
                  ▸
                </Text>
              </Text>
              {links[i] ? (
                <Text
                  as={TAG.SPAN}
                  className='relative text-small leading-[1.4] text-dark-sub @min-[1000px]:absolute @min-[1000px]:inset-x-2 @min-[1000px]:bottom-[calc(50%+8px)] @min-[1000px]:text-center'
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
