'use client';

import { useState } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { GROUP_ID } from '@/constants/case';
import { HEADING, TAG } from '@/constants/tag';
import { workCases } from '@/content/ai-work-cases';
import { AiAutomationExample } from './ai-automation-example';
import { AiPlazaExample } from './ai-plaza-example';
import styles from './ai-work-cases.module.css';

export function AiWorkCases() {
  const [selected, setSelected] = useState<string>(workCases[0].id);

  return (
    <Box
      as={TAG.SECTION}
      id='plaza-case'
      aria-labelledby='plaza-case-title'
      className={styles.case}
    >
      <Box id={GROUP_ID.ENGINEERING} className={styles.header}>
        <Heading level={HEADING.H2} id='plaza-case-title'>
          실제 사례
        </Heading>
        <Box
          className={styles.options}
          role='group'
          aria-label='실제 사례 선택'
        >
          {workCases.map(({ id, label }) => (
            <Button
              key={id}
              aria-controls={`example-${id}`}
              aria-pressed={selected === id}
              onClick={() => setSelected(id)}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>
      {workCases.map((item) => (
        <Box
          as={TAG.ARTICLE}
          id={`example-${item.id}`}
          key={item.id}
          data-case={item.id}
          className={styles.example}
          aria-labelledby={`example-title-${item.id}`}
          hidden={selected !== item.id}
        >
          <Heading
            level={HEADING.H3}
            id={`example-title-${item.id}`}
            className={styles.title}
          >
            {item.title}
          </Heading>
          {'automation' in item ? (
            <AiAutomationExample example={item.automation} />
          ) : (
            <AiPlazaExample />
          )}
        </Box>
      ))}
    </Box>
  );
}
