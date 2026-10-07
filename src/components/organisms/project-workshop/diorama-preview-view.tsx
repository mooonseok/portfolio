import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Heading } from '@/components/atoms/heading';
import { Anchor } from '@/components/atoms/anchor';
import { Button } from '@/components/atoms/button';
import { DIORAMA } from '@/constants/diorama';
import { HEADING, TAG } from '@/constants/tag';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';
import { DioramaLabelsView } from './diorama-labels-view';
import { DioramaDetailsView } from './diorama-details-view';

export function DioramaPreviewView(props: DioramaPreviewProps) {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      onKeyDown={props.onKeyDown}
      className='min-h-screen bg-paper text-ink'
    >
      {!props.home && (
        <Box
          as={TAG.HEADER}
          className='container flex flex-wrap items-center justify-between gap-4 border-b border-hairline pt-6 pb-5'
        >
          <Anchor
            href='/'
            className='min-h-11 content-center text-sm underline underline-offset-4'
          >
            박문석 · Software Engineer
          </Anchor>
          <Text className='text-sm text-subtle'>
            프로젝트 작업실 · 미리보기
          </Text>
        </Box>
      )}
      <Box
        as={TAG.SECTION}
        id={props.home ? 'work' : undefined}
        className='container pt-8 pb-12 tab:pt-10'
      >
        {props.home && <Box id='flutter-work' />}
        <Heading
          level={HEADING.H1}
          className='font-sans text-[clamp(32px,4vw,48px)] leading-none tracking-[-0.035em]'
        >
          {props.home ? '박문석의 프로젝트 작업실' : '프로젝트 작업실'}
        </Heading>
        <Text className='mt-3 max-w-[58ch] text-base leading-relaxed'>
          {props.home
            ? props.headline
            : '프로젝트를 선택해 직접 개발한 기능과 실험 내용을 살펴보세요.'}
        </Text>
        {props.home && (
          <Anchor
            href={props.github ?? ''}
            target='_blank'
            rel='noreferrer'
            className='mt-2 inline-flex min-h-11 items-center text-sm underline underline-offset-4'
          >
            GitHub ↗
          </Anchor>
        )}
        <Box className='mt-6 grid items-start gap-6 lap:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)] lap:gap-10'>
          <Box>
            <Box as={TAG.FIGURE} className='m-0'>
              <Box className='relative aspect-[5/3] w-full overflow-hidden rounded-[20px] bg-[#e9e7df] lap:aspect-auto lap:h-[380px]'>
                <Image
                  src={DIORAMA.POSTER}
                  alt='Emosave, IndianBob, FarmFam+, APC, Smart Farm을 표현한 다섯 개의 개념 모형'
                  fill
                  priority
                  sizes={DIORAMA.POSTER_SIZES}
                  className={
                    props.ready ? 'object-contain opacity-0' : 'object-contain'
                  }
                />
                <Box
                  ref={props.hostRef}
                  aria-hidden
                  className={`absolute inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full ${props.ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                />
              </Box>
              <Text
                as={TAG.FIGCAPTION}
                className='mt-3 text-sm leading-relaxed text-subtle'
              >
                프로젝트별 개념 모형입니다. 실제 화면이나 프로젝트 사이의 연결을
                나타내지 않습니다.
              </Text>
            </Box>
            <DioramaLabelsView {...props} />
            <Box className='mt-3 flex flex-wrap items-center justify-between gap-2'>
              <Text
                role='status'
                aria-live='polite'
                className='text-sm text-subtle'
              >
                {props.failed
                  ? '3D를 불러오지 못해 정적 화면을 표시합니다.'
                  : props.enabled && !props.ready
                    ? '3D를 준비하고 있습니다.'
                    : props.ready
                      ? '모형이나 아래 이름표로 선택할 수 있습니다.'
                      : '정적 화면에서도 프로젝트를 선택할 수 있습니다.'}
              </Text>
              <Button
                onClick={props.onToggle}
                aria-pressed={props.enabled}
                className='min-h-11 px-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                {props.enabled ? '3D 끄기' : '3D 켜기'}
              </Button>
            </Box>
          </Box>
          {props.wide && <DioramaDetailsView {...props} />}
        </Box>
      </Box>
      {props.children}
    </Box>
  );
}
