# 03. City List Constants Implementation Log

## 변경 범위

지원 도시 목록을 중앙에서 관리하는 상수 모듈을 추가했다.

## 추가한 파일

- `constants/cities.js`
  - `SUPPORTED_CITIES`
  - `SUPPORTED_CITY_NAMES`
  - `getCityByName`
  - `isSupportedCity`

## 수정한 파일

- `pages/index.js`
  - 하드코딩된 도시 문자열을 제거했다.
  - `SUPPORTED_CITIES`를 참조해 메인 페이지의 도시명을 표시하도록 변경했다.

## 설계 기준

- 상수와 유틸 함수는 `named export`를 사용했다.
- 도시별 `id`, `name`, `displayName`, `countryCode`, `path`를 한 객체에서 관리한다.
- 이후 라우팅, GraphQL, OpenWeather API 구현에서 같은 도시 기준을 재사용할 수 있게 했다.

## 다음 단계

다음 단계에서는 메인 페이지와 도시 상세 라우팅을 구현하며, 도시 버튼/링크에서 `SUPPORTED_CITIES`와 `city.path`를 사용한다.

