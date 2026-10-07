import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Heading } from '@/components/atoms/heading';
import { Anchor } from '@/components/atoms/anchor';
import { Button } from '@/components/atoms/button';
import { List, ListItem } from '@/components/atoms/list';
import { DIORAMA } from '@/constants/diorama';
import { HEADING, TAG } from '@/constants/tag';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';

export function DioramaDetailsView(props: DioramaPreviewProps) {
  return (
    <Box
      as={TAG.SECTION}
      id={DIORAMA.PANEL_ID}
      aria-label='FarmFam+ 담당 영역'
      className={`rounded-[16px] p-6 tab:p-8 ${props.selected ? 'bg-[var(--note-paper)] text-[var(--note-ink)]' : 'border border-hairline'}`}
    >
      <Box className='flex items-center justify-between gap-4'>
        <Heading level={HEADING.H2} className='text-2xl font-semibold'>
          {props.selected ? '직접 개발·유지보수' : 'FarmFam+에서 한 일'}
        </Heading>
        {props.selected && (
          <Button
            onClick={props.onClose}
            className='min-h-11 shrink-0 px-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            닫기
          </Button>
        )}
      </Box>
      {props.selected ? (
        <List className='mt-6 list-none space-y-6 p-0'>
          {props.layers.map((layer) => (
            <ListItem key={layer.label}>
              <Heading level={HEADING.H3} className='text-base font-semibold'>
                {layer.label}
              </Heading>
              <List className='mt-2 list-disc space-y-2 pl-5'>
                {layer.lines.map((line) => (
                  <ListItem key={line} className='text-base leading-[1.7]'>
                    {line}
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box className='mt-6 space-y-5'>
          {props.features.map((feature) => (
            <Box key={feature.title}>
              <Heading level={HEADING.H3} className='text-base font-semibold'>
                {feature.title}
              </Heading>
              {feature.body.map((line) => (
                <Text
                  key={line}
                  className='mt-2 text-base leading-[1.7] text-subtle'
                >
                  {line}
                </Text>
              ))}
            </Box>
          ))}
        </Box>
      )}
      <Anchor
        href={props.href}
        className='mt-7 inline-flex min-h-11 items-center text-base font-semibold underline underline-offset-4'
      >
        구현 사례 자세히 보기
      </Anchor>
    </Box>
  );
}
