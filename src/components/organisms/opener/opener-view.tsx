import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { TAG } from '@/constants/tag';
import type { OpenerViewProps } from '@/dto/opener.dto';
import { OpenerEndView } from './opener-end-view';
import { OpenerIconView } from './opener-icon-view';
import chrome from './opener-chrome.module.css';
import styles from './opener.module.css';

export function OpenerView({ copy, refs, skip, shown }: OpenerViewProps) {
  if (!shown) return null;
  return (
    <Box ref={refs.root} className={styles.root} role='presentation'>
      <Box ref={refs.line} className={styles.scene} aria-hidden='true'>
        <Box className={styles.line}>
          {copy.line.map((word, index) => (
            <Box key={word} ref={refs.chunk(index)} className={styles.chunk}>
              <OpenerIconView index={index} className={styles.icon} />
              <Text as={TAG.SPAN}>{word}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box ref={refs.name} className={styles.scene} aria-hidden='true'>
        <Box ref={refs.block} className={styles.name}>
          <Text as={TAG.SPAN} ref={refs.kicker} className={styles.kicker}>
            {copy.kicker}
          </Text>
          <Box className={styles.rings}>
            <Text as={TAG.SPAN} ref={refs.ring(0)} />
            <Text as={TAG.SPAN} ref={refs.ring(1)} />
          </Box>
          <Text as={TAG.SPAN} className={styles.big}>
            {copy.name.map((syllable, index) => (
              <Text as={TAG.SPAN} key={syllable} ref={refs.syllable(index)}>
                {syllable}
              </Text>
            ))}
            <Text as={TAG.SPAN} ref={refs.dot} className={styles.dot} />
          </Text>
          <Text as={TAG.SPAN} ref={refs.tag} className={styles.tag}>
            <Text as={TAG.SPAN} ref={refs.frame} className={styles.frame} />
            <Text as={TAG.SPAN} ref={refs.tagText}>
              {copy.tag}
            </Text>
          </Text>
        </Box>
      </Box>
      <OpenerEndView refs={refs} />
      <Box className={chrome.sats} aria-hidden='true'>
        {[0, 1, 2].map((index) => (
          <Box key={index} ref={refs.sat(index)} className={chrome.sat}>
            <OpenerIconView index={index} />
          </Box>
        ))}
      </Box>
      <Box ref={refs.wipe} className={chrome.wipe} aria-hidden='true' />
      <Text className='sr-only'>{copy.label}</Text>
      <Button ref={refs.skip} className={chrome.skip} onClick={skip}>
        {copy.skip}
      </Button>
    </Box>
  );
}
