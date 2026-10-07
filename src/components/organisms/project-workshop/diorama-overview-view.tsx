import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Anchor } from '@/components/atoms/anchor';
import { List, ListItem } from '@/components/atoms/list';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';
import { TAG } from '@/constants/tag';

export function DioramaOverviewView({
  projects,
}: Pick<DioramaPreviewProps, 'projects'>) {
  return (
    <Box>
      <Text className='mt-3 text-base leading-[1.7] text-subtle'>
        이름표를 선택하면 구체적인 담당 업무가 펼쳐집니다.
      </Text>
      <List className='mt-6 list-none p-0'>
        {projects.map((project) => (
          <ListItem key={project.slug} className='border-t border-hairline'>
            <Anchor
              href={project.href}
              className='group flex min-h-16 items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-4'
            >
              <Box as={TAG.SPAN} className='flex flex-col gap-1'>
                <Text as={TAG.SPAN} className='text-base font-semibold'>
                  {project.title}
                </Text>
                <Text
                  as={TAG.SPAN}
                  className='text-sm leading-relaxed text-subtle'
                >
                  {project.layers.map((layer) => layer.label).join(' · ')}
                  {project.experiment ? ' (실험)' : ''}
                </Text>
              </Box>
              <Text
                as={TAG.SPAN}
                className='shrink-0 text-sm underline underline-offset-4'
              >
                상세 보기
              </Text>
            </Anchor>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
