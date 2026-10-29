import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { ORBIT } from '@/constants/orbit';
import { HEADING, TAG } from '@/constants/tag';
import type { OrbitViewProps } from '@/dto/orbit.dto';
import { OrbitPanelView } from './orbit-panel-view';
import { OrbitSwatchView } from './orbit-swatch-view';
import styles from './orbit.module.css';
import marks from './orbit-labels.module.css';

export function OrbitView({
  projects,
  copy,
  active,
  handlers,
  refs,
}: OrbitViewProps) {
  return (
    <Box ref={refs.root} className={styles.root}>
      <Heading level={HEADING.H1} className='sr-only'>
        {copy.heading}
      </Heading>
      <Box
        ref={refs.host}
        className={styles.scene}
        aria-hidden='true'
        onPointerDown={handlers.press}
        onPointerMove={handlers.drag}
        onPointerUp={handlers.release}
        onPointerCancel={handlers.release}
      />
      <svg className={styles.hud} aria-hidden='true'>
        <path ref={refs.ticks} className={styles.ticks} />
        <path ref={refs.reticle} className={styles.reticle} />
      </svg>
      <Box className={marks.labels}>
        {projects.map((project, index) => (
          <Box
            key={project.key}
            ref={refs.label(index)}
            className={marks.label}
            data-active={index === active || undefined}
          >
            <Button
              className={marks.hit}
              aria-pressed={index === active}
              aria-controls={ORBIT.PANEL_ID}
              aria-label={project.aria}
              onClick={() => handlers.select(index)}
              onPointerEnter={handlers.enter(index)}
              onPointerLeave={handlers.leave}
              onFocus={() => handlers.focus(index)}
              onBlur={handlers.blur}
            />
            <Text
              as={TAG.SPAN}
              ref={refs.name(index)}
              className={marks.name}
              aria-hidden='true'
              onClick={handlers.pick(index)}
              onPointerEnter={handlers.enter(index)}
              onPointerLeave={handlers.leave}
            >
              <OrbitSwatchView skin={project.skin} className={marks.mark} />
              {project.title}
            </Text>
          </Box>
        ))}
      </Box>
      {projects.length ? (
        <OrbitPanelView
          projects={projects}
          active={active}
          copy={copy}
          panelRef={refs.panel}
        />
      ) : (
        <Text className={styles.empty}>{copy.empty}</Text>
      )}
      <Anchor
        ref={refs.history}
        href={copy.history.href}
        className={styles.history}
      >
        {copy.history.label}
      </Anchor>
    </Box>
  );
}
