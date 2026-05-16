# 06. OpenWeather Service Implementation Log

## 작업 범위

OpenWeather Current Weather API와 5 Day / 3 Hour Forecast API를 호출하는 서버 전용 service 계층을 추가하고, GraphQL `weatherByCity` query에서 사용할 수 있도록 연결했다.

## 변경 파일

- `constants/cities.js`
  - 지원 도시별 좌표를 추가했다.
  - OpenWeather 공식 문서가 좌표 기반 호출을 안내하고, built-in city name geocoder는 deprecated로 안내하므로 `lat`, `lon` 기반 호출을 사용한다.
- `server/services/openWeatherService.js`
  - OpenWeather API key 조회, URL 생성, HTTP 요청, 응답 매핑을 담당하는 service를 추가했다.
  - API key는 `process.env.OPENWEATHER_API_KEY`에서만 읽는다.
  - `/weather`, `/forecast`를 병렬로 호출한다.
- `server/graphql/schema.js`
  - `CurrentWeather`, `ForecastWeather`, `WeatherByCity` type을 추가했다.
  - `weatherByCity(city: String!): WeatherByCity!` query를 추가했다.
- `server/graphql/resolvers.js`
  - `weatherByCity` resolver를 추가하고 service 계층에 위임했다.
- `pages/api/graphql.js`
  - Next.js 12 dev API route에서 `graphql` package root import가 런타임 오류를 내지 않도록 ESM entrypoint인 `graphql/index.mjs`에서 import했다.
- `.env.local.example`
  - `OPENWEATHER_API_KEY` 설정 예시를 추가했다.

## 설계 결정

OpenWeather API 호출은 브라우저가 아니라 Next.js API Route 뒤쪽의 service 계층에서만 수행한다.

```txt
Browser
→ POST /api/graphql
→ pages/api/graphql.js
→ server/graphql/resolvers.js
→ server/services/openWeatherService.js
→ OpenWeather API
```

이 구조를 선택한 이유는 다음과 같다.

- API key가 클라이언트 번들에 포함되지 않는다.
- GraphQL resolver는 thin layer로 유지한다.
- 외부 API 응답 구조 변경 시 service 계층만 수정하면 된다.
- 현재 날씨와 예보 응답을 프론트엔드가 쓰기 쉬운 구조로 변환할 수 있다.

## OpenWeather API 기준

- Current Weather API: `https://api.openweathermap.org/data/2.5/weather`
- 5 Day / 3 Hour Forecast API: `https://api.openweathermap.org/data/2.5/forecast`
- 공통 파라미터: `lat`, `lon`, `appid`, `units`, `lang`
- `units=metric`, `lang=en`으로 고정했다.

## 검증 결과

실행한 명령:

```powershell
npm run lint
npm run build
```

결과:

- `npm run lint`: 통과
- `npm run build`: 통과

GraphQL API 검증:

- `POST /api/graphql` with `supportedCities`: `200`
- `GET /api/graphql`: `405`
- `weatherByCity(city: "Seoul")` with no `OPENWEATHER_API_KEY`: `400`, `OPENWEATHER_API_KEY is required`
- `weatherByCity(city: "Berlin")`: `400`, `Unsupported city: Berlin`

실제 OpenWeather 성공 응답은 `.env.local`에 유효한 API key를 설정한 뒤 확인해야 한다.

