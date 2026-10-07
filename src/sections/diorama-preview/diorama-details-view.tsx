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
  const project = props.project;
  return (
    <Box
      as={TAG.SECTION}
      id={DIORAMA.PANEL_ID}
      aria-label='선택한 프로젝트 담당 영역'
      className={`min-h-[420px] rounded-[16px] p-6 tab:p-8 lap:min-h-[760px] ${project ? 'bg-[var(--note-paper)] text-[var(--note-ink)]' : 'border border-hairline'}`}
    >
      <Box className='flex items-start justify-between gap-4'>
        <Heading level={HEADING.H2} className='text-2xl font-semibold'>
          {project?.title ?? '어떤 일을 했나요?'}
        </Heading>
        {project && (
          <Button
            onClick={props.onClose}
            className='min-h-11 shrink-0 px-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            닫기
          </Button>
        )}
      </Box>
      {project ? (
        <Box>
          <Text className='mt-4 text-base leading-[1.7]'>
            {project.summary}
          </Text>
          <Text className='mt-3 text-sm'>{project.period}</Text>
          <Text className='mt-5 text-sm font-semibold'>
            {project.experiment
              ? '센서 시험과 별도 LED 제어 실험'
              : '직접 개발·유지보수'}
          </Text>
          <List className='mt-6 list-none space-y-6 p-0'>
            {project.layers.map((layer) => (
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
          <Anchor
            href={project.href}
            className='mt-7 inline-flex min-h-11 items-center text-base font-semibold underline underline-offset-4'
          >
            구현 사례 자세히 보기
          </Anchor>
        </Box>
      ) : (
        <Box className='mt-5 space-y-5 text-base leading-[1.7] text-subtle'>
          <Text>
            감정을 기록하는 앱, 해빗 참여 서비스, 농산물 커머스와 업무 시스템을
            개발해 왔습니다.
          </Text>
          <Text>
            프로젝트를 선택하면 직접 개발·유지보수한 영역과 구체적인 작업을
            확인할 수 있습니다.
          </Text>
          <Text>
            Smart Farm은 사무실 센서 시험과 별도로 진행한 LED 제어 실험입니다.
          </Text>
        </Box>
      )}
    </Box>
  );
}
