'use client';

import { useState } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import { circuitCopy } from '@/content/ai-workflow';
import { AiDesignFlow } from './ai-design-flow';
import { AiRequestRouting } from './ai-request-routing';
import styles from './ai-check-flow.module.css';

export function AiCheckLoop() {
  const [design, setDesign] = useState(false);
  return (
    <Box
      as={TAG.SECTION}
      id='work'
      aria-labelledby={AI_LOOP_TITLE_ID}
      className={styles.flow}
    >
      <Box className={styles.heading}>
        <Heading id={AI_LOOP_TITLE_ID} level={HEADING.H1}>
          {circuitCopy.title}
        </Heading>
        <Box
          className={styles.tabs}
          role='group'
          aria-label={circuitCopy.controls}
        >
          <Button
            className={styles.tab}
            aria-pressed={!design}
            onClick={() => setDesign(false)}
          >
            개발 요청
          </Button>
          <Button
            className={styles.tab}
            aria-pressed={design}
            onClick={() => setDesign(true)}
          >
            디자인 요청
          </Button>
        </Box>
      </Box>
      {design ? <AiDesignFlow /> : <AiRequestRouting />}
    </Box>
  );
}
