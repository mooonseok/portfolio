import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import type { AutomationCase } from '@/dto/ai-automation-case.dto';
import styles from './ai-work-cases.module.css';

export function AiAutomationExample({ example }: { example: AutomationCase }) {
  return (
    <Box className={styles.automation}>
      <Box as={TAG.DL} className={styles.flow}>
        <Box className={styles.row}>
          <Text as={TAG.DT}>시작</Text>
          <Box as={TAG.DD}>{example.start}</Box>
        </Box>
        <Box className={styles.row}>
          <Text as={TAG.DT}>자동 작업</Text>
          <Box as={TAG.DD}>{example.work}</Box>
        </Box>
        <Box className={styles.row}>
          <Text as={TAG.DT}>검토와 수정</Text>
          <Box as={TAG.DD}>
            <List className={styles.returns}>
              {example.returns.map(({ condition, action }) => (
                <ListItem key={condition}>
                  <Text className={styles.condition}>{condition}</Text>
                  <Text className={styles.action}>{action}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box className={styles.row}>
          <Text as={TAG.DT}>초안 저장</Text>
          <Box as={TAG.DD}>{example.output}</Box>
        </Box>
        <Box className={styles.row}>
          <Text as={TAG.DT}>검사 결과</Text>
          <Box as={TAG.DD}>
            <Text className={styles.sample}>{example.sample}</Text>
            <Text>{example.check}</Text>
          </Box>
        </Box>
      </Box>
      <Box className={styles.handoff}>
        <Heading level={HEADING.H4}>내가 확인하고 발행</Heading>
        <Text>{example.handoff}</Text>
      </Box>
    </Box>
  );
}
