# Review Report

## 1. Next.js 12 프로젝트 초기화 리뷰

### 확인된 항목

- Create Next App을 사용하여 초기 프로젝트 골격을 생성했다.
- `package.json`의 `next` 버전을 `^12.3.4`로 고정했다.
- `react`와 `react-dom`은 `^18.2.0`을 사용한다.
- Next.js 12 Pages Router 기반의 `pages` 디렉터리가 생성되었다.
- `pages/_app.js`에서 전역 CSS를 import한다.
- `styles/Home.module.css`가 생성되어 Module CSS 사용 기반이 준비되었다.
- `styles/globals.css`가 생성되어 전역 스타일 진입점이 준비되었다.
- `public` 디렉터리가 생성되었다.
- `package.json`에 `dev`, `build`, `start`, `lint` script가 존재한다.
- 기존 문서인 `architecture-and-plan.md`, `code-conventions.md`, `subprocess-spec.md`는 보존되었다.

### 주의할 항목

- Create Next App 실행 직후에는 최신 `next`가 설치되었으므로, 과제 조건에 맞춰 `next@12.3.4`로 재설치했다.
- 현재 `pages/index.js`는 Create Next App 기본 화면이다. 다음 구현 단계에서 도시 선택 메인 페이지로 교체해야 한다.
- 현재 `pages/api/graphql.js`는 아직 없다. GraphQL 백엔드 구현 단계에서 추가해야 한다.
- 현재 Apollo Client와 GraphQL 관련 의존성은 아직 설치하지 않았다. 다음 GraphQL 구현 단계에서 추가한다.
- `npm install` 결과 취약점 경고가 표시되었다. 과제 요구 버전과 호환성 때문에 즉시 `npm audit fix --force`는 적용하지 않았다.

### 다음 단계 체크리스트

- Module CSS와 전역 스타일을 과제 레이아웃 기준에 맞게 정리한다.
- `components/layout/PageLayout.js`를 추가한다.
- `constants/cities.js`를 추가한다.
- `pages/index.js`를 도시 선택 메인 페이지로 변경한다.
- `pages/[city].js`를 추가하여 도시 상세 라우팅을 구현한다.

