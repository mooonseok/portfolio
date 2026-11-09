import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Heading } from '@/components/atoms/heading';
import { Anchor } from '@/components/atoms/anchor';
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
        <Box className='mt-8 grid items-start gap-8 lap:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lap:gap-12'>
          <Box>
            <DioramaLabelsView {...props} />
            <Box as={TAG.FIGURE} className='m-0 mt-8'>
              <Box className='relative h-[220px] w-full overflow-hidden bg-paper'>
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
                className='mt-2 text-xs leading-relaxed text-subtle'
              >
                프로젝트별 개념 모형입니다. 실제 화면이나 프로젝트 사이의 연결을
                나타내지 않습니다.
              </Text>
            </Box>
            {props.failed && (
              <Text role='status' className='mt-2 text-xs text-subtle'>
                3D 대신 개념 그림을 표시합니다. 프로젝트 목록은 계속 사용할 수
                있습니다.
              </Text>
            )}
          </Box>
          {props.wide && <DioramaDetailsView {...props} />}
        </Box>
      </Box>
      {props.children}
    </Box>
  );
}
