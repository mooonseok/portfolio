'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { PLAZA_EXAMPLE, type PlazaExampleState } from '@/constants/ai-practice';
import { MEDIA } from '@/constants/breakpoint';
import { TAG } from '@/constants/tag';
import { plazaCase as copy } from '@/content/ai-plaza-case';
import { useMediaQuery } from '@/hooks/use-media-query';
import styles from './ai-plaza-example.module.css';

export function AiPlazaExample() {
  const scene = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<PlazaExampleState>(
    PLAZA_EXAMPLE.OVERLAP
  );
  const [automatic, setAutomatic] = useState(true);
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);

  useEffect(() => {
    const target = scene.current;
    if (!automatic || reduced || !target || !('IntersectionObserver' in window))
      return;
    let timer: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.intersectionRatio < 0.5) return;
        timer = window.setTimeout(() => {
          setSelected(PLAZA_EXAMPLE.FIXED);
          setAutomatic(false);
        }, 4100);
      },
      { threshold: 0.5 }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [automatic, reduced]);

  return (
    <Box as={TAG.FIGURE} className={styles.figure}>
      <Box
        className={styles.scene}
        data-state={selected}
        ref={scene}
        role='img'
        aria-label={copy[selected].caption}
      >
        <Text className={styles.meta} aria-hidden>
          {copy.place}
        </Text>
        <Box className={styles.floor} aria-hidden />
        <Box className={styles.station} aria-hidden>
          <Text as={TAG.SPAN} className={styles.label} data-piece='label'>
            {copy.label}
          </Text>
        </Box>
        <Box className={styles.divider} aria-hidden />
        <Box className={styles.panel} data-piece='panel' aria-hidden>
          <Box className={styles.panelHead}>
            <Text className={styles.project}>{copy.project}</Text>
            <Text className={styles.detail}>{copy.description}</Text>
          </Box>
          <Box className={styles.panelBody}>
            <Text className={styles.miniTitle}>{copy.panel}</Text>
            <Text className={styles.detail}>{copy.update}</Text>
          </Box>
        </Box>
      </Box>
      <Box as={TAG.FIGCAPTION} className={styles.caption}>
        <Box
          role='group'
          aria-label='패널 위치 비교'
          className={styles.controls}
        >
          {Object.values(PLAZA_EXAMPLE).map((position) => (
            <Button
              key={position}
              aria-pressed={selected === position}
              onClick={() => {
                setAutomatic(false);
                setSelected(position);
              }}
            >
              {copy[position].label}
            </Button>
          ))}
        </Box>
        <Text className={styles.explanation} aria-live='polite'>
          {copy[selected].caption}
        </Text>
        <Text className={styles.static}>{copy.fixed.caption}</Text>
        <Box className={styles.result}>
          <Text>{copy.conditions}</Text>
          <Text className={styles.metric}>{copy.result}</Text>
        </Box>
      </Box>
    </Box>
  );
}
