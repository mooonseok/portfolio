import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import styles from './ai-check-flow.module.css';

export function WorkflowTextView({
  requests,
}: {
  requests: WorkflowRequest[];
}) {
  return (
    <Box className={styles.static}>
      {requests.map((request) => (
        <Box
          as={TAG.ARTICLE}
          key={request.id}
          id={'workflow-' + request.id}
          className='border-t border-hairline p-5'
        >
          <Heading level={HEADING.H3} className='text-2xl'>
            {request.label}
          </Heading>
          <List as={LIST_TAG.OL} className='mt-4 grid list-decimal gap-3 pl-5'>
            {request.stages.map((stage, index) => (
              <ListItem
                key={stage.label}
                id={'workflow-' + request.id + '-' + index}
              >
                <Text>
                  {stage.label} · {stage.owner}
                </Text>
                <Text className='text-subtle'>{stage.body}</Text>
              </ListItem>
            ))}
          </List>
          <Heading level={HEADING.H4} className='mt-5'>
            검토 결과
          </Heading>
          <Text className='mt-2'>
            통과하면 {request.stages[4].label} 단계로 넘어갑니다.
          </Text>
          <List className='mt-2 grid gap-2'>
            {request.issues.map((issue) => (
              <ListItem key={issue.id}>
                {issue.label} → {request.stages[issue.target].label}.{' '}
                {issue.reason} 수정한 뒤 다시 검토합니다.
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
