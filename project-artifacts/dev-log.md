# 과제 수행 중 기술 학습 및 구현 과정

본 문서는 이번 과제를 수행하며 처음 접한 기술 스택을 어떻게 리서치하고 학습했는지, 그리고 그 학습 과정을 실제 구현으로 연결하기 위해 어떤 방식으로 개발 과정을 관리했는지 정리한 자료입니다.

> 핵심은 Codex subprocess를 구현·리뷰·학습 역할로 나누어 단계별 개발 파이프라인을 만들고, Gemini와 NotebookLM으로 Next.js 12·GraphQL·Apollo 개념을 보완 검증한 뒤, 각 단계 결과를 `lint`·`build`·`test`로 확인하며 실제 코드에 반영한 것입니다.

## 1. 기술 스택 및 과제 접근 방식

- **Front-end & API 신규 학습 영역**
  - Next.js 12
  - GraphQL
  - Apollo Client
  - OpenWeather API
- **학습 및 개발 보조 도구**
  - Codex
  - Gemini
  - NotebookLM

이번 과제에서 요구된 핵심 기술 스택은 대부분 처음 다뤄보는 기술이었습니다. 따라서 단순히 완성된 코드를 만드는 것보다, 각 기술이 프로젝트 안에서 어떤 역할을 하는지 이해하고 설명할 수 있는 상태로 만드는 것이 중요했습니다.

이를 위해 구현 단계를 작게 나누고, 각 단계마다 설계, 구현, 리뷰, 검증, 학습 정리를 반복하는 방식으로 진행했습니다. 이 과정에서 Codex를 단순 코드 생성 도구가 아니라, 단계별 구현과 학습을 함께 관리하는 보조 도구로 활용했습니다.

## 2. 개발 및 문서화 파이프라인 구축

처음부터 기능 구현을 진행하면 모르는 기술을 사용하는 과정에서 판단 근거가 불분명해 질 수 있다고 생각했습니다. 그래서 프로젝트 시작 전에 기준 문서를 먼저 만들고, 이후 단계별 산출물을 쌓아가는 방식으로 진행했습니다.

### 2.1. 기준 문서 설정

개발을 시작하기 전, 프로젝트 방향과 코드 작성 기준을 유지하기 위해 다음 문서를 작성했습니다.

1. **아키텍처 및 구현 계획**
   - `project-artifacts/00-project-management/project-guidelines/architecture-and-plan.md`
   - 프로젝트 구조, 데이터 흐름, GraphQL API 설계, 반응형 기준, 코드 스플리팅 전략 정리
2. **코드 컨벤션**
   - `project-artifacts/00-project-management/project-guidelines/code-conventions.md`
   - ES6 문법, React 컴포넌트 작성 방식, CSS Module, GraphQL 코드 분리 기준 정리
3. **Git 컨벤션**
   - `project-artifacts/00-project-management/project-guidelines/git-conventions.md`
   - 브랜치, 커밋 메시지, PR, CI 기준 정리
4. **Subprocess 명세**
   - `project-artifacts/00-project-management/project-guidelines/subprocess-spec.md`
   - 구현, 리뷰, 학습 역할을 분리해 진행하기 위한 기준 정리

이 기준 문서들은 이후 구현 과정에서 “어디에 어떤 코드를 둘 것인지”, “왜 이 구조를 선택했는지”를 판단하는 기준으로 사용했습니다.

### 2.2. 단계별 문서화 흐름

각 구현 단계가 끝날 때마다 구현 로그, 리뷰 기록, QA 기록, 학습 노트를 남겼습니다.

```txt
Architecture
→ Implementation Log
→ Review
→ QA
→ Study Docs
```

이 흐름을 통해 코드 변경 내역뿐 아니라, 해당 변경을 왜 했는지와 어떤 방식으로 검증했는지를 함께 추적할 수 있었습니다.

## 3. Codex 활용 방식

이번 과제에서 Codex는 단순히 코드를 작성하는 도구가 아니라, 학습과 구현을 병행하기 위한 작업 보조 도구로 활용했습니다.

특히 Codex의 subprocess를 활용해 구현, 리뷰, 학습 역할을 분리했습니다. 구현 subprocess는 실제 코드 변경에 집중하고, 리뷰 subprocess는 변경 후 검토 포인트와 검증 항목을 점검하며, 학습 subprocess는 새로 사용한 기술과 JavaScript 문법을 정리하는 방식으로 사용했습니다.

### 3.1. 구현 단위 분리

과제 전체를 한 번에 구현하지 않고, 다음처럼 작은 단계로 나누어 진행했습니다.

- Next.js 12 프로젝트 초기화
- Module CSS와 레이아웃 wrapper 구성
- 도시 목록 상수 정의
- 메인 페이지와 도시 상세 라우팅 구현
- GraphQL API Route 구성
- OpenWeather service 구현
- Apollo Client 연결
- 현재 날씨 UI 구현
- 5일 예보 UI 구현
- Figma 디자인 적용
- 코드 스플리팅 적용
- Jest 테스트 추가

각 단계마다 Codex에 전체 요구사항과 프로젝트 기준 문서를 함께 참조하도록 요청했습니다. 이렇게 해서 매번 새로운 방식으로 구현이 변경되지 않고, 기존 구조에 맞춰 이어서 작업할 수 있었습니다.

### 3.2. 역할 분리

초기 구현 단계에서는 Codex를 다음 역할로 나누어 활용했습니다.

- **Implementation 역할**
  - 실제 코드 작성과 파일 수정
  - 기존 프로젝트 구조에 맞는 구현 방식 제안
- **Review 역할**
  - 변경 사항의 검토 포인트 확인
  - 누락된 검증 항목 점검
- **Learning 역할**
  - 새로 사용한 기술 개념 정리
  - 코드 라인 기준 설명
  - 기초 JavaScript 문법 보충

### 3.3. 검증 중심 활용

Codex가 제안한 코드라도 그대로 신뢰하지 않고, 항상 로컬 검증을 함께 진행했습니다.

주로 사용한 검증 명령은 다음과 같습니다.

```bash
npm run lint
npm run build
npm test
```

또한 GraphQL 요청은 PowerShell에서 직접 `/api/graphql`로 POST 요청을 보내며 확인했고, 브라우저에서는 `/`, `/Seoul`, `/Tokyo`, `/Paris`, `/London` 경로를 직접 확인했습니다.

## 4. 신규 기술 리서치 및 학습 전략

처음 접하는 기술을 단순히 복사해서 사용하는 것을 피하고, 프로젝트 안에서 어떤 역할을 하는지 파악할 수 있도록 학습했습니다.

### 4.1. Study Docs를 활용한 기초 학습

각 단계의 마지막에는 Study Docs를 작성했습니다. 이 문서에는 단순 작업 결과가 아니라 다음 내용을 포함했습니다.

- 적용한 기술의 기본 개념
- 해당 기술을 이 프로젝트에서 사용한 이유
- 실제 코드 파일과 주요 라인
- JavaScript/React 문법 포인트
- Spring 백엔드 관점에서 비교해 이해한 내용

예를 들어 GraphQL 단계에서는 schema, resolver, service 계층을 Spring의 controller, service, DTO 변환 흐름과 비교해 이해했습니다.

![Study Docs 링크](./03-learning)

### 4.2. Gemini를 활용한 심층 개념 보완

Study Docs만으로 이해가 부족한 부분은 Gemini를 활용해 추가 설명을 확인했습니다.

주로 다음 내용을 질문했습니다.

- GraphQL 요청 구조와 REST API와의 차이
- Apollo Client의 `useQuery` 동작 방식
- Next.js API Route와 Spring Controller의 차이
- JavaScript의 `async/await`, `export`, `default export`, `map`, `reduce`

이 과정은 구현된 코드를 이해할 때 도움이 되었습니다.

### 4.3. NotebookLM 및 RAG를 활용한 교차 검증

AI 도구를 활용할 때 가장 조심한 부분은 버전 불일치와 잘못된 코드 제안이었습니다. 이를 줄이기 위해 NotebookLM에 공식 문서와 참고 자료를 넣고, 필요한 개념을 다시 확인했습니다.

대표적인 확인 기준은 다음과 같았습니다.

- Next.js 12에서 사용할 수 있는 방식인가?
- 현재 프로젝트 구조와 맞는가?
- deprecated된 방식은 아닌가?
- 공식 문서의 설명과 충돌하지 않는가?

