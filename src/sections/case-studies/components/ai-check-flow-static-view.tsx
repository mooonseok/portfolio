import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import styles from './ai-review-console.module.css';

interface Props {
  requests: WorkflowRequest[];
  selected: string;
  title: string;
  escalation: string;
}

export function WorkflowTextView({
  requests,
  selected,
  title,
  escalation,
}: Props) {
  return (
    <Box className={styles.details}>
      {requests.map((request) => (
        <Box
          as={TAG.DETAILS}
          key={request.id}
          data-selected={request.id === selected}
          id={'workflow-' + request.id}
        >
          <Text as={TAG.SUMMARY}>
            {request.label} {title}
          </Text>
          <List as={LIST_TAG.OL} className={styles.stages}>
            {request.stages.map((stage, index) => (
              <ListItem
                key={stage.label}
                id={'workflow-' + request.id + '-' + index}
              >
                <Heading level={HEADING.H3}>{stage.label}</Heading>
                <Text as={TAG.SPAN} className={styles.owner}>
                  {stage.owner}
                </Text>
                <Text>{stage.body}</Text>
              </ListItem>
            ))}
          </List>
          <List className={styles.issues}>
            {request.issues.map((issue) => (
              <ListItem key={issue.id}>
                <Text as={TAG.SPAN} className={styles.stage}>
                  {issue.label}
                </Text>
                <Text>
                  {request.stages[issue.source].label} →{' '}
                  {issue.owner
                    ? request.workers?.find(
                        (worker) => worker.id === issue.owner
                      )?.label + ' 담당'
                    : request.stages[issue.target].label}
                  . {issue.reason}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text className={styles.limit}>{escalation}</Text>
        </Box>
      ))}
    </Box>
  );
}
