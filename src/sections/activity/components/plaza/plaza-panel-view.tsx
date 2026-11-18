import type { Ref } from 'react';
import type { OrbitProjectView } from '@/dto/orbit.dto';
import type { PlazaCopy } from './project-plaza';
import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { CloseIcon } from '@/components/atoms/close-icon';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import styles from './panel.module.css';

export function PlazaPanelView({
  project,
  copy,
  closeRef,
  dismiss,
}: {
  project: OrbitProjectView;
  copy: PlazaCopy;
  closeRef: Ref<HTMLButtonElement>;
  dismiss: () => void;
}) {
  return (
    <Box
      as={TAG.ASIDE}
      className={styles.panel}
      id='plaza-panel'
      aria-labelledby='plaza-title'
    >
      <Box>
        <Button
          className={styles.close}
          ref={closeRef}
          aria-label={copy.close}
          onClick={dismiss}
        >
          <CloseIcon />
        </Button>
        <Heading level={HEADING.H2} id='plaza-title'>
          {project.title}
        </Heading>
        {project.sub && <Text>{project.sub}</Text>}
        {project.tag && <Text>{project.tag}</Text>}
      </Box>
      {project.commits.length > 0 && (
        <Box>
          <List>
            {project.commits.map((title, index) => (
              <ListItem key={index}>{title}</ListItem>
            ))}
          </List>
        </Box>
      )}
      <Box>
        {project.last && (
          <Text>
            {copy.lastCommit}　{project.last}
          </Text>
        )}
        {project.repos.map((repo) => (
          <Anchor
            key={repo.href}
            href={repo.href}
            target='_blank'
            rel='noreferrer'
            aria-label={repo.aria}
          >
            {repo.label}
          </Anchor>
        ))}
        {project.privateNote && <Text>{project.privateNote}</Text>}
      </Box>
    </Box>
  );
}
