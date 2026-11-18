import { CaseMetaView } from './case-meta-view';
import { ProjectLinks } from '@/components/molecules/project-links';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import { TAG } from '@/constants/tag';
import type { CaseHeaderViewProps } from '@/dto/case-template.dto';

export function CaseDetailsView({
  header,
  darkHeader,
  meta,
}: Pick<CaseHeaderViewProps, 'header' | 'darkHeader' | 'meta'>) {
  if (!header.role?.length && !header.links?.length && !meta.length)
    return null;
  return (
    <Column className='max-w-[56em]'>
      {header.role?.length ? (
        <Column className='mt-6 gap-3'>
          <Text as={TAG.SPAN} className='mono muted'>
            담당 역할
          </Text>
          {header.role.map((body) => (
            <Text key={body} className='text-body leading-[1.7]'>
              {body}
            </Text>
          ))}
        </Column>
      ) : null}
      {meta.length ? (
        <CaseMetaView meta={meta} darkHeader={darkHeader} />
      ) : null}
      {header.links?.length ? (
        <Box className='mt-4 tab:mt-6'>
          <ProjectLinks links={header.links} />
        </Box>
      ) : null}
    </Column>
  );
}
