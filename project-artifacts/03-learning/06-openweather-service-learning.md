# 06. OpenWeather Service 구현 학습 노트

이 문서는 OpenWeather API를 호출하는 service 계층을 어떻게 구성했는지 정리한 학습 자료다.

## 학습 목표

- 외부 API 호출 코드를 service 계층으로 분리하는 이유를 이해한다.
- 환경 변수로 API Key를 관리하는 방식을 이해한다.
- Current Weather API와 3-hour Forecast 5 days API를 함께 호출하는 흐름을 파악한다.
- OpenWeather 응답을 GraphQL schema에 맞는 형태로 변환하는 과정을 이해한다.

## service 계층을 둔 이유

관련 파일: `server/services/openWeatherService.js`

GraphQL resolver에서 직접 `fetch`를 호출할 수도 있지만, 이 프로젝트에서는 OpenWeather 연동 코드를 service 파일로 분리했다.

분리한 이유는 다음과 같다.

- GraphQL resolver는 어떤 데이터를 반환할지만 담당한다.
- 외부 API URL 구성, API Key 주입, 응답 변환은 service가 담당한다.
- OpenWeather 응답 구조가 바뀌어도 수정 범위를 service로 좁힐 수 있다.
- 테스트나 유지보수 시 API 호출 로직을 독립적으로 읽을 수 있다.

Spring Boot에서 Controller가 외부 API를 직접 호출하지 않고 Service 클래스를 호출하는 구조와 비슷하다.

## API 기본 설정

관련 파일: `server/services/openWeatherService.js` 3-5행

```js
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_UNITS = 'metric';
```

OpenWeather API는 같은 base URL 아래에서 `/weather`, `/forecast` path를 사용한다. `units=metric`을 사용하면 섭씨 단위로 온도를 받을 수 있다.

## API Key 관리

관련 파일: `server/services/openWeatherService.js` 7-15행

```js
const getApiKey = () => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY is required');
  }

  return apiKey;
};
```

API Key는 `.env.local`의 `OPENWEATHER_API_KEY`에서 읽는다. 이 코드는 서버 영역에서 실행되므로 브라우저 번들에 API Key가 포함되지 않는다.

Next.js에서 브라우저에 노출할 환경 변수는 일반적으로 `NEXT_PUBLIC_` 접두사를 사용한다. 이 프로젝트의 API Key는 서버에서만 사용해야 하므로 `OPENWEATHER_API_KEY`로 유지한다.

## 요청 URL 만들기

관련 파일: `server/services/openWeatherService.js` 17-30행

`buildRequestUrl`은 path와 params를 받아 OpenWeather 요청 URL을 만든다.

- 18행: base URL과 path로 `URL` 객체를 만든다.
- 20-25행: 전달받은 params와 공통 파라미터를 합친다.
- 22행: API Key를 appid로 넣는다.
- 23-24행: 언어와 단위를 넣는다.
- 25-27행: query string에 값을 설정한다.
- 29행: 완성된 URL 문자열을 반환한다.

`Object.entries`는 객체를 `[key, value]` 배열로 바꾸는 문법이다. 여기에 `forEach`를 사용해 각 파라미터를 query string에 넣는다.

## OpenWeather 요청 공통 함수

관련 파일: `server/services/openWeatherService.js` 40-50행

```js
const requestOpenWeather = async (path, params) => {
  const response = await fetch(buildRequestUrl(path, params));
  const data = await parseResponseBody(response);

  if (!response.ok) {
    const message = data?.message || `status ${response.status}`;
    throw new Error(`OpenWeather request failed: ${message}`);
  }

  return data;
};
```

이 함수는 실제 HTTP 요청을 수행한다. `fetch` 결과에서 JSON body를 읽고, HTTP status가 성공이 아니면 에러를 던진다. 이렇게 공통화하면 `/weather`, `/forecast` 요청에서 같은 에러 처리 방식을 사용할 수 있다.

## 도시 좌표 사용

관련 파일: `server/services/openWeatherService.js` 52-57행

```js
const getLocationParams = (city) => {
  return {
    lat: city.coordinates.latitude,
    lon: city.coordinates.longitude,
  };
};
```

OpenWeather는 도시명으로도 요청할 수 있지만, 이 프로젝트는 `constants/cities.js`에 저장된 좌표를 사용한다. 도시명 문자열보다 좌표가 명확하고, 지원 도시 목록과 요청 기준을 일치시킬 수 있다.

## 응답 데이터 변환

관련 파일: `server/services/openWeatherService.js`

Current Weather 응답은 `mapCurrentWeather`에서 변환한다.

- 67행: 현재 날씨 변환 함수 시작
- 68행: weather 배열의 첫 번째 값을 대표 날씨로 사용
- 71행: 온도
- 72행: 체감 온도
- 73행: 습도
- 74행: 풍속
- 75행: 설명
- 76행: 아이콘 코드
- 77행: 측정 시간

Forecast 응답은 `mapForecastWeather`에서 변환한다.

- 81행: 예보 변환 함수 시작
- 85행: 예보 시간
- 86행: 온도
- 87행: 습도
- 88행: 풍속
- 89행: 설명
- 90행: 아이콘 코드

이 변환 과정은 외부 API 응답을 프로젝트 내부 데이터 형태로 바꾸는 adapter 역할을 한다.

## Current와 Forecast 병렬 호출

관련 파일: `server/services/openWeatherService.js` 94-113행

`getWeatherByCity`는 이 service의 공개 함수다.

- 95행: 도시 이름으로 지원 도시를 조회한다.
- 97-99행: 지원하지 않는 도시는 에러를 던진다.
- 101행: 위도/경도 파라미터를 만든다.
- 102-105행: current와 forecast 요청을 `Promise.all`로 병렬 실행한다.
- 107-112행: GraphQL schema에 맞는 객체로 반환한다.

`Promise.all`을 사용한 이유는 현재 날씨와 예보 요청이 서로 의존하지 않기 때문이다. 두 요청을 순서대로 기다리는 것보다 동시에 시작하는 편이 효율적이다.

## JavaScript 문법 포인트

### spread syntax

`buildRequestUrl` 20-25행에서 `...params`를 사용한다.

```js
Object.entries({
  ...params,
  appid: getApiKey(),
  lang: DEFAULT_LANGUAGE,
  units: DEFAULT_UNITS,
})
```

spread syntax는 객체의 속성을 다른 객체 안으로 펼쳐 넣는다. 여기서는 도시 좌표와 공통 파라미터를 하나의 객체로 합친다.

### optional chaining과 fallback

`requestOpenWeather` 45행:

```js
const message = data?.message || `status ${response.status}`;
```

`data`가 null일 수 있으므로 `?.`로 안전하게 접근한다. 메시지가 없으면 HTTP status를 fallback으로 사용한다.

### 배열 첫 요소 접근

`getPrimaryWeather` 59-61행:

```js
const getPrimaryWeather = (weatherList) => {
  return weatherList?.[0] || {};
};
```

배열이 없거나 비어 있을 수 있으므로 optional chaining과 빈 객체 fallback을 함께 사용한다.

## 정리

OpenWeather service는 외부 API 호출의 복잡도를 GraphQL resolver 밖으로 분리한다. API Key 관리, 요청 URL 구성, 응답 파싱, 에러 처리, 데이터 변환을 service에서 담당하기 때문에 프론트엔드와 GraphQL 계층은 OpenWeather의 세부 응답 구조를 직접 알 필요가 없다.
