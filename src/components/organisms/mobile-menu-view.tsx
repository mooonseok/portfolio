import { MobileMenuContactView } from './mobile-menu-contact-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { NavLink } from '@/components/atoms/nav-link';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { MobileMenuViewProps } from '@/dto/chrome.dto';
import { ARIA_CURRENT } from '@/constants/aria';
import { TAG } from '@/constants/tag';

export function MobileMenuView({
  open,
  panelId,
  openMenu,
  close,
  btnRef,
  closeRef,
  panelRef,
  entries,
  contact,
  hasContact,
}: MobileMenuViewProps) {
  return (
    <>
      <Button
        ref={btnRef}
        className='menu-toggle box-border inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end gap-2.5 font-mono text-[length:var(--fs-meta)] tracking-[0.06em] focus-visible:[outline:2px_solid_currentColor] focus-visible:outline-offset-4 tab:hidden'
        aria-expanded={open}
        aria-controls={panelId}
        onClick={openMenu}
      >
        MENU
        <Column as={TAG.SPAN} className='gap-1' aria-hidden='true'>
          <Text
            as={TAG.SPAN}
            className='w-4 border-t-[1.25px] border-t-current'
          />
          <Text
            as={TAG.SPAN}
            className='w-4 border-t-[1.25px] border-t-current'
          />
        </Column>
      </Button>
      <Box
        ref={panelRef}
        id={panelId}
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        className='menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper pt-[calc(12px_+_env(safe-area-inset-top))] pr-[max(20px,env(safe-area-inset-right))] pb-[calc(24px_+_env(safe-area-inset-bottom))] pl-[max(20px,env(safe-area-inset-left))] text-ink short-land:grid short-land:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] short-land:grid-rows-[auto_1fr] short-land:gap-x-8 short-land:pr-[max(24px,env(safe-area-inset-right))] short-land:pb-4 short-land:pl-[max(24px,env(safe-area-inset-left))] [&[hidden]]:hidden'
        data-open={open || undefined}
        hidden={!open}
      >
        <Row className='items-center justify-between short-land:col-span-full'>
          <Text as={TAG.SPAN} className='mono'>
            PARK MOONSEOK
          </Text>
          <Button
            ref={closeRef}
            className='menu-toggle box-border inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end gap-2.5 font-mono text-[length:var(--fs-meta)] tracking-[0.06em] focus-visible:[outline:2px_solid_currentColor] focus-visible:outline-offset-4'
            aria-expanded={open}
            aria-controls={panelId}
            onClick={close}
          >
            CLOSE{' '}
            <Text as={TAG.SPAN} aria-hidden='true'>
              ✕
            </Text>
          </Button>
        </Row>
        <Box className='mt-auto flex flex-col gap-10 pt-10 short-land:col-span-full short-land:grid short-land:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] short-land:[align-items:end] short-land:gap-x-8 short-land:pt-4'>
          <Box
            as={TAG.NAV}
            aria-label='Menu'
            className='flex flex-col short-land:col-[2] short-land:grid short-land:grid-cols-2 short-land:gap-x-6'
          >
            {entries.map((e) => (
              <NavLink
                key={e.item.id}
                href={e.item.href}
                className='flex min-h-16 items-center justify-between border-t border-t-hairline last:border-b last:border-b-hairline short-land:min-h-[52px]'
                onClick={close}
                aria-current={e.current ? ARIA_CURRENT.TRUE : undefined}
              >
                <Text
                  as={TAG.SPAN}
                  className='text-[36px] leading-[1.1] font-medium tracking-[-0.012em] short-land:text-[26px]'
                >
                  {e.label}
                </Text>
                <Text
                  as={TAG.SPAN}
                  className='inline-flex items-center gap-2 mono text-graphite'
                >
                  {e.current ? (
                    <Text
                      as={TAG.SPAN}
                      className='h-[7px] w-[7px] rounded-[50%] bg-signal'
                      aria-hidden='true'
                    />
                  ) : null}
                  {e.index}
                </Text>
              </NavLink>
            ))}
          </Box>
          {hasContact ? <MobileMenuContactView contact={contact} /> : null}
        </Box>
      </Box>
    </>
  );
}
