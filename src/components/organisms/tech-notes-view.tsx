import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { TechNotesViewProps } from '@/dto/tech-notes.dto';
import { TECH_COLS } from '@/constants/case';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function TechNotesView({
  rootRef,
  items,
  cols,
  tone,
  onToggle,
  panelRef,
}: TechNotesViewProps) {
  return (
    <Box
      ref={rootRef}
      className={cx(
        'flex flex-col border-b border-b-(color:--rule) tab:grid tab:gap-x-(--gutter) tab:gap-y-12 tab:[border-bottom:0]',
        tone === TONE.DARK
          ? '[--rule:var(--dark-rule)] [--sub:var(--dark-sub)]'
          : '[--rule:var(--hairline)] [--sub:var(--subtle)]',
        items.length === 1
          ? 'tab:max-w-[760px] tab:grid-cols-1'
          : cols === TECH_COLS.THREE
            ? 'tab:grid-cols-2 lap:grid-cols-3'
            : 'tab:grid-cols-2'
      )}
      data-cols={cols}
      data-tone={tone}
    >
      {items.map((n) => (
        <Box
          key={n.id}
          id={n.id}
          data-tech-note=''
          className='border-t border-t-(color:--rule) tab:flex tab:flex-col tab:gap-3.5 tab:pt-3.5'
        >
          <Heading level={HEADING.H3} className='m-0 [font:inherit]'>
            <Button
              data-tech-toggle=''
              className='tech-toggle box-border flex min-h-13 w-full cursor-pointer items-center justify-between gap-3 text-left text-[17px] leading-[1.5] font-medium focus-visible:[outline:2px_solid_currentColor] focus-visible:outline-offset-2 tab:hidden'
              aria-expanded={n.open}
              aria-controls={n.panelId}
              onClick={() => onToggle(n.id)}
            >
              <Text as={TAG.SPAN}>{n.title}</Text>
              <Text
                as={TAG.SPAN}
                aria-hidden='true'
                className='text-[18px] leading-none print:hidden'
              >
                {n.open ? '−' : '+'}
              </Text>
            </Button>
            <Text
              as={TAG.SPAN}
              data-tech-heading=''
              tabIndex={-1}
              className='hidden tab:block tab:text-[18px] tab:leading-[1.5] tab:font-medium'
            >
              {n.title}
            </Text>
          </Heading>
          <Box
            id={n.panelId}
            ref={panelRef(n.id)}
            className='flex flex-col gap-3.5 overflow-hidden pb-5 tab:overflow-visible tab:pb-0 [&[hidden]]:hidden tab:[&[hidden]]:flex print:[&[hidden]]:flex'
            hidden={!n.open}
          >
            {n.fields.map((f) => (
              <Column key={f.label} className='gap-1'>
                <Text as={TAG.SPAN} className='text-[14.5px] font-medium'>
                  {f.label}
                </Text>
                {f.body.map((b) => (
                  <Text
                    key={b}
                    className='text-[16px] leading-[1.7] text-(color:--sub)'
                  >
                    {b}
                  </Text>
                ))}
              </Column>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
