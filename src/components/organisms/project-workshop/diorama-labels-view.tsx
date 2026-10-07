import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Button } from '@/components/atoms/button';
import { DIORAMA } from '@/constants/diorama';
import { TAG } from '@/constants/tag';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';
import { DioramaDetailsView } from './diorama-details-view';

export function DioramaLabelsView(props: DioramaPreviewProps) {
  return (
    <Box
      role='group'
      aria-label='프로젝트 선택'
      className={
        props.wide
          ? 'mt-4 grid grid-cols-6 gap-2'
          : 'mt-4 grid grid-cols-1 gap-2'
      }
    >
      {props.projects.map((project, index) => (
        <Box
          key={project.slug}
          className={
            props.wide
              ? `col-span-2 ${index === 3 ? 'col-start-2' : index === 4 ? 'col-start-4' : ''}`
              : undefined
          }
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
            className={`flex min-h-20 w-full flex-col items-start gap-1 rounded-lg border-2 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marker-blue)] active:scale-[0.99] motion-reduce:transform-none ${props.selected === project.slug ? 'border-[var(--marker-red)] bg-[var(--note-paper)]' : 'border-hairline bg-paper hover:bg-[var(--board-white)]'}`}
          >
            <Text
              as={TAG.SPAN}
              className='flex flex-wrap items-center gap-2 text-lg font-semibold'
            >
              {project.title}
              {project.experiment && (
                <Text
                  as={TAG.SPAN}
                  className='rounded border border-dashed border-[var(--marker-green)] px-1.5 text-xs leading-5 text-[var(--marker-green)]'
                >
                  실험
                </Text>
              )}
              {props.selected === project.slug && (
                <Text
                  as={TAG.SPAN}
                  className='text-xs text-[var(--marker-red)]'
                >
                  선택됨
                </Text>
              )}
            </Text>
            <Text as={TAG.SPAN} className='text-sm leading-relaxed text-subtle'>
              {project.service}
            </Text>
          </Button>
          {!props.wide && props.selected === project.slug && (
            <Box className='pt-2'>
              <DioramaDetailsView {...props} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
