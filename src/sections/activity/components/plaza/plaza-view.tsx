import type { Ref } from 'react';
import type { OrbitProjectView } from '@/dto/orbit.dto';
import type { PlazaCopy } from './project-plaza';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import { PlazaPanelView } from './plaza-panel-view';
import styles from './plaza.module.css';

interface Props {
  projects: OrbitProjectView[];
  current?: OrbitProjectView;
  copy: PlazaCopy;
  closeRef: Ref<HTMLButtonElement>;
  dismiss: () => void;
  select: (project: OrbitProjectView, button: HTMLButtonElement) => void;
}

export function PlazaView({
  projects,
  current,
  copy,
  select,
  dismiss,
  closeRef,
}: Props) {
  return (
    <Box className={styles.plaza} data-open={Boolean(current) || undefined}>
      <Heading level={HEADING.H1} className='sr-only'>
        {copy.heading}
      </Heading>
      {projects.length ? (
        <Box className={styles.stage}>
          {projects.map((project, slot) => (
            <Button
              key={project.key}
              data-slot={slot}
              data-model={project.skin}
              className={styles.station}
              aria-label={project.aria}
              aria-controls={
                current?.key === project.key ? 'plaza-panel' : undefined
              }
              aria-expanded={current?.key === project.key}
              onClick={(event) => select(project, event.currentTarget)}
            >
              <Text as={TAG.SPAN} className={styles.label}>
                {project.title}
              </Text>
            </Button>
          ))}
        </Box>
      ) : (
        <Box className='mx-auto max-w-lg p-6 text-center'>
          <Text>{copy.empty}</Text>
          <NavLink href={copy.history.href} className='underline'>
            {copy.history.label}
          </NavLink>
        </Box>
      )}
      {current && (
        <PlazaPanelView
          project={current}
          copy={copy}
          closeRef={closeRef}
          dismiss={dismiss}
        />
      )}
    </Box>
  );
}
