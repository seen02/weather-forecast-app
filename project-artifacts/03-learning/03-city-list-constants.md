# 03. 도시 목록 상수 정의 학습 노트

이 문서는 지원 도시 정보를 상수로 분리한 이유와, 이 상수가 라우팅, UI, API 요청에서 어떻게 재사용되는지 정리한 학습 자료다.

## 학습 목표

- 하드코딩을 줄이기 위해 도메인 데이터를 상수 파일로 분리하는 이유를 이해한다.
- 도시 목록이 메인 페이지, 상세 페이지, GraphQL resolver에서 함께 사용되는 흐름을 파악한다.
- 배열 메서드 `map`, `find`와 Boolean 변환을 코드 기준으로 이해한다.

## 도시 상수의 역할

관련 파일: `constants/cities.js`

`SUPPORTED_CITIES`는 이 프로젝트에서 지원하는 도시 목록의 기준 데이터다. 1-50행에 Seoul, Tokyo, Paris, London의 정보가 들어 있다.

각 도시 객체는 다음 정보를 가진다.

- `id`: React list key와 내부 식별용 값
- `name`: 라우팅과 API 요청에 사용하는 도시 이름
- `displayName`: 화면에 보여줄 이름
- `countryCode`: 현재 날씨 카드에 표시할 국가 코드
- `population`: Figma 시안에 맞춰 현재 날씨 카드에 표시할 인구수
- `path`: Next.js Link가 이동할 경로
- `coordinates`: OpenWeather API 요청에 사용할 위도/경도

이렇게 한 곳에 모아두면 도시가 추가될 때 여러 파일을 각각 수정하는 대신 `SUPPORTED_CITIES`에 객체를 추가하고 관련 UI가 자동으로 반영되도록 만들 수 있다.

## 메인 페이지에서 사용하는 흐름

관련 파일: `pages/index.js`, `components/city/CityButtonList.js`, `components/city/CityButton.js`

- `pages/index.js` 3행에서 `SUPPORTED_CITIES`를 import한다.
- `pages/index.js` 21행에서 `CityButtonList`에 cities props로 전달한다.
- `CityButtonList.js` 7-10행에서 `cities.map`으로 도시 목록을 버튼 리스트로 변환한다.
- `CityButton.js` 6-10행에서 `city.path`를 Next.js `Link`의 href로 사용한다.

흐름은 다음과 같다.

```txt
SUPPORTED_CITIES
→ Home
→ CityButtonList
→ CityButton
→ Link href="/Seoul"
```

## 상세 페이지 라우팅에서 사용하는 흐름

관련 파일: `pages/[city].js`

- 5행에서 `getCityByName`, `SUPPORTED_CITIES`를 import한다.
- 63-72행의 `getStaticPaths`는 `SUPPORTED_CITIES.map`으로 정적 생성 대상 경로를 만든다.
- 74-88행의 `getStaticProps`는 URL 파라미터로 받은 도시 이름을 `getCityByName`으로 조회한다.
- 지원하지 않는 도시이면 77-81행에서 `notFound: true`를 반환한다.

즉 `SUPPORTED_CITIES`는 단순히 버튼을 그리기 위한 데이터가 아니라, 어떤 상세 페이지를 만들 것인지 결정하는 기준이기도 하다.

## GraphQL resolver에서 사용하는 흐름

관련 파일: `server/graphql/resolvers.js`

- 1행에서 `getCityByName`, `SUPPORTED_CITIES`를 import한다.
- 5-7행의 `supportedCities` resolver는 전체 도시 목록을 반환한다.
- 8-10행의 `city` resolver는 이름으로 특정 도시를 찾는다.
- 11-13행의 `weatherByCity` resolver는 도시명을 기반으로 OpenWeather service를 호출한다.

이 구조에서는 프론트엔드, 라우팅, 백엔드 resolver가 같은 기준 데이터를 공유한다. 같은 도시 목록을 여러 곳에 따로 적지 않기 때문에 불일치 가능성이 줄어든다.

## JavaScript 문법 포인트

### 배열 map

`constants/cities.js` 52행:

```js
export const SUPPORTED_CITY_NAMES = SUPPORTED_CITIES.map((city) => city.name);
```

`map`은 배열의 각 요소를 다른 값으로 변환해 새 배열을 만든다. 여기서는 도시 객체 배열을 도시 이름 배열로 바꾼다.

### 배열 find

`constants/cities.js` 54-56행:

```js
export const getCityByName = (cityName) => {
  return SUPPORTED_CITIES.find((city) => city.name === cityName);
};
```

`find`는 조건에 맞는 첫 번째 요소를 반환한다. 조건에 맞는 도시가 없으면 `undefined`를 반환한다.

### Boolean 변환

`constants/cities.js` 58-60행:

```js
export const isSupportedCity = (cityName) => {
  return Boolean(getCityByName(cityName));
};
```

`Boolean(value)`는 값을 명시적으로 true/false로 바꾼다. 도시를 찾으면 true, 찾지 못하면 false가 된다.

## 테스트에서 확인한 내용

관련 파일: `__tests__/constants/cities.test.js`

- 10-18행: 지원 도시 이름과 경로가 요구사항과 일치하는지 확인한다.
- 20-26행: `getCityByName('Seoul')`이 올바른 도시 객체를 반환하는지 확인한다.
- 28-31행: 지원 도시와 미지원 도시를 구분하는지 확인한다.

## 정리

도시 목록을 상수로 분리한 것은 작은 작업처럼 보이지만, 전체 프로젝트 구조에서는 중요한 기준점이다. 이 파일 하나가 메인 페이지 버튼, 동적 라우팅, API resolver, 테스트의 기준 데이터가 된다. 따라서 이후 기능이 늘어나도 도시 정보 변경 범위를 좁게 유지할 수 있다.
