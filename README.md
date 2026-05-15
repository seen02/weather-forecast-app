# weather-forecast-app

OpenWeather API를 사용하여 선택한 도시의 현재 날씨와 5일 예보 정보를 보여주는 Next.js 12 기반 웹 애플리케이션입니다.

## 사용 기술

- Next.js 12
- React 18
- GraphQL
- Apollo Client
- OpenWeather API
- Module CSS
- ES6 JavaScript

## 주요 기능

- 메인 페이지에서 도시 선택
- 지원 도시 상세 페이지 제공
  - `/Seoul`
  - `/Tokyo`
  - `/Paris`
  - `/London`
- 선택한 도시의 현재 날씨 정보 표시
- 선택한 도시의 5일 예보 정보 표시
- GraphQL API Route를 통한 백엔드 구현
- Apollo Client를 통한 프론트엔드 데이터 요청
- 반응형 레이아웃 적용

## 실행 방법

### package 설치
```bash
git clone <repository-url>
cd weather-forecast-app
npm install
```

프로젝트 루트에 `.env.local` 파일을 생성하고 OpenWeather API Key를 설정합니다.

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

OpenWeather API Key는 이메일로 전달드렸습니다.

개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```txt
http://localhost:3000
```

## 완료 기능

- Next.js 12 프로젝트 구성
- Module CSS 기반 스타일링
- 전역 스타일 및 레이아웃 wrapper 구성
- 도시 목록 상수 정의
- 메인 페이지 및 도시 상세 라우팅 구현
- GraphQL API Route 구성
- OpenWeather service 구현
- Apollo Client 연결
- 현재 날씨 UI 구현
- 5일 예보 UI 구현
- Figma 디자인 시안 기반 UI 적용

## 참고 산출물

프로젝트 진행 과정, 설계, 코드 컨벤션, Git 컨벤션, 학습 기록, 구현 로그는 `project-artifacts` 디렉토리에 정리했습니다.

## GraphQL API

GraphQL API는 Next.js API Route인 `/api/graphql`에서 동작합니다.

프론트엔드는 Apollo Client를 사용하여 `/api/graphql`로 날씨 정보를 요청합니다.

예시 Query:

```graphql
query WeatherByCity($city: String!) {
  weatherByCity(city: $city) {
    city
    country
    current {
      temperature
      feelsLike
      humidity
      windSpeed
      description
      icon
      measuredAt
    }
    forecast {
      dateTime
      temperature
      humidity
      windSpeed
      description
      icon
    }
  }
}
```

## OpenWeather API 사용 방식

OpenWeather API 호출은 브라우저가 아닌 서버 영역에서만 수행합니다.

사용 위치:

```txt
server/services/openWeatherService.js
```

사용 API:

- Current Weather API
- 3-hour Forecast 5 days API

API Key가 클라이언트에 노출되지 않도록 Next.js API Route와 GraphQL resolver를 통해 서버에서 OpenWeather API를 호출합니다.

## 프로젝트 구조

```txt
weather-forecast-app/
├─ pages/
│  ├─ index.js
│  ├─ [city].js
│  ├─ _app.js
│  └─ api/
│     └─ graphql.js
├─ components/
│  ├─ city/
│  ├─ layout/
│  └─ weather/
├─ constants/
│  └─ cities.js
├─ graphql/
│  ├─ client.js
│  └─ queries.js
├─ server/
│  ├─ graphql/
│  └─ services/
├─ styles/
├─ utils/
└─ project-artifacts/
```

## 반응형 기준

레이아웃은 다음 기준으로 동작합니다.

- `1280px 이상`
  - 최대 너비 `1280px`
  - 화면 가운데 정렬
- `800px 이상 1280px 미만`
  - 화면 width를 `100%` 차지
- `800px 미만`
  - 레이아웃 최소 너비 `800px` 유지
  - 가로 스크롤로 확인 가능

## 코드 스플리팅

Next.js의 Pages Router를 사용하여 페이지 단위 코드 스플리팅을 적용했습니다.

- 메인 페이지: 도시 선택 UI 중심
- 도시 상세 페이지: 현재 날씨와 5일 예보 UI 중심
