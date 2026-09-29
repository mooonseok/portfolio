import { Box } from '@/components/atoms/box';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { MONITOR_ROWS } from '@/constants/selected-work';
import { TAG } from '@/constants/tag';

export function SmartFarmMonitorView() {
  return (
    <Box
      as={TAG.SPAN}
      className='pointer-events-none absolute top-3 right-3 flex flex-col gap-1.5 bg-paper px-3 py-2.5 mono tab:hidden lap:top-5 lap:right-5 lap:flex lap:min-w-[200px] lap:gap-2.5 lap:px-[18px] lap:py-4'
      aria-hidden='true'
    >
      <Row
        as={TAG.SPAN}
        className='items-center gap-1.5 lap:gap-2 lap:border-b lap:border-b-hairline lap:pb-2'
      >
        <Box
          as={TAG.SPAN}
          className='h-[7px] w-[7px] rounded-[50%] bg-signal'
        />
        MONITORING
      </Row>
      {MONITOR_ROWS.map((r) => (
        <Box
          as={TAG.SPAN}
          key={r.key}
          className='flex justify-between gap-4 data-desktop-only:hidden lap:gap-6 lap:data-desktop-only:flex'
          data-desktop-only={r.desktopOnly || undefined}
        >
          <Text as={TAG.SPAN} className='muted'>
            {r.key}
          </Text>
          <Text as={TAG.SPAN}>—</Text>
        </Box>
      ))}
    </Box>
  );
}
