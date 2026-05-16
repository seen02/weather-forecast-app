# 05. GraphQL API Route Review

## 리뷰 결과

이번 단계의 요구사항은 충족했다.

## 체크리스트

| 항목 | 결과 |
| --- | --- |
| `pages/api/graphql.js` 존재 | 통과 |
| `server/graphql/schema.js` 분리 | 통과 |
| `server/graphql/resolvers.js` 분리 | 통과 |
| `constants/cities.js` 재사용 | 통과 |
| `POST /api/graphql` 처리 | 통과 |
| 잘못된 method 405 처리 | 통과 |
| GraphQL error status 처리 | 통과 |
| `pages/api/hello.js` 제거 | 통과 |
| `npm run lint` | 통과 |
| `npm run build` | 통과 |
| API 수동 검증 쿼리 | 통과 |
| ES6, semicolon, named export 규칙 | 통과 |

## 주의사항

- 현재 GraphQL query는 `supportedCities`와 `city`만 제공한다.
- OpenWeather API 호출과 실제 날씨 데이터 query는 다음 단계에서 추가한다.
- `graphql` 패키지 설치 후 npm audit 경고가 남아 있지만, 현재 요구 버전 호환성을 깨는 `npm audit fix --force`는 적용하지 않았다.

