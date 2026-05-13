# Next.js 12 프로젝트 초기화 학습 노트

## 1. Create Next App을 사용하는 이유

Create Next App은 Spring Initializr와 비슷하게 Next.js 프로젝트의 기본 골격을 자동으로 만들어주는 도구다.

직접 `package.json`, `pages`, `styles`, 설정 파일을 하나씩 만들 수도 있지만, Create Next App을 사용하면 다음 이점이 있다.

- Next.js 실행에 필요한 기본 의존성과 스크립트가 준비된다.
- `pages` 기반 라우팅 구조가 바로 생성된다.
- 개발 서버, 빌드, 운영 실행 명령이 표준 형태로 정리된다.
- 과제나 협업에서 표준 Next.js 구조로 시작했다는 설명이 가능하다.
- 초기 설정 실수보다 기능 구현에 집중할 수 있다.

이 과제는 Next.js 12를 명시하고 있으므로, Create Next App으로 생성한 뒤 `next` 버전을 `12.x`로 고정하는 확인 과정이 필요하다.

## 2. Next.js 12 Pages Router 초기 구조

Next.js 12는 기본적으로 `pages` 디렉터리 기반 라우팅을 사용한다.

대표 구조는 다음과 같다.

```txt
pages/
├─ _app.js
├─ index.js
└─ api/
```

각 파일의 의미는 다음과 같다.

- `pages/index.js`
  - `/` 경로에 해당하는 메인 페이지
  - 이 프로젝트에서는 도시 선택 화면 역할을 하게 된다.
- `pages/[city].js`
  - `/Seoul`, `/Tokyo`, `/Paris`, `/London` 같은 동적 경로를 처리할 예정이다.
- `pages/_app.js`
  - 모든 페이지를 감싸는 공통 진입점
  - 전역 CSS import와 Apollo Provider 설정 위치로 사용한다.
- `pages/api/*.js`
  - Next.js API Route
  - 이 프로젝트에서는 `pages/api/graphql.js`가 GraphQL 서버 역할을 하게 된다.

## 3. `package.json` scripts 의미

초기화된 Next.js 프로젝트의 주요 script는 다음과 같다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- `npm run dev`
  - 개발 서버 실행
  - 기본 주소는 `localhost:3000`
  - 코드 변경 시 자동 반영된다.
- `npm run build`
  - 운영 배포용 빌드 생성
  - 제출 전 컴파일 오류 확인에 중요하다.
- `npm run start`
  - 빌드된 결과물을 운영 모드로 실행한다.
- `npm run lint`
  - 코드 스타일과 잠재 오류를 검사한다.

## 4. Spring Boot 초기화와 비교

| 관점 | Spring Boot | Next.js 12 |
| --- | --- | --- |
| 초기화 도구 | Spring Initializr | Create Next App |
| 실행 단위 | JVM 애플리케이션 | Node.js 애플리케이션 |
| 의존성 파일 | `build.gradle`, `pom.xml` | `package.json` |
| 개발 실행 | `bootRun` | `next dev` |
| 운영 빌드 | jar/war 생성 | `.next` 빌드 결과 생성 |
| 라우팅 | Controller annotation | `pages` 파일 구조 |
| API 구현 | Controller, Service | `pages/api`, server modules |
| 환경 변수 | `application.yml`, env | `.env.local`, `process.env` |
| 정적 리소스 | `resources/static` | `public` |

핵심 차이는 Next.js가 파일 시스템 기반 라우팅을 사용한다는 점이다.

Spring에서는 URL을 annotation으로 선언하지만, Next.js 12에서는 `pages` 아래 파일 위치와 이름이 URL 구조가 된다.

## 5. 면접 예상 질문과 답변 포인트

### Q1. 왜 Create Next App으로 시작했나요?

표준 Next.js 프로젝트 구조를 빠르게 만들고, 개발 서버와 빌드 스크립트를 안정적으로 확보하기 위해 사용했다. Spring Initializr처럼 초기 설정 비용을 줄이고 기능 구현에 집중하기 위한 선택이다.

### Q2. Next.js 12에서 라우팅은 어떻게 동작하나요?

`pages` 디렉터리의 파일 구조가 URL 경로가 된다. 예를 들어 `pages/index.js`는 `/`, `pages/[city].js`는 `/Seoul` 같은 동적 경로를 처리한다.

### Q3. `pages/api`는 무엇인가요?

Next.js 안에서 서버 API를 만들 수 있는 영역이다. 이 프로젝트에서는 OpenWeather API key를 브라우저에 노출하지 않기 위해 `pages/api/graphql.js`에서 GraphQL API를 제공하고, 실제 외부 API 호출은 서버 쪽 service에서 처리할 예정이다.

### Q4. `npm run dev`, `build`, `start` 차이는 무엇인가요?

`dev`는 개발 서버 실행, `build`는 운영용 번들 생성, `start`는 빌드된 결과물을 운영 모드로 실행하는 명령이다. 제출 전에는 최소한 `build`가 성공하는지 확인해야 한다.

### Q5. Spring Boot와 비교했을 때 Next.js 초기 구조에서 가장 다른 점은 무엇인가요?

Spring Boot는 Controller annotation 중심이고, Next.js는 파일 시스템 기반 라우팅이다. 또한 Next.js는 같은 프로젝트 안에서 페이지 UI와 서버 API Route를 함께 관리할 수 있다.

### Q6. 왜 Next.js 12를 명시적으로 맞춰야 하나요?

과제 요구사항이 Next.js 12이기 때문이다. 현재 Create Next App 기본값은 더 최신 버전을 만들 수 있으므로, `package.json`에서 `next` 버전이 12인지 확인해야 한다.

