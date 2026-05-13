# Project Artifacts

이 디렉터리는 소스 코드가 아니라 프로젝트 진행 중 생성되는 산출물을 단계별로 정리하는 공간이다.

구현 코드는 `pages`, `components`, `server`, `graphql`, `utils` 등에 두고, 학습 노트, 리뷰 결과, 검증 로그, 요구사항 추적표, 제출 준비 자료는 이 디렉터리에 보관한다.

## 디렉터리 구조

```txt
project-artifacts/
├─ 00-project-management/
│  └─ project-guidelines/
├─ 01-requirements/
├─ 02-architecture/
├─ 03-learning/
├─ 04-implementation-log/
├─ 05-review/
├─ 06-qa/
├─ 07-submission/
└─ archive/
```

## 분류 기준

### `00-project-management`

프로젝트 진행 상태, 단계별 작업 기록, 의사결정 로그를 보관한다.

예:

- `project-guidelines/architecture-and-plan.md`
- `project-guidelines/code-conventions.md`
- `project-guidelines/git-conventions.md`
- `project-guidelines/subprocess-spec.md`
- `phase-checklist.md`
- `decision-log.md`
- `progress-summary.md`

### `01-requirements`

과제 요구사항을 추적하고, 구현 완료 여부를 관리하는 문서를 보관한다.

예:

- `requirements-traceability.md`
- `acceptance-checklist.md`

### `02-architecture`

구조 설계, 기술 선택 이유, 주요 설계 변경 이력을 보관한다.

예:

- `architecture-review.md`
- `graphql-api-design.md`
- `responsive-layout-design.md`

### `03-learning`

면접 대비 학습 자료를 보관한다.

예:

- `01-nextjs-12-initialization.md`
- `02-module-css-and-layout.md`
- `03-graphql-api-route.md`
- `04-apollo-client.md`

### `04-implementation-log`

각 구현 단계에서 실제로 무엇을 변경했는지 정리한다.

예:

- `01-nextjs-12-initialization-log.md`
- `02-layout-implementation-log.md`
- `03-routing-implementation-log.md`

### `05-review`

Review & Report Subprocess가 생성하는 리뷰 결과를 보관한다.

예:

- `01-nextjs-12-initialization-review.md`
- `02-layout-review.md`
- `final-review-report.md`

### `06-qa`

실행 검증, 빌드 결과, 테스트 결과, 브라우저 확인 결과를 보관한다.

예:

- `lint-result.md`
- `build-result.md`
- `manual-verification.md`
- `responsive-check.md`

### `07-submission`

최종 제출을 위한 요약, README 초안, 미완료 기능 정리, 면접 설명 자료를 보관한다.

예:

- `submission-summary.md`
- `interview-qa.md`
- `known-limitations.md`

### `archive`

더 이상 현재 기준으로 사용하지 않지만, 기록 보존이 필요한 이전 산출물을 보관한다.

## 파일 이름 규칙

단계별 산출물은 정렬이 쉽도록 숫자 prefix를 사용한다.

```txt
01-nextjs-12-initialization.md
02-module-css-and-layout.md
03-city-routing.md
```

최종 산출물은 목적이 드러나는 이름을 사용한다.

```txt
final-review-report.md
submission-summary.md
interview-qa.md
```

## 운영 원칙

- 소스 코드는 이 디렉터리에 두지 않는다.
- 프로젝트 기준 문서는 `00-project-management/project-guidelines`에 둔다.
- 각 작업 단계가 끝날 때 관련 산출물을 이 디렉터리에 추가한다.
- 학습 자료는 `03-learning`에 둔다.
- 리뷰 결과는 `05-review`에 둔다.
- 검증 결과는 `06-qa`에 둔다.
- 제출에 직접 사용할 자료는 `07-submission`에 둔다.
