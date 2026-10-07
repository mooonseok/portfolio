import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ToolsViewProps } from '@/dto/profile.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function ToolsView({ rows, about, compact }: ToolsViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      id='about'
      className={
        compact
          ? 'container py-20 tab:py-24'
          : 'container pt-(--section) pb-20 tab:pt-40 tab:pb-24 lap:pt-(--section)'
      }
      aria-labelledby='tools-h'
    >
      <SectionHeading
        id='tools-h'
        label=''
        title='기술 스택'
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
            className='grid-page items-baseline border-t border-t-hairline py-2.5 tab:items-center tab:border-b tab:border-b-hairline tab:py-3.5 tab:[border-top:0] lap:py-4 mob:grid-cols-[minmax(0,1fr)] mob:gap-x-3'
          >
            <Text
              as={TAG.DT}
              className='col-[1] text-body leading-relaxed font-medium tab:col-[1/3] lap:col-[3/5]'
            >
              {t.label}
            </Text>
            <Text
              as={TAG.DD}
              className='col-[1] m-0 mt-2 text-body leading-relaxed tab:col-[3/-1] tab:mt-0 lap:col-[5/13]'
            >
              {t.value}
            </Text>
          </Box>
        ))}
      </Box>
    </ScrollScene>
  );
}
