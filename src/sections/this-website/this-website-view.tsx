import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ThisWebsiteViewProps } from '@/dto/profile.dto';
import { HEADING, TAG } from '@/constants/tag';

export function ThisWebsiteView({ rows, note }: ThisWebsiteViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      className='container pt-(--section) pb-30 tab:pb-(--section)'
      aria-labelledby='site-h'
    >
      <Box
        className='grid-page [align-items:start] gap-y-4'
        data-signal-anchor='site-h'
      >
        <Text
          as={TAG.SPAN}
          className='hidden mono lap:col-[1/3] lap:block lap:pt-1.5'
        >
          —
        </Text>
        <Heading
          level={HEADING.H2}
          id='site-h'
          className='col-span-full text-h3 leading-[1.25] tracking-[-0.01em] tab:col-[1/4] lap:col-[3/7]'
          data-reveal-item='title'
        >
          This Website
        </Heading>
        <Column className='col-span-full gap-4 tab:col-[4/-1] tab:gap-6 lap:col-[7/13]'>
          <Box as={TAG.DL} className='text-[15px] leading-[1.5]'>
            {rows.map((r) => (
              <Box
                key={r.label}
                className='flex flex-col gap-1 border-t border-t-hairline py-2.5 tab:grid tab:grid-cols-[140px_1fr] tab:gap-3 tab:py-3 tab:last:border-b tab:last:border-b-hairline lap:grid-cols-[160px_1fr] lap:gap-0'
              >
                <Text as={TAG.DT} className='mono lap:pt-0.5'>
                  {r.label}
                </Text>
                <Text as={TAG.DD} className='m-0'>
                  {r.value}
                </Text>
              </Box>
            ))}
          </Box>
          <Text className='text-small leading-[1.6] text-subtle tab:max-w-[30em] tab:text-balance'>
            {note}
          </Text>
        </Column>
      </Box>
    </ScrollScene>
  );
}
