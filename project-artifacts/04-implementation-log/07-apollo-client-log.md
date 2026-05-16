# 07. Apollo Client Implementation Log

## 작업 범위

프론트엔드에서 GraphQL API를 직접 `fetch`하지 않고 Apollo Client를 통해 호출하도록 연결했다.

## 변경 파일

- `package.json`, `package-lock.json`
  - `@apollo/client`를 추가했다.
- `graphql/client.js`
  - Apollo Client instance를 생성했다.
  - GraphQL API endpoint는 `/api/graphql`로 설정했다.
- `graphql/queries.js`
  - `WEATHER_BY_CITY_QUERY`를 분리했다.
  - 상세 페이지가 필요한 현재 날씨와 예보 field를 정의했다.
- `pages/_app.js`
  - 전체 app을 `ApolloProvider`로 감쌌다.
- `pages/[city].js`
  - `useQuery`로 `weatherByCity` query를 실행한다.
  - `loading`, `error`, `data` 상태에 따라 상세 페이지의 현재 날씨/예보 영역을 렌더링한다.
- `styles/CityDetail.module.css`
  - loading/error/success 상태 표시를 위한 스타일을 추가했다.

## 설계 결정

Apollo 관련 코드는 프로젝트 guideline에 맞춰 `graphql` 디렉터리에 분리했다.

```txt
pages/_app.js
→ ApolloProvider
→ graphql/client.js
→ /api/graphql

pages/[city].js
→ useQuery(WEATHER_BY_CITY_QUERY)
→ graphql/queries.js
```

Apollo Client v4에서는 React provider/hook이 root package가 아니라 `@apollo/client/react`에서 제공되므로 다음 import를 사용했다.

```js
import { ApolloProvider } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
```

## 검증 결과

실행한 명령:

```powershell
npm ls @apollo/client graphql
npm run lint
npm run build
```

결과:

- `@apollo/client@4.1.9` 설치 확인
- `graphql@16.8.1` 확인
- `npm run lint`: 통과
- `npm run build`: 통과

로컬 API/Apollo 확인:

- `GET http://localhost:3000/Seoul`: `200`
- Apollo Client를 사용한 `weatherByCity(city: "Seoul")` query:
  - `CITY=Seoul`
  - `COUNTRY=KR`
  - `FORECAST_COUNT=40`

## 제한 사항

- 브라우저 화면 검증은 수동 확인 대상으로 정리했다.
- 대신 dev server HTTP 응답과 Apollo Client query 실행으로 런타임 연결을 검증했다.
- `npm install @apollo/client` 후 npm audit에서 2개 취약점이 보고되었다. `npm audit fix --force`는 과제 조건인 Next.js 12 버전을 변경할 수 있어 적용하지 않았다.

