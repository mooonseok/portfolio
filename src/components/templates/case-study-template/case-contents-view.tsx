import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { CaseContentsViewProps } from '@/dto/case-template.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

const linkClass =
  'inline-flex min-h-11 items-center gap-2 aria-[current]:underline aria-[current]:underline-offset-4';

export function CaseContentsView({
  items,
  currentIndex,
  currentNum,
  currentLabel,
  stuck,
  listRef,
  detailsRef,
  onClose,
}: CaseContentsViewProps) {
  return (
    <>
      <Box
        as={TAG.NAV}
        ref={listRef}
        aria-label='Contents'
        className='container mt-6 grid-page tab:mt-30 tab:border-t tab:border-t-ink tab:pt-0.5'
      >
        <Text
          as={TAG.SPAN}
          className='hidden mono muted tab:col-[1/3] tab:block tab:pt-3'
        >
          CONTENTS
        </Text>
        <List
          as={LIST_TAG.OL}
          className='col-[1/-1] flex flex-wrap gap-x-5 border-t border-b border-t-ink border-b-hairline mono tab:col-[3/-1] tab:gap-x-12 tab:[border:0]'
        >
          {items.map((g, i) => (
            <ListItem key={g.id}>
              <Anchor
                href={`#${g.id}`}
                className={linkClass}
                aria-current={i === currentIndex ? 'location' : undefined}
              >
                <Text as={TAG.SPAN} className='muted'>
                  {g.num}
                </Text>
                {g.label}
              </Anchor>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        as={TAG.DETAILS}
        ref={detailsRef}
        className={cx(
          'fixed top-[env(safe-area-inset-top)] right-[max(var(--margin),env(safe-area-inset-right))] left-[max(var(--margin),env(safe-area-inset-left))] z-20 border border-hairline bg-paper mono',
          'pointer-events-none [transform:translateY(-8px)] opacity-0 [transition:opacity_180ms_var(--ease),transform_180ms_var(--ease)]',
          'data-[visible]:pointer-events-auto data-[visible]:[transform:none] data-[visible]:opacity-100 tab:hidden'
        )}
        data-visible={stuck || undefined}
        aria-hidden={!stuck || undefined}
        inert={!stuck || undefined}
      >
        <Box
          as={TAG.SUMMARY}
          className='flex min-h-11 cursor-pointer list-none items-center justify-between px-3.5 [&::-webkit-details-marker]:hidden'
          tabIndex={stuck ? 0 : -1}
        >
          <Text as={TAG.SPAN}>
            <Text as={TAG.SPAN} className='muted'>
              {currentNum}
            </Text>{' '}
            {currentLabel}
          </Text>
          <Text as={TAG.SPAN} aria-hidden='true'>
            ▾
          </Text>
        </Box>
        <List
          as={LIST_TAG.OL}
          className='flex flex-col border-t border-t-hairline px-3.5 pt-0 pb-2'
        >
          {items.map((g, i) => (
            <ListItem key={g.id}>
              <Anchor
                href={`#${g.id}`}
                onClick={onClose}
                className={linkClass}
                tabIndex={stuck ? 0 : -1}
                aria-current={i === currentIndex ? 'location' : undefined}
              >
                <Text as={TAG.SPAN} className='muted'>
                  {g.num}
                </Text>
                {g.label}
              </Anchor>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
