import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { EDITOR_ASSET_SIZE } from '@/constants/emosave-editor-assets';
import type { EditorViewProps } from '@/dto/emosave-editor-view.dto';
import { EditorHandlesView } from './editor-handles-view';
import styles from './emosave-editor.module.css';

export function EditorSceneView(props: EditorViewProps) {
  const bubble = props.characters.find((item) => item.id === props.bubbleId);
  const placement = props.snapshot.items.find(
    (item) => item.id === props.bubbleId
  );
  return (
    <Box
      ref={props.hostRef}
      data-editor-interactive
      className={styles.stage}
      role='group'
      aria-label='돔 안의 캐릭터 배치 영역'
      aria-describedby='editor-help editor-keyboard-help'
      onKeyDown={props.onKeyDown}
    >
      <Image
        src='/images/emosave-editor/dome.png'
        alt='둥근 돔 안에 창문과 작은 화분이 놓인 방'
        fill
        sizes={EDITOR_ASSET_SIZE.DOME}
        className={styles.backdrop}
        priority
        onError={props.onAssetError}
        draggable={false}
      />
      {props.characters.map((character, index) => {
        const item = props.snapshot.items.find(
          (value) => value.id === character.id
        );
        if (!item) return null;
        const selected = props.snapshot.selectedId === item.id;
        return (
          <Button
            key={item.id}
            data-editor-item={item.id}
            className={styles.character}
            aria-label={`${character.name} 선택`}
            aria-pressed={selected}
            disabled={props.failed}
            style={{
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: `translate(-50%, -50%) rotate(${item.angle}deg) scale(${item.scale})`,
              zIndex: selected ? 10 : index + 1,
            }}
            onClick={(event) => {
              if (event.detail === 0) props.onSelect(selected ? null : item.id);
            }}
          >
            <Image
              src={character.image}
              alt=''
              fill
              sizes={EDITOR_ASSET_SIZE.CHARACTER}
              draggable={false}
              priority
              onError={props.onAssetError}
            />
          </Button>
        );
      })}
      <EditorHandlesView {...props} />
      {bubble && placement && !props.failed && (
        <Text
          className={`${styles.bubble} ${placement.y < 0.3 ? styles.bubbleBelow : ''}`}
          style={{
            left: `${Math.max(0.22, Math.min(0.78, placement.x)) * 100}%`,
            top: `${(placement.y + (placement.y < 0.3 ? 0.13 : -0.13) * placement.scale) * 100}%`,
          }}
        >
          {bubble.bubble}
        </Text>
      )}
      {props.failed && (
        <Text className={styles.failure} role='alert'>
          그림을 불러오지 못했습니다. 페이지를 새로고침하거나 아래 구현 사례를
          확인해 주세요.
        </Text>
      )}
    </Box>
  );
}
