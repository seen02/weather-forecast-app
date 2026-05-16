# Subprocess Specification

## 1. 목적

이 문서는 Weather Forecast App 과제를 진행할 때 사용할 subprocess를 정의한다.

여기서 subprocess는 실제 OS 프로세스가 아니라, 프로젝트를 안정적으로 수행하기 위한 역할 기반 작업 트랙을 의미한다.

이 프로젝트는 단순 구현 과제가 아니라 IT 기업 인턴십 실습형 과제이므로, 다음 목표를 함께 만족해야 한다.

- 과제 요구사항을 충족하는 동작 가능한 애플리케이션 구현
- 코드 품질과 구조에 대한 검토
- 구현 과정과 기술 선택 이유를 설명할 수 있는 기술 설명 자료 확보
- Next.js, Apollo, GraphQL 등 익숙하지 않은 JavaScript 생태계에 대한 학습 보조

## 2. 전체 Subprocess 구성

필수 subprocess:

1. Implementation Subprocess
2. Review & Report Subprocess
3. Learning Subprocess

추가 권장 subprocess:

4. Requirements Traceability Subprocess
5. QA & Verification Subprocess
6. Documentation Subprocess

## 3. Implementation Subprocess

### 역할

실제 프로젝트 코드를 작성하는 subprocess다.

Next.js 12 기반 애플리케이션을 만들고, GraphQL 백엔드, Apollo Client, OpenWeather API 연동, UI 컴포넌트, 반응형 레이아웃을 구현한다.

### 주요 책임

- Next.js 12 프로젝트 초기화
- `pages` 기반 라우팅 구현
- `/`, `/Seoul`, `/Tokyo`, `/Paris`, `/London` 경로 구현
- GraphQL API Route 구현
- OpenWeather Current Weather API 연동
- OpenWeather 3-hour Forecast 5 days API 연동
- Apollo Client 설정
- 현재 날씨 UI 구현
- 5일 예보 UI 구현
- Module CSS 기반 스타일링
- 코드 스플리팅 적용
- 환경 변수 설정 파일 예시 제공

### 입력

- `project-artifacts/00-project-management/project-guidelines/architecture-and-plan.md`
- `project-artifacts/00-project-management/project-guidelines/code-conventions.md`
- 과제 요구사항
- Figma 디자인 링크
- OpenWeather API key

### 출력

- 동작 가능한 Next.js 애플리케이션
- 모듈화된 소스 코드
- GraphQL API
- OpenWeather 연동 서비스
- 반응형 UI
- 구현 단계별 작업 로그

기본 저장 위치: `project-artifacts/04-implementation-log`

### 완료 기준

- `localhost:3000` 접속 시 메인 페이지가 표시된다.
- 메인 페이지의 도시 버튼 클릭 시 각 도시 상세 페이지로 이동한다.
- 각 상세 페이지에서 현재 날씨와 5일 예보가 표시된다.
- OpenWeather API key는 클라이언트에 노출되지 않는다.
- 과제의 반응형 조건을 만족한다.
- 앱 실행 방법이 README에 정리되어 있다.

## 4. Review & Report Subprocess

### 역할

구현 결과를 검토하고, 과제 제출 및 기술 설명에 필요한 보고 내용을 정리하는 subprocess다.

단순히 코드 스타일만 보는 것이 아니라 요구사항 충족 여부, 구조적 개선점, 검증 항목을 점검한다.

### 주요 책임

- 요구사항 충족 여부 점검
- 코드 구조 검토
- 컴포넌트 책임 분리 검토
- GraphQL schema와 resolver 구조 검토
- OpenWeather API key 보안 확인
- 반응형 레이아웃 검토
- 에러/로딩 상태 검토
- README 품질 검토
- 개선 필요 항목 정리
- 기술 선택 이유를 설명할 수 있는 구현 포인트 정리

### 입력

- 구현된 코드
- 과제 요구사항
- `project-artifacts/00-project-management/project-guidelines/code-conventions.md`
- 실행 결과
- 테스트 결과

### 출력

- 리뷰 결과
- 수정 필요 항목
- 제출 전 체크리스트
- 구현 요약 보고
- 기술 설명 설명 포인트

기본 저장 위치: `project-artifacts/05-review`

### 완료 기준

- 필수 요구사항별 충족 여부가 확인되어 있다.
- 설명 근거가 부족한 구현이 식별되어 있다.
- 제출 전에 고쳐야 할 항목과 시간이 부족하면 남겨도 되는 항목이 구분되어 있다.
- 구현 결과를 짧고 명확하게 설명할 수 있는 요약이 준비되어 있다.

## 5. Learning Subprocess

### 역할

기술 설명 학습 정보를 제공하는 subprocess다.

사용자는 Spring 백엔드와 DevOps 경험이 중심이고 Next.js, Apollo, GraphQL, JavaScript 생태계 경험이 부족하므로, 구현 중 등장하는 기술을 백엔드 개발자 관점에서 이해할 수 있도록 정리한다.

### 주요 책임

- Next.js 12의 기본 구조 설명
- Pages Router 개념 설명
- API Route가 백엔드 역할을 하는 방식 설명
- GraphQL이 REST와 다른 점 설명
- Apollo Client의 역할 설명
- Next.js에서 환경 변수를 다루는 방식 설명
- SSR, SSG, CSR 차이 설명
- Module CSS의 목적 설명
- 코드 스플리팅이 필요한 이유 설명
- OpenWeather API 연동 구조 설명
- 구현 코드에서 사용된 기본 JavaScript 문법 설명
  - 예: `const`, `import`, `export`, `default export`, `async`, `await`, arrow function, `map`, `find`, template literal, destructuring
  - 단, 문법 설명은 해당 단계 이해에 필요한 범위로 제한하고 과하게 길게 쓰지 않는다.
- 설명하는 개념이 실제 코드에 연결되는 경우 구체적인 파일 경로와 라인 번호를 표시
  - 예: `constants/cities.js:1`, `pages/[city].js:31`
- 기술 선택 이유와 구현 근거 정리

### 입력

- 구현 중인 코드
- 사용된 라이브러리
- 과제 요구사항
- Spring 백엔드/DevOps 배경

### 출력

- 학습 노트
- 기술 설명 정리
- Spring/DevOps 관점에서 비교 설명
- 구현 선택 이유 설명 자료
- 모르는 기술을 리서치하고 적용한 과정 정리
- 코드 라인 참조가 포함된 JavaScript 문법 설명

### 작성 기준

- 학습 노트는 길이보다 기술적으로 설명 가능한 핵심 이해를 우선한다.
- JavaScript 문법 설명은 해당 단계 코드에서 실제로 사용된 문법만 다룬다.
- 문법 설명은 짧은 정의, 실제 코드 위치, 이 프로젝트에서의 역할 순서로 정리한다.
- JavaScript 생태계에 처음 진입하는 학습 흐름을 고려해, 코드 리딩에 필요한 최소 문법은 생략하지 않는다.
- 특정 문법을 장황하게 설명하기보다, 해당 코드 흐름을 이해하는 데 필요한 정도로 짧게 짚는다.
- 문법을 설명하는 파트에서는 Spring Boot 환경과 비교해 이해할 수 있는 지점을 함께 정리한다.
- 파일 경로와 라인 번호는 가능한 한 실제 파일 기준으로 작성한다.
- 라인 번호가 구현 중 변경될 수 있으면 산출물 작성 시점의 기준임을 명시한다.
- 코드 전체를 길게 복사하지 말고 필요한 한두 줄만 짧게 인용하거나 요약한다.

기본 저장 위치: `project-artifacts/03-learning`

### 완료 기준

- 주요 기술 선택 이유를 설명할 수 있다.
- Next.js에서 프론트엔드와 백엔드를 함께 구현하는 방식을 설명할 수 있다.
- GraphQL API와 REST API의 차이를 말할 수 있다.
- Apollo Client가 왜 필요한지 설명할 수 있다.
- OpenWeather API key를 서버에서만 사용하는 이유를 설명할 수 있다.

## 6. Requirements Traceability Subprocess

### 역할

과제 요구사항과 구현 결과를 1:1로 연결하여 누락을 방지하는 subprocess다.

### 주요 책임

- 요구사항 목록화
- 구현 파일과 요구사항 연결
- 필수 구현 사항 충족 여부 추적
- 선택 구현 사항 진행 여부 추적
- 보완 필요 항목이 있을 경우 README에 명확히 기록

### 입력

- 과제 요구사항
- 구현된 소스 코드
- README

### 출력

- 요구사항 추적표
- 구현 완료/보완 필요 상태
- 제출 전 누락 체크리스트

기본 저장 위치: `project-artifacts/01-requirements`

### 완료 기준

- 모든 필수 요구사항이 구현 항목과 연결되어 있다.
- 보완 필요 항목이 숨겨지지 않고 명확히 기록되어 있다.
- 제출 전에 빠진 요구사항을 빠르게 확인할 수 있다.

## 7. QA & Verification Subprocess

### 역할

구현된 애플리케이션이 실제로 실행되고 과제 요구사항대로 동작하는지 검증하는 subprocess다.

### 주요 책임

- 로컬 실행 확인
- `localhost:3000` 접속 확인
- 도시별 상세 페이지 접근 확인
- GraphQL API 동작 확인
- OpenWeather API 연동 확인
- 로딩/에러 상태 확인
- 반응형 조건 확인
- Jest 테스트 실행
- 브라우저에서 주요 화면 확인

### 입력

- 구현된 애플리케이션
- `.env.local`
- 테스트 코드
- 브라우저 실행 결과

### 출력

- 검증 결과
- 실패 항목
- 수정 필요 사항
- 최종 실행 확인 로그

기본 저장 위치: `project-artifacts/06-qa`

### 완료 기준

- 앱이 로컬에서 실행된다.
- 필수 경로가 모두 접근 가능하다.
- 주요 API 요청이 정상 동작한다.
- 반응형 기준을 확인했다.
- 실행 또는 테스트 실패가 있을 경우 원인과 상태가 기록되어 있다.

## 8. Documentation Subprocess

### 역할

제출에 필요한 문서와 학습 과정을 정리하는 subprocess다.

Review & Report Subprocess가 검토와 보고 중심이라면, Documentation Subprocess는 실제 제출 문서 작성과 유지에 집중한다.

### 주요 책임

- README 작성
- 실행 방법 정리
- 환경 변수 설정 방법 정리
- 프로젝트 구조 설명
- 구현 과정 설명
- 리서치 내용 정리
- 완료/보완 항목 정리
- 학습 자료를 제출 가능한 형태로 정리

### 입력

- 구현 코드
- 실행 방법
- 학습 노트
- 리뷰 결과
- 요구사항 추적표

### 출력

- `README.md`
- 필요 시 추가 학습 문서
- 필요 시 구현 과정 문서

기본 저장 위치: `project-artifacts/07-submission`

### 완료 기준

- source repo checkout 후 실행 가능한 방법이 README에 명시되어 있다.
- OpenWeather API key 설정 방법이 명확하다.
- 구현된 기능과 보완 항목이 정리되어 있다.
- 기술 선택 이유와 구현 과정이 문서화되어 있다.

## 9. Subprocess 간 협업 흐름

권장 진행 순서는 다음과 같다.

```txt
Requirements Traceability
→ Learning
→ Implementation
→ QA & Verification
→ Review & Report
→ Documentation
```

실제 구현 중에는 다음처럼 반복한다.

```txt
작은 기능 구현
→ 해당 기술 학습 정리
→ 동작 검증
→ 요구사항 충족 여부 체크
→ 리뷰 포인트 기록
```

## 10. 산출물 관리 구조

프로젝트 진행 중 생성되는 산출물은 `project-artifacts` 디렉터리 아래에 정리한다.

소스 코드와 제출/학습/리뷰 자료를 분리하여, 구현 파일을 찾을 때와 기술 설명 자료를 찾을 때의 탐색 비용을 줄인다.

```txt
project-artifacts/
├─ 00-project-management/
├─ 01-requirements/
├─ 02-architecture/
├─ 03-learning/
├─ 04-implementation-log/
├─ 05-review/
├─ 06-qa/
├─ 07-submission/
└─ archive/
```

각 디렉터리의 목적:

- `00-project-management`
  - 단계별 진행 상태, 의사결정 로그, 작업 요약
- `01-requirements`
  - 요구사항 추적표, 제출 전 체크리스트
- `02-architecture`
  - 설계 변경 이력, API 설계, 레이아웃 설계 보조 문서
- `03-learning`
  - Learning Subprocess가 생성하는 기술 설명 학습 노트
- `04-implementation-log`
  - Implementation Subprocess가 생성하는 단계별 구현 로그
- `05-review`
  - Review & Report Subprocess가 생성하는 리뷰 보고서
- `06-qa`
  - QA & Verification Subprocess가 생성하는 실행, 빌드, 테스트, 브라우저 검증 결과
- `07-submission`
  - Documentation Subprocess가 생성하는 제출 요약, 기술 설명, 보완 항목 정리
- `archive`
  - 현재 기준에서는 사용하지 않지만 보존할 과거 산출물

프로젝트 기준 문서는 다음 위치에 둔다.

```txt
project-artifacts/00-project-management/project-guidelines/
```

- `architecture-and-plan.md`
  - 프로젝트 구조와 구현 계획
- `code-conventions.md`
  - 코드 작성 규칙
- `git-conventions.md`
  - Git 브랜치, 커밋, push 규칙
- `subprocess-spec.md`
  - 역할 기반 작업 트랙 정의

## 11. 산출물 파일 이름 규칙

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
technical-notes.md
```

한 단계에서 여러 subprocess가 산출물을 만들 경우 같은 단계 번호를 공유하고 역할을 파일명에 포함한다.

```txt
02-module-css-and-layout-learning.md
02-module-css-and-layout-review.md
02-module-css-and-layout-qa.md
```

