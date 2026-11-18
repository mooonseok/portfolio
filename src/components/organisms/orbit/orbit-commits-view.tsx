import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { LIST_TAG, TAG } from '@/constants/tag';
import type { OrbitCommitsViewProps } from '@/dto/orbit.dto';
import styles from './orbit-commits.module.css';

export function OrbitCommitsView({ project, copy }: OrbitCommitsViewProps) {
  if (!project.commits.length) return null;
  const list = (commits: string[]) => (
    <List as={LIST_TAG.UL} className={styles.list}>
      {commits.map((commit) => (
        <ListItem key={commit}>
          <Text as={TAG.SPAN}>{commit}</Text>
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box className={styles.work}>
      <Text className={styles.heading}>{copy.recentWork}</Text>
      <Box className={styles.desktop}>{list(project.commits)}</Box>
      <Box className={styles.mobile}>
        {list(project.commits.slice(0, 1))}
        {project.commits.length > 1 ? (
          <Box as={TAG.DETAILS} className={styles.details}>
            <Box as={TAG.SUMMARY} className={styles.toggle}>
              <Text as={TAG.SPAN} className={styles.more}>
                {copy.moreWork}
              </Text>
              <Text as={TAG.SPAN} className={styles.less}>
                {copy.lessWork}
              </Text>
            </Box>
            {list(project.commits.slice(1))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
