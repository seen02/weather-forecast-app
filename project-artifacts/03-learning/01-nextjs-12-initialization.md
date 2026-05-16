# 01. Next.js 12 프로젝트 초기화 학습 노트

이 문서는 프로젝트 초기화 단계에서 확인한 Next.js 12의 기본 구조와 실행 흐름을 정리한 학습 자료다. 코드 위치와 라인 번호는 현재 문서 작성 시점 기준이다.

## 학습 목표

- Next.js 12 프로젝트가 어떤 파일 구조로 동작하는지 이해한다.
- `pages` 디렉터리 기반 라우팅과 API Route의 역할을 구분한다.
- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm test`가 각각 어떤 상황에서 필요한지 이해한다.
- 이 프로젝트가 Next.js 위에서 React UI와 Node.js 기반 API를 함께 다루는 구조임을 설명할 수 있도록 정리한다.

## Next.js 12의 핵심 구조

Next.js는 React를 기반으로 한 프레임워크다. React는 화면을 컴포넌트 단위로 작성하는 라이브러리이고, Next.js는 그 위에 라우팅, 빌드, 서버 사이드 기능, API Route 같은 애플리케이션 구조를 제공한다.

이 프로젝트의 핵심 구조는 다음과 같다.

```txt
pages/
  index.js          메인 페이지
  [city].js         도시 상세 동적 라우트
  _app.js           모든 페이지 공통 App wrapper
  api/graphql.js    GraphQL API Route

components/
  city/             도시 선택 UI
  layout/           공통 레이아웃
  weather/          날씨 UI

server/
  graphql/          GraphQL schema, resolver
  services/         OpenWeather API 연동

graphql/
  client.js         Apollo Client 설정
  queries.js        프론트엔드 GraphQL query
```

Spring Boot에 비유하면 `pages/api/graphql.js`는 Controller에 가깝고, `server/services/openWeatherService.js`는 외부 API를 호출하는 Service 계층에 가깝다. 다만 Next.js에서는 같은 프로젝트 안에 화면 코드와 API 코드가 함께 존재한다.

## package.json 읽기

관련 파일: `package.json`

- 6행: `dev`는 개발 서버를 실행한다.
- 7행: `build`는 배포 가능한 Next.js 빌드를 만든다.
- 8행: `start`는 빌드된 결과를 실행한다.
- 9행: `lint`는 Next.js ESLint 검사를 실행한다.
- 10행: `test`는 Jest 테스트를 실행한다.
- 15행: `next` 버전이 `^12.3.4`로 지정되어 있어 과제 요구사항인 Next.js 12를 만족한다.
- 16-17행: Next.js 화면은 React와 React DOM 위에서 렌더링된다.

실행 명령의 의미는 다음처럼 구분할 수 있다.

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm test
```

개발 중에는 `npm run dev`를 사용하고, 제출 전에는 `npm run lint`, `npm run build`, `npm test`로 정적 검사와 빌드, 단위 테스트를 확인한다.

## pages 기반 라우팅

Next.js 12의 기본 라우팅은 `pages` 디렉터리의 파일 이름으로 결정된다.

- `pages/index.js`는 `/` 경로가 된다.
- `pages/[city].js`는 `/Seoul`, `/Tokyo`, `/Paris`, `/London` 같은 동적 경로가 된다.
- `pages/api/graphql.js`는 `/api/graphql` API endpoint가 된다.

이 구조는 Spring Boot에서 `@GetMapping("/")`, `@GetMapping("/{city}")`, `@PostMapping("/api/graphql")`처럼 경로를 명시하는 방식과 다르다. Next.js는 파일 위치가 곧 라우팅 규칙이 된다.

## _app.js의 역할

관련 파일: `pages/_app.js`

- 1행: Apollo Provider를 import한다.
- 2행: 프로젝트에서 사용할 Apollo Client를 가져온다.
- 3-4행: 전역 CSS 파일을 import한다.
- 6행: 모든 페이지를 감싸는 `MyApp` 컴포넌트를 정의한다.
- 8-10행: 모든 페이지 컴포넌트가 Apollo Client를 사용할 수 있도록 Provider로 감싼다.

`_app.js`는 모든 페이지의 공통 진입점이다. Spring Boot로 비유하면 모든 요청에 공통으로 적용되는 filter나 interceptor와 완전히 같지는 않지만, 페이지 렌더링 관점에서 공통 wrapper를 두는 위치라고 볼 수 있다.

## JavaScript 문법 포인트

### import / export

이 프로젝트는 ES Module 문법을 사용한다. 예를 들어 `pages/index.js` 1-4행은 다른 파일에서 컴포넌트, 상수, CSS Module을 가져온다.

```js
import CityButtonList from '../components/city/CityButtonList';
import { SUPPORTED_CITIES } from '../constants/cities';
```

중괄호가 있는 import는 파일에서 이름을 붙여 export한 값을 가져올 때 사용한다. 중괄호가 없는 import는 default export를 가져올 때 사용한다.

### 함수형 컴포넌트

`pages/index.js` 6행의 `Home`은 React 함수형 컴포넌트다.

```js
export default function Home() {
  return (...);
}
```

React 컴포넌트는 JSX를 반환하는 함수로 작성할 수 있다. Next.js의 페이지 파일에서 default export한 컴포넌트가 해당 경로의 페이지가 된다.

## 이 단계에서 확인한 기준

- Next.js 12가 설치되어 있다.
- React는 화면 구성에 사용된다.
- 프론트엔드 페이지와 백엔드 API Route가 같은 Next.js 프로젝트 안에 존재한다.
- 이후 단계에서 Module CSS, GraphQL, Apollo, OpenWeather service를 이 구조 위에 얹을 수 있다.

## 정리

이 프로젝트는 React만 사용한 프로젝트가 아니라 Next.js 12 프로젝트다. React는 UI를 구성하는 기반이고, Next.js는 라우팅, 빌드, API Route, 전체 애플리케이션 구조를 담당한다. 따라서 과제 요구사항인 “Next.js로 프론트엔드와 백엔드 구현”은 `pages` 페이지와 `pages/api/graphql.js` API Route를 함께 구현하는 방식으로 충족한다.
