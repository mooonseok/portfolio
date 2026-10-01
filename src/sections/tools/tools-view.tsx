import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ToolsViewProps } from '@/dto/profile.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function ToolsView({ rows, about }: ToolsViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      id='about'
      className='container pt-(--section) [--edge:max(var(--margin),env(safe-area-inset-left))] tab:pt-40 lap:pt-(--section)'
      aria-labelledby='tools-h'
    >
      <SectionHeading
        id='tools-h'
        label='—'
        title='Tools / Scope'
        size={HEADING.H3}
        rule={false}
        railFrom={BREAKPOINT.DESKTOP}
        labelFrom={BREAKPOINT.DESKTOP}
      />
      <Text className='mt-6 max-w-[760px] text-[16px] leading-[1.8] text-subtle tab:text-[18px] lap:ml-[calc((100%_-_11_*_var(--gutter))_/_6_+_2_*_var(--gutter))]'>
        {about}
      </Text>
      <Box as={TAG.DL} className='mx-0 mt-4 mb-0 tab:mt-6 lap:mt-12'>
        {rows.map((t) => (
          <Box
            key={t.label}
            className='tools-row relative grid-page items-baseline border-t border-t-hairline py-2.5 tab:items-center tab:border-b tab:border-b-hairline tab:py-3.5 tab:[border-top:0] lap:py-[22px] mob:grid-cols-[84px_minmax(0,1fr)] mob:gap-x-3'
            data-signal-branch=''
          >
            <Text
              as={TAG.DT}
              className='col-[1] mono tab:col-[1/3] tab:pl-12 lap:col-[3/5] lap:pl-0'
            >
              {t.label}
            </Text>
            <Text
              as={TAG.DD}
              className='col-[2] m-0 text-[16px] tab:col-[3/-1] tab:text-[22px] lap:col-[5/13] lap:text-[28px] lap:tracking-[-0.01em]'
            >
              {t.value}
            </Text>
          </Box>
        ))}
      </Box>
    </ScrollScene>
  );
}
