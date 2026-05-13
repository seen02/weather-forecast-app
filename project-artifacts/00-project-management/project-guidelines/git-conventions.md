# Git Conventions

## 1. 기본 원칙

이 프로젝트의 Git 작업은 변경 이력과 과제 진행 과정을 명확히 설명할 수 있도록 관리한다.

- 커밋은 의미 있는 작업 단위로 나눈다.
- 커밋 메시지는 Conventional Commits 형식을 따른다.
- 구현, 문서, 설정 변경을 가능한 한 구분한다.
- push는 사용자가 직접 수행한다.
- `node_modules`, `.next`, `.env.local` 같은 로컬 생성물은 커밋하지 않는다.

## 2. 브랜치 규칙

브랜치가 필요한 경우 다음 형식을 사용한다.

```txt
codex/<type>/<short-description>
```

예:

```txt
codex/chore/project-initialization
codex/feat/weather-routing
codex/docs/submission-notes
```

브랜치 type은 커밋 type과 동일한 기준을 사용한다.

## 3. 커밋 메시지 규칙

커밋 메시지는 다음 형식을 사용한다.

```txt
<type>(<scope>): <summary>
```

예:

```txt
chore(project): initialize next 12 app
docs(process): add subprocess and artifact guidelines
feat(weather): add city routing page
fix(api): handle missing openweather api key
```

### Type

- `feat`: 사용자 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷, CSS 등 동작 변경이 적은 스타일 변경
- `refactor`: 동작 변경 없는 구조 개선
- `test`: 테스트 추가 또는 수정
- `chore`: 설정, 의존성, 빌드, 초기화 작업
- `build`: 빌드 시스템 또는 패키지 설정 변경

### Scope

scope는 변경 영역을 짧게 적는다.

예:

- `project`
- `docs`
- `layout`
- `routing`
- `graphql`
- `weather`
- `apollo`
- `styles`
- `test`

### Summary

- 영어 소문자로 작성한다.
- 마침표를 붙이지 않는다.
- 72자 이내를 권장한다.
- 무엇을 했는지 명령형에 가깝게 작성한다.

## 4. 커밋 단위 기준

좋은 커밋 단위:

- Next.js 프로젝트 초기화
- 레이아웃 wrapper 추가
- 도시 라우팅 구현
- GraphQL API Route 추가
- OpenWeather service 추가
- Apollo Client 연결
- README 제출 내용 정리

피해야 할 커밋 단위:

- 서로 관련 없는 구현과 문서 변경을 한 커밋에 모두 넣는 경우
- lint 수정, 기능 구현, README 변경을 이유 없이 섞는 경우
- 동작하지 않는 중간 상태를 커밋하는 경우

단, 과제 진행 기록 보존이 더 중요한 경우에는 문서와 설정 변경을 함께 커밋할 수 있다.

## 5. 스테이징 규칙

커밋 전에는 `git status --short`로 변경 파일을 확인한다.

커밋에 포함할 수 있는 파일:

- 소스 코드
- 설정 파일
- lockfile
- 프로젝트 문서
- 산출물 관리 문서
- 테스트 코드

커밋에 포함하지 않는 파일:

- `node_modules`
- `.next`
- `.env.local`
- 로컬 로그 파일
- 개인 IDE 설정 파일

## 6. 커밋 전 검증

코드 변경이 포함된 경우 다음 명령을 우선 실행한다.

```bash
npm run lint
npm run build
```

문서 변경만 있는 경우에는 build가 필수는 아니지만, 설정 또는 의존성 변경이 포함되면 build를 실행한다.

검증 실패 상태는 커밋하지 않는 것을 원칙으로 한다.

## 7. Push 규칙

이 프로젝트에서는 push를 사용자가 직접 수행한다.

Codex는 사용자가 명시적으로 요청하지 않는 한 `git push`를 실행하지 않는다.

## 8. 현재 과제에서 권장 커밋 흐름

권장 커밋 흐름은 다음과 같다.

```txt
1. project setup
2. layout and global styles
3. city routing
4. graphql api
5. openweather service
6. apollo client integration
7. weather ui
8. qa and documentation
```

예상 커밋 메시지:

```txt
chore(project): initialize next 12 app and planning docs
feat(layout): add responsive page layout
feat(routing): add city pages
feat(graphql): add weather query api
feat(weather): render current and forecast weather
docs(readme): add setup and submission notes
```

