import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { ORBIT } from '@/constants/orbit';
import { HEADING, TAG } from '@/constants/tag';
import type { OrbitPanelViewProps } from '@/dto/orbit.dto';
import { OrbitCommitsView } from './orbit-commits-view';
import { OrbitSwatchView } from './orbit-swatch-view';
import styles from './orbit-panel.module.css';
import layout from './orbit-panel-layout.module.css';

export function OrbitPanelView({
  projects,
  active,
  copy,
  panelRef,
}: OrbitPanelViewProps) {
  return (
    <Box
      as={TAG.ASIDE}
      ref={panelRef}
      id={ORBIT.PANEL_ID}
      aria-label={copy.panelLabel}
      tabIndex={-1}
      className={`${styles.panel} ${layout.panel}`}
    >
      <Text className={styles.instruction}>
        <Text as={TAG.SPAN} className={styles.readyInstruction}>
          {copy.instruction}
        </Text>
        <Text as={TAG.SPAN} className={styles.fallbackInstruction}>
          {copy.fallbackInstruction}
        </Text>
      </Text>
      {projects.map((project, index) => (
        <Box
          key={project.key}
          className={styles.card}
          data-active={index === active || undefined}
          inert={index !== active}
        >
          <Box className={styles.head}>
            <OrbitSwatchView skin={project.skin} className={styles.glyph} />
            <Heading level={HEADING.H2} className={styles.title}>
              {project.title}
              {project.tag ? (
                <Text as={TAG.SPAN} className={styles.tag}>
                  {project.tag}
                </Text>
              ) : null}
            </Heading>
            <Text className={styles.sub}>{project.sub}</Text>
          </Box>
          <OrbitCommitsView project={project} copy={copy} />
          <Box className={styles.metadata}>
            <Box as={TAG.DL} className={styles.facts}>
              <Text as={TAG.DT}>{copy.lastCommit}</Text>
              <Text as={TAG.DD}>{project.last}</Text>
              <Text as={TAG.DT}>{copy.repo}</Text>
              <Text as={TAG.DD}>
                {project.privateNote ? (
                  <Text as={TAG.SPAN} className={styles.muted}>
                    {project.privateNote}
                  </Text>
                ) : (
                  project.repos.map((repo) => (
                    <Anchor
                      key={repo.href}
                      href={repo.href}
                      target='_blank'
                      rel='noreferrer'
                      aria-label={repo.aria}
                      className={styles.repo}
                    >
                      {repo.label}
                    </Anchor>
                  ))
                )}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
