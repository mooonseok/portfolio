# 박문석 포트폴리오

Flutter 앱·관리자 웹·서버 API와 기기 실험에서 맡은 업무를 소개하는 개인
포트폴리오입니다. Emosave, IndianBob, FarmFam+, APC, Smart Farm의 담당 범위와
구현 사례를 담았습니다.

**이 저장소는 포트폴리오 사이트 코드입니다.** 소개한 서비스의 원본 구현은 별도
프로젝트에 있습니다. 이미지·도식·체험 기능은 담당 업무를 설명하기 위한 재구성
자료입니다.

## 주요 기능

- **3D 프로젝트 작업실**: 모형이나 이름표를 선택하면 담당 업무와 상세 링크를
  보여 줍니다. 3D를 사용할 수 없는 환경에서는 정적 그림으로 대체합니다.
- **프로젝트별 구현 사례**: 담당 기능, 기능 간 연결, 구현 방식과 검증 범위를
  설명합니다.
- **Emosave 배치 편집 예시**: 돔 안의 캐릭터를 선택·이동·회전·크기 조절·삭제하고
  처음 배치로 복원할 수 있습니다. 실제 앱 화면이나 Flutter 구현을 그대로 재현한
  기능은 아니며, 저장이나 API 호출은 하지 않습니다.

공개 앱 정보는
[인디언밥](https://play.google.com/store/apps/details?id=com.connecto.indianbob&hl=ko)과
[분저장(Emosave)](https://play.google.com/store/apps/details?id=com.lab254.emosave&hl=ko)의
Google Play 등록 페이지에서 확인할 수 있습니다.

## 기술 구성

Next.js 15(App Router), React 19, TypeScript, Tailwind CSS v4, Three.js를
사용합니다. 별도 CMS나 서버 API 없이 `src/content`의 데이터로 페이지를 정적으로
생성합니다. 웹폰트는 [public/fonts](public/fonts/README.md)에서 직접 제공합니다.

## 로컬 실행

Node.js 22.18 이상과 pnpm 10.27.0이 필요합니다. Node.js 24에서 검증했으며,
패키지 관리자 버전은 `package.json`의 `packageManager`에 고정되어 있습니다.

```bash
corepack enable
pnpm install
pnpm dev --port 3100
```

[http://localhost:3100](http://localhost:3100)에서 확인합니다. 3000번 포트는
다른 프로젝트에서 사용하므로 개발·검증 서버 모두 3100번을 사용합니다.

| 화면                  | 경로                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------ |
| 프로젝트 작업실       | `/`                                                                                        |
| 프로젝트 상세         | `/work/emosave`, `/work/indian-bob`, `/work/farmfam-plus`, `/work/apc`, `/work/smart-farm` |
| Emosave 편집기만 보기 | `/preview/emosave-editor`                                                                  |
| 3D 작업실만 보기      | `/preview/diorama`                                                                         |
| 이전 홈 구성 비교     | `/preview/classic`                                                                         |

`/preview/*`는 검색 색인과 사이트맵에서 제외합니다. 빌드 결과를 실행할 때는 개발
서버를 종료한 뒤 다음 명령을 사용합니다.

```bash
pnpm build
pnpm start --port 3100
```

## 검증

변경 후 아래 검사를 실행합니다. `pnpm build`는 `.next`를 덮어쓰므로 실행 전에
개발 서버를 종료해야 합니다.

```bash
pnpm lint               # 코드 규칙 검사
pnpm typecheck          # 타입 검사
pnpm test               # 상태·입력·복원 등의 회귀 테스트
pnpm check:boundaries   # 컴포넌트 역할과 의존성 방향 검사
pnpm format:check       # 코드·문서 서식 검사
pnpm build              # 배포용 빌드
pnpm check:anchors      # 빌드된 페이지의 링크 대상·접근성 참조 검사
pnpm check:metadata     # 검색·공유 정보와 사이트맵 검사
```

서식은 `pnpm format`으로 정리합니다. 화면 변경 시에는 390 / 744 / 1024 /
1440px에서 직접 확인합니다. 현재 저장소에는 GitHub Actions 검증 워크플로가
없으므로 검증은 로컬에서 실행합니다.

## 코드와 콘텐츠 위치

| 위치                                          | 용도                                |
| --------------------------------------------- | ----------------------------------- |
| [src/app](src/app/)                           | 페이지 경로와 홈 구성               |
| [src/sections](src/sections/)                 | 페이지별 섹션                       |
| [src/components](src/components/)             | 공통 UI 컴포넌트                    |
| [src/hooks](src/hooks/), [src/lib](src/lib/)  | 브라우저 상태·입력 처리와 공통 로직 |
| [src/content/site.ts](src/content/site.ts)    | 소개·연락처·대표 사례·기술 스택     |
| [src/content/projects](src/content/projects/) | 프로젝트 정보와 상세 본문           |
| [src/styles](src/styles/)                     | 공통 스타일과 디자인 토큰           |
| [public/images](public/images/)               | 개념 이미지와 편집기 그림           |
| [scripts](scripts/)                           | 테스트와 검증 도구                  |

프로젝트의 기본 정보는 `<slug>.ts`, 상세 본문은 `<slug>-case.ts`에서 수정합니다.
컨테이너는 콘텐츠와 상태를 준비하고, `*-view.tsx`는 전달받은 값으로 화면을
그립니다. 자세한 구조와 규칙은 [HANDOFF.md](HANDOFF.md)를 참고하세요.

빈 문자열이나 배열로 둔 콘텐츠는 화면에서 숨깁니다. 작성 전인 항목에는 임시
문구를 넣지 않습니다.

콘텐츠를 수정할 때는 실제 담당 범위와 실험 상태를 유지합니다. `PRODUCT WORK`는
출시를 의미하지 않습니다. Smart Farm의 모니터링은 사무실 센서 시험이며, 제어는
별도의 LED 실험으로 실제 농장 적용을 주장하지 않습니다. APC OCR 실험은 현재
화면에 표시하지 않습니다.

## 배포 설정

공식 공개 URL은 아직 확정하지 않았습니다. [.env.example](.env.example)을
기준으로 배포 환경에 다음 값을 설정합니다.

| 변수             | 공개 배포                                         | 로컬·미리보기       |
| ---------------- | ------------------------------------------------- | ------------------- |
| `SITE_URL`       | 확인된 공개 HTTPS 주소. 경로·쿼리·프래그먼트 제외 | 미설정              |
| `SITE_INDEXABLE` | 검색 색인을 허용할 때 `true`                      | 미설정 또는 `false` |

유효한 `SITE_URL`과 `SITE_INDEXABLE=true`가 모두 있어야 검색 색인을 허용합니다.
주소를 설정하지 않거나 색인을 허용하지 않으면 `noindex`를 적용하고 사이트맵을
비웁니다. 잘못된 설정값은 오류로 처리합니다. 이 설정은 페이지 접근을 제한하지는
않습니다.

설정은 **빌드 시점**에 적용되므로 값을 바꾸면 다시 빌드해야 합니다.
`pnpm check:metadata`도 빌드와 같은 환경변수로 실행하세요. 이 검사는
`.env.local`을 자동으로 읽지 않으므로 셸 환경변수로 전달해야 합니다.

## 관련 문서

- [HANDOFF.md](HANDOFF.md): 아키텍처, 콘텐츠 기준, 상호작용과 검증 범위
- [DESIGN.md](DESIGN.md): 디자인 토큰과 컴포넌트 기준
- [AGENTS.md](AGENTS.md): 브랜치·커밋·검증·프로세스 관리 규칙
