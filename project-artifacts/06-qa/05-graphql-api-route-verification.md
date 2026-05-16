# 05. GraphQL API Route Verification

## Date

2026-05-15

## Commands

```bash
npm run lint
npm run build
```

## Result

### `npm run lint`

결과: 성공

```txt
✔ No ESLint warnings or errors
```

### `npm run build`

결과: 성공

빌드 결과에서 `/api/graphql` route 생성을 확인했다.

```txt
λ /api/graphql
```

## Local API Check

개발 서버를 `http://localhost:3000`에서 실행하고 다음 요청을 확인했다.

### `supportedCities`

```graphql
{
  supportedCities {
    name
    countryCode
    path
  }
}
```

결과: `Seoul`, `Tokyo`, `Paris`, `London` 반환

### `city`

```graphql
query City($name: String!) {
  city(name: $name) {
    name
    countryCode
    path
  }
}
```

variables:

```json
{
  "name": "Seoul"
}
```

결과: `Seoul` city 반환

### Invalid Method

`GET /api/graphql`

결과: `405`

