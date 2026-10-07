import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Heading } from '@/components/atoms/heading';
import { Anchor } from '@/components/atoms/anchor';
import { CloseIcon } from '@/components/atoms/close-icon';
import { Button } from '@/components/atoms/button';
import { List, ListItem } from '@/components/atoms/list';
import { DIORAMA } from '@/constants/diorama';
import { HEADING, TAG } from '@/constants/tag';
import { DioramaOverviewView } from './diorama-overview-view';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';

export function DioramaDetailsView(props: DioramaPreviewProps) {
  const project = props.project;
  return (
    <Box
      as={TAG.SECTION}
      id={DIORAMA.PANEL_ID}
      aria-labelledby='project-stage-title'
      className={`rounded-[16px] p-6 tab:p-8 ${project ? 'bg-[var(--note-paper)] text-[var(--note-ink)]' : 'border border-hairline'}`}
    >
      <Box className='flex items-start justify-between gap-4'>
        <Heading
          id='project-stage-title'
          level={HEADING.H2}
          className='text-2xl font-semibold'
        >
          {project?.title ?? '담당 영역 한눈에'}
        </Heading>
        {project && (
          <Button
            onClick={props.onClose}
            aria-label='담당 업무 닫기'
            className='fine:hover:bg-black/5 flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            <CloseIcon />
          </Button>
        )}
      </Box>
      {project ? (
        <Box>
          <Anchor
            href={project.href}
            className='mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4'
          >
            구현 사례 자세히 보기
          </Anchor>
          <Text className='mt-4 text-base leading-[1.7]'>
            {project.summary}
          </Text>
          <Text className='mt-3 text-sm'>{project.period}</Text>
          <Text className='mt-5 text-sm font-semibold'>
            {project.experiment
              ? '센서 시험과 별도 LED 제어 실험'
              : '직접 개발·유지보수'}
          </Text>
          <List className='mt-6 list-none space-y-7 p-0'>
            {project.layers.map((layer) => (
              <ListItem
                key={layer.label}
                className='border-t border-current/15 pt-5'
              >
                <Heading level={HEADING.H3} className='text-base font-semibold'>
                  {layer.label}
                </Heading>
                <List className='mt-3 list-disc space-y-3 pl-5'>
                  {layer.lines.map((line) => (
                    <ListItem key={line} className='text-base leading-[1.7]'>
                      {line}
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
          <Anchor
            href={project.href}
            className='mt-7 inline-flex min-h-11 items-center text-base font-semibold underline underline-offset-4'
          >
            구현 사례 자세히 보기
          </Anchor>
        </Box>
      ) : (
        <DioramaOverviewView projects={props.projects} />
      )}
    </Box>
  );
}
