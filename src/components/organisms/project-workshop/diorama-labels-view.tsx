import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Button } from '@/components/atoms/button';
import { DIORAMA } from '@/constants/diorama';
import { TAG } from '@/constants/tag';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';
import { DioramaDetailsView } from './diorama-details-view';

export function DioramaLabelsView(props: DioramaPreviewProps) {
  return (
    <Box role='group' aria-label='프로젝트 선택' className='grid grid-cols-1'>
      {props.projects.map((project) => (
        <Box
          key={project.slug}
          className='border-t border-night-line last:border-b'
        >
          <Button
            ref={(node) => {
              props.labelRefs.current[project.slug] = node;
            }}
            id={`${DIORAMA.LABEL_ID}-${project.slug}`}
            aria-pressed={props.selected === project.slug}
            aria-controls={
              props.wide || props.selected === project.slug
                ? DIORAMA.PANEL_ID
                : undefined
            }
            aria-expanded={
              props.wide ? undefined : props.selected === project.slug
            }
            onClick={(event) => props.onSelect(project.slug, event)}
            className={`flex min-h-20 w-full items-center justify-between gap-4 border-l-2 px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marker-blue)] active:scale-[0.99] motion-reduce:transform-none ${props.selected === project.slug ? 'border-l-signal bg-night-2' : 'border-l-transparent hover:bg-night-2'}`}
          >
            <Box as={TAG.SPAN} className='flex min-w-0 flex-col gap-1'>
              <Text
                as={TAG.SPAN}
                className='flex flex-wrap items-center gap-2 text-lg font-medium'
              >
                {project.title}
                {project.experiment && (
                  <Text as={TAG.SPAN} className='text-xs text-subtle'>
                    실험
                  </Text>
                )}
              </Text>
              <Text
                as={TAG.SPAN}
                className='text-sm leading-relaxed text-subtle'
              >
                {project.service}
              </Text>
            </Box>
            <Text as={TAG.SPAN} aria-hidden className='shrink-0 text-lg'>
              {props.selected === project.slug ? '−' : '+'}
            </Text>
          </Button>
          {!props.wide && props.selected === project.slug && (
            <Box className='pb-6'>
              <DioramaDetailsView {...props} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
