# 04. City Routing Implementation Log

## 변경 범위

메인 페이지의 도시 선택 UI와 도시 상세 동적 라우팅을 구현했다.

## 추가한 파일

- `components/city/CityButton.js`
- `components/city/CityButton.module.css`
- `components/city/CityButtonList.js`
- `components/city/CityButtonList.module.css`
- `pages/[city].js`
- `styles/CityDetail.module.css`

## 수정한 파일

- `pages/index.js`
  - `SUPPORTED_CITIES` 기반으로 도시 링크 목록을 렌더링하도록 변경
- `styles/Home.module.css`
  - 도시 목록 영역과 맞도록 intro spacing 조정

## 구현 내용

- `/`에서 `Seoul`, `Tokyo`, `Paris`, `London` 도시 링크를 표시한다.
- 각 링크는 `city.path`를 사용한다.
- `/Seoul`, `/Tokyo`, `/Paris`, `/London` 상세 페이지를 `pages/[city].js`에서 처리한다.
- `getStaticPaths`로 지원 도시 경로를 정적 생성한다.
- `getStaticProps`에서 `getCityByName`으로 도시를 조회하고, 지원하지 않는 도시는 404 처리한다.
- 현재 날씨와 5일 예보 영역은 GraphQL/OpenWeather 연동 전 placeholder로 유지한다.

## 다음 단계

다음 단계에서는 GraphQL API Route를 구성하고, 상세 페이지 placeholder 영역에 실제 데이터 흐름을 연결할 준비를 한다.

