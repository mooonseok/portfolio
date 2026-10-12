import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { List, ListItem } from '@/components/atoms/list';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { AiPracticeSummaryViewProps } from '@/dto/ai-practice.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function AiPracticeSummaryView({ home }: AiPracticeSummaryViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      id='ai-practice'
      className='container pb-20 tab:pb-24'
      aria-labelledby='ai-practice-h'
    >
      <SectionHeading
        id='ai-practice-h'
        label=''
        title={home.title}
        size={HEADING.H3}
        rule={false}
        railFrom={BREAKPOINT.DESKTOP}
        labelFrom={BREAKPOINT.DESKTOP}
      />
      <Column className='mt-6 max-w-[760px] items-start gap-6 tab:gap-8 lap:ml-[calc((100%_-_11_*_var(--gutter))_/_6_+_2_*_var(--gutter))]'>
        <List className='m-0 flex list-none flex-col gap-3 p-0'>
          {home.items.map((item) => (
            <ListItem
              key={item}
              className='text-body leading-[1.7] text-pretty tab:text-[18px]'
            >
              {item}
            </ListItem>
          ))}
        </List>
        <Cta href={home.link.href} label={home.link.label} />
      </Column>
    </ScrollScene>
  );
}
