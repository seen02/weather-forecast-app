# 06. OpenWeather Service Review

## Findings

No blocking code-level issues found in the OpenWeather service integration.

## Review Notes

| Area | Result | Notes |
| --- | --- | --- |
| Architecture | Pass | OpenWeather 호출은 `server/services/openWeatherService.js`에 분리했고, resolver는 `server/graphql/resolvers.js:11`-`13`에서 service 호출만 담당한다. |
| API key handling | Pass | API key는 `server/services/openWeatherService.js:8`에서 서버 환경 변수로만 읽는다. `NEXT_PUBLIC_` 환경 변수는 사용하지 않는다. |
| OpenWeather endpoints | Pass | `server/services/openWeatherService.js:103`-`104`에서 `/weather`, `/forecast` endpoint를 사용한다. |
| GraphQL schema | Pass | `server/graphql/schema.js:12`-`41`에 현재 날씨, 예보, `weatherByCity` query가 추가되었다. |
| Unsupported city handling | Pass | `server/services/openWeatherService.js:97`-`99`에서 지원하지 않는 도시는 외부 API 호출 전에 차단한다. |
| Missing key handling | Pass | `server/services/openWeatherService.js:10`-`12`에서 누락된 API key를 명확한 에러로 처리한다. |
| Next.js 12 runtime | Pass | `graphql` package는 API route dev runtime 호환을 위해 ESM entrypoint인 `graphql/index.mjs`에서 import한다. `pages/api/graphql.js:1`, `server/graphql/schema.js:1`에서 확인할 수 있다. |
| Env example | Pass | `.env.local.example`에 `OPENWEATHER_API_KEY` 예시를 추가했다. |

## Verification

실행한 명령:

```powershell
npm run lint
npm run build
```

결과:

- lint 통과
- build 통과
- build 통과

API 수동 검증:

- `supportedCities` query: `200`
- GET `/api/graphql`: `405`
- API key 없는 `weatherByCity(city: "Seoul")`: `400`
- 미지원 도시 `weatherByCity(city: "Berlin")`: `400`

실제 OpenWeather 성공 응답은 유효한 `.env.local` 설정 후 추가 확인이 필요하다.

