import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { GROUP_ID } from '@/constants/case';
import { PLAZA_EXAMPLE } from '@/constants/ai-practice';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import { plazaCase } from '@/content/ai-plaza-case';
import styles from '../ai-practice.module.css';
import { AiPlazaExample } from './ai-plaza-example';

export function AiPlazaCase() {
  return (
    <Box
      as={TAG.SECTION}
      id='plaza-case'
      aria-labelledby='plaza-case-title'
      className={styles.case}
    >
      <Box id={GROUP_ID.ENGINEERING}>
        <Text className={styles.caseLabel}>{plazaCase.category}</Text>
        <Heading
          level={HEADING.H2}
          id='plaza-case-title'
          className={styles.subheading}
        >
          {plazaCase.title}
        </Heading>
      </Box>
      <Box>
        <List as={LIST_TAG.OL} role='list' className={styles.caseSteps}>
          {plazaCase.steps.map((step) => (
            <ListItem key={step.label} className={styles.caseStep}>
              <Text as={TAG.SPAN} className={styles.stepLabel}>
                {step.label}
              </Text>
              <Box>
                <Text className={styles.stepResult}>{step.result}</Text>
                <Text className={styles.stepDetail}>{step.detail}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box as={TAG.DETAILS} className='mt-3'>
          <Text as={TAG.SUMMARY} className={styles.disclosure}>
            {plazaCase.evidence}
          </Text>
          <Box className='mt-2 grid gap-5 tab:grid-cols-2'>
            {Object.values(PLAZA_EXAMPLE).map((state) => (
              <Box key={state} as={TAG.FIGURE} className='m-0'>
                <AiPlazaExample state={state} />
                <Text
                  as={TAG.FIGCAPTION}
                  className='mt-2 text-sm leading-relaxed'
                >
                  {state === PLAZA_EXAMPLE.OVERLAP
                    ? plazaCase.before
                    : plazaCase.after}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
