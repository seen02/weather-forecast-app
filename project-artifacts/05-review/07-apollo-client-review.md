# 07. Apollo Client Review

## Findings

No blocking code-level issues found in the Apollo Client integration.

## Review Notes

| Area | Result | Notes |
| --- | --- | --- |
| Apollo dependency | Pass | `@apollo/client@4.1.9`가 `package.json`과 `package-lock.json`에 추가되었다. |
| ApolloProvider placement | Pass | `pages/_app.js:8`-`10`에서 전체 app을 `ApolloProvider`로 감싼다. |
| Client separation | Pass | `graphql/client.js:3`-`8`에서 Apollo Client 설정을 분리했다. |
| Query separation | Pass | `graphql/queries.js:3`-`27`에서 `WEATHER_BY_CITY_QUERY`를 별도 관리한다. |
| Page useQuery usage | Pass | `pages/[city].js:8`-`12`에서 city variable로 `weatherByCity`를 호출한다. |
| Loading/error handling | Pass | `pages/[city].js:29`-`30`, `pages/[city].js:55`-`56`에서 loading/error 상태를 분기한다. |
| API key exposure | Pass | Apollo Client는 `/api/graphql`만 호출하며 OpenWeather key를 직접 다루지 않는다. |
| Styling | Pass | 기존 Module CSS 파일에 상태 표시 스타일을 추가했다. |

## Verification

실행한 명령:

```powershell
npm ls @apollo/client graphql
npm run lint
npm run build
```

결과:

- dependency 확인 통과
- lint 통과
- build 통과

추가 런타임 확인:

- `GET /Seoul`: HTTP `200`
- Apollo Client query로 `weatherByCity(city: "Seoul")` 실행:
  - `CITY=Seoul`
  - `COUNTRY=KR`
  - `FORECAST_COUNT=40`

## Residual Risk

- 브라우저 화면 스크린샷 검증은 수동 확인 대상으로 정리했다.
- 사용자는 브라우저에서 `/Seoul`, `/Tokyo`, `/Paris`, `/London`을 직접 열어 loading/error/success 상태를 확인해야 한다.
- npm audit에서 2개 취약점이 보고되었지만, 강제 수정은 Next.js 12 조건을 깨뜨릴 수 있어 적용하지 않았다.

