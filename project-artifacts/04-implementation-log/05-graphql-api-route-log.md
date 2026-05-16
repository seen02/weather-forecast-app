# 05. GraphQL API Route Implementation Log

## 변경 범위

Next.js API Route 기반 GraphQL endpoint를 구성했다.

## 추가한 파일

- `pages/api/graphql.js`
  - `/api/graphql` endpoint
  - `POST` 요청만 허용
  - GraphQL query 실행
- `server/graphql/schema.js`
  - `City` type
  - `supportedCities`, `city` query
- `server/graphql/resolvers.js`
  - `SUPPORTED_CITIES`와 `getCityByName`을 사용하는 resolver

## 수정한 파일

- `package.json`
  - `graphql` dependency 추가
- `package-lock.json`
  - dependency lock 갱신

## 삭제한 파일

- `pages/api/hello.js`
  - Create Next App 기본 API route 제거

## 구현 내용

- `POST /api/graphql`에서 GraphQL query를 처리한다.
- `GET /api/graphql`은 `405 Method Not Allowed`를 반환한다.
- `{ supportedCities { name countryCode path } }` query를 지원한다.
- `city(name: String!)` query를 지원한다.
- 외부 OpenWeather API 호출은 아직 하지 않는다.

## 다음 단계

OpenWeather service 구현 단계에서 `weatherByCity` query 또는 service 호출 resolver를 추가한다.

