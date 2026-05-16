# Weather Forecast App Architecture

## 1. 프로젝트 목표

OpenWeather API를 사용하여 선택한 도시의 현재 날씨와 5일 예보 정보를 보여주는 Next.js 애플리케이션을 구현한다.

주요 요구사항은 다음과 같다.

- Next.js 12 사용
- Create Next App 기반 프로젝트 구성
- 프론트엔드와 백엔드를 모두 Next.js에서 구현
- 백엔드는 GraphQL API로 구현
- Apollo Client를 사용하여 프론트엔드에서 GraphQL API 호출
- Module CSS 기반 스타일링
- ES6 문법 사용
- 모듈 단위 개발
- 시멘틱 태그 사용
- 반응형 레이아웃 구현
- 코드 스플리팅 적용

## 2. 추천 프로젝트 구조

```txt
weather-forecast-app/
├─ pages/
│  ├─ _app.js
│  ├─ index.js
│  ├─ [city].js
│  └─ api/
│     └─ graphql.js
│
├─ components/
│  ├─ layout/
│  │  ├─ PageLayout.js
│  │  └─ Header.js
│  ├─ city/
│  │  ├─ CityButtonList.js
│  │  └─ CityButton.js
│  ├─ weather/
│  │  ├─ CurrentWeatherCard.js
│  │  ├─ ForecastSection.js
│  │  ├─ ForecastCard.js
│  │  └─ WeatherIcon.js
│  └─ common/
│     ├─ Loading.js
│     └─ ErrorMessage.js
│
├─ graphql/
│  ├─ client.js
│  └─ queries.js
│
├─ server/
│  ├─ graphql/
│  │  ├─ schema.js
│  │  └─ resolvers.js
│  └─ services/
│     └─ openWeatherService.js
│
├─ constants/
│  └─ cities.js
│
├─ utils/
│  ├─ date.js
│  ├─ weather.js
│  └─ forecast.js
│
├─ styles/
│  ├─ globals.css
│  └─ variables.css
│
├─ __tests__/
│  ├─ utils/
│  └─ components/
│
├─ project-artifacts/
│  ├─ 00-project-management/
│  │  └─ project-guidelines/
│  ├─ 01-requirements/
│  ├─ 02-architecture/
│  ├─ 03-learning/
│  ├─ 04-implementation-log/
│  ├─ 05-review/
│  ├─ 06-qa/
│  ├─ 07-submission/
│  └─ archive/
│
├─ .env.local.example
├─ README.md
├─ package.json
└─ next.config.js
```

## 3. 디렉터리별 역할

### `pages`

Next.js 12의 Pages Router를 사용하는 라우팅 영역이다.

- `pages/index.js`
  - 메인 페이지
  - 도시 선택 버튼 목록 표시
  - 각 버튼 클릭 시 도시 상세 페이지로 이동
- `pages/[city].js`
  - 도시 상세 페이지
  - `/Seoul`, `/Tokyo`, `/Paris`, `/London` 경로 처리
  - GraphQL API를 호출하여 현재 날씨와 5일 예보 표시
- `pages/api/graphql.js`
  - Next.js API Route
  - GraphQL 서버 엔드포인트
  - 프론트엔드는 이 API를 통해 날씨 데이터를 요청
- `pages/_app.js`
  - 전역 스타일 적용
  - Apollo Provider 설정

### `components`

UI를 기능 단위로 분리한다.

- `components/layout`
  - 공통 레이아웃, 헤더 등 페이지 구조 담당
- `components/city`
  - 메인 페이지의 도시 버튼 목록 담당
- `components/weather`
  - 현재 날씨 카드, 예보 목록, 날씨 아이콘 등 날씨 표시 UI 담당
- `components/common`
  - 로딩, 에러 메시지처럼 여러 곳에서 재사용되는 UI 담당

### `graphql`

프론트엔드에서 사용하는 GraphQL 관련 코드를 관리한다.

- `client.js`
  - Apollo Client 인스턴스 생성
  - GraphQL API URL 설정
- `queries.js`
  - 현재 날씨와 5일 예보를 요청하는 GraphQL query 정의

### `server`

Next.js API Route에서 사용하는 서버 로직을 관리한다.

- `server/graphql/schema.js`
  - GraphQL type, query schema 정의
- `server/graphql/resolvers.js`
  - GraphQL resolver 정의
  - service 계층을 호출하여 데이터를 가져옴
- `server/services/openWeatherService.js`
  - OpenWeather API 호출 전담
  - Current Weather API와 3-hour Forecast 5 days API 요청
  - 외부 API 응답을 화면에서 쓰기 좋은 형태로 가공

### `constants`

애플리케이션에서 고정적으로 사용하는 값을 관리한다.

- `cities.js`
  - 지원 도시 목록
  - 예: `Seoul`, `Tokyo`, `Paris`, `London`
  - 도시 route path와 표시 이름 관리

### `utils`

비즈니스 로직과 UI에서 함께 사용할 수 있는 순수 유틸 함수를 관리한다.

- `date.js`
  - 날짜, 시간 포맷 처리
- `weather.js`
  - 온도, 풍속, 날씨 설명 등 표시용 데이터 포맷 처리
- `forecast.js`
  - 3시간 단위 예보 데이터를 일자별 또는 카드 목록 형태로 가공

### `styles`

전역 스타일과 CSS 변수를 관리한다.

- `globals.css`
  - reset, body 기본 스타일, 공통 전역 스타일
- `variables.css`
  - 색상, spacing, breakpoint 등 CSS 변수 관리

개별 컴포넌트 스타일은 해당 컴포넌트 근처에 `ComponentName.module.css` 형태로 둔다.

예:

```txt
components/weather/
├─ CurrentWeatherCard.js
└─ CurrentWeatherCard.module.css
```

### `project-artifacts`

프로젝트 진행 중 생성되는 산출물을 단계별로 정리하는 디렉터리다.

소스 코드가 아닌 문서, 학습 노트, 리뷰 결과, 요구사항 추적표, 검증 로그, 제출 준비 자료를 이곳에 보관한다.

- `00-project-management`
  - 단계별 진행 상태, 의사결정 로그, 작업 요약
  - `project-guidelines`에는 프로젝트 기준 문서인 `architecture-and-plan.md`, `code-conventions.md`, `git-conventions.md`, `subprocess-spec.md`를 보관
- `01-requirements`
  - 요구사항 추적표, 제출 전 체크리스트
- `02-architecture`
  - 설계 변경 이력, API 설계, 레이아웃 설계 보조 문서
- `03-learning`
  - 기술 설명 학습 노트
- `04-implementation-log`
  - 각 구현 단계별 변경 요약
- `05-review`
  - 리뷰 결과, 개선 필요 사항, 최종 리뷰 보고서
- `06-qa`
  - lint, build, test, 브라우저 수동 검증 결과
- `07-submission`
  - 제출 요약, 기술 설명 정리, 보완 항목 정리
- `archive`
  - 현재 기준에서는 사용하지 않지만 보존할 과거 산출물

## 4. 라우팅 설계

과제에서 요구하는 상세 페이지 주소는 다음과 같다.

```txt
/
/Seoul
/Tokyo
/Paris
/London
```

`pages/[city].js`에서 동적 라우팅을 사용하되, 허용된 도시인지 검증한다.

허용되지 않은 도시 경로로 접근한 경우에는 404 페이지 또는 에러 메시지를 보여준다.

## 5. 데이터 흐름

```txt
사용자가 /Seoul 접속
→ pages/[city].js 렌더링
→ Apollo Client가 /api/graphql로 GraphQL query 요청
→ pages/api/graphql.js에서 GraphQL 서버 실행
→ resolver가 openWeatherService 호출
→ openWeatherService가 OpenWeather API 호출
→ Current Weather와 5 day forecast 응답 수신
→ 필요한 데이터만 가공
→ GraphQL 응답 반환
→ 도시 상세 페이지에서 현재 날씨와 예보 렌더링
```

## 6. GraphQL API 설계

프론트엔드에서는 도시 이름 하나만 전달하고, 백엔드에서 OpenWeather API 호출을 처리한다.

예상 Query 형태:

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

이렇게 구성하면 프론트엔드는 OpenWeather API의 응답 구조를 직접 알 필요가 없고, GraphQL schema에 맞춰 필요한 데이터만 사용할 수 있다.

## 7. OpenWeather API 사용 위치

OpenWeather API 호출은 반드시 서버 영역에서만 수행한다.

```txt
server/services/openWeatherService.js
```

이렇게 분리하는 이유는 다음과 같다.

- API key가 브라우저에 노출되지 않음
- 외부 API 응답 구조 변경 시 service 계층만 수정하면 됨
- GraphQL resolver가 간결해짐
- 단위 테스트 작성이 쉬워짐

필요한 환경 변수:

```txt
OPENWEATHER_API_KEY=your_api_key
```

## 8. 반응형 레이아웃 설계

과제의 반응형 조건은 레이아웃 wrapper에서 통제한다.

```css
.container {
  width: 100%;
  min-width: 800px;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 1279px) {
  .container {
    max-width: none;
  }
}
```

구현 기준:

- `1280px 이상`
  - 레이아웃 최대 너비를 `1280px`로 제한
  - 화면 가운데 정렬
- `800px 이상 1280px 미만`
  - 레이아웃이 화면 width를 `100%` 차지
- `800px 미만`
  - 레이아웃 최소 너비를 `800px`로 유지
  - 브라우저 가로 스크롤로 전체 내용을 볼 수 있게 처리

## 9. 코드 스플리팅 전략

Next.js는 페이지 단위 코드 스플리팅을 기본으로 제공한다.

추가로 날씨 상세 페이지에서 상대적으로 무거운 예보 영역을 `next/dynamic`으로 분리할 수 있다.

예상 적용 대상:

- `ForecastSection`
- 예보 차트 또는 복잡한 시각화 컴포넌트를 추가하는 경우 해당 컴포넌트

메인 페이지에서는 도시 선택 UI만 로드하고, 상세 날씨 UI는 상세 페이지에서만 로드되도록 구성한다.

## 10. 시멘틱 태그 설계

페이지 구조는 다음과 같이 구성한다.

```txt
body
└─ main
   ├─ header
   ├─ section: 도시 선택 또는 현재 날씨
   └─ section: 5일 예보
```

권장 태그:

- 전체 주요 콘텐츠: `main`
- 상단 제목 영역: `header`
- 현재 날씨 영역: `section`
- 예보 목록: `section`, `ul`, `li`
- 도시 이동: `button` 또는 Next.js `Link`

## 11. 테스트 설계

Jest 단위 테스트는 선택 구현 사항이므로, 시간이 허용될 경우 아래부터 작성한다.

우선순위:

1. `utils/forecast.js`
   - 3시간 단위 예보 데이터를 표시용 데이터로 가공하는 로직
2. `utils/weather.js`
   - 온도, 풍속, 설명 포맷 처리
3. `constants/cities.js`
   - 허용 도시 검증
4. 주요 UI 컴포넌트
   - 도시 버튼 목록
   - 현재 날씨 카드

## 12. README 작성 범위

`README.md`에는 제출 요구사항에 맞춰 다음 내용을 포함한다.

- 프로젝트 소개
- 사용 기술
- 설치 방법
- 환경 변수 설정 방법
- 실행 방법
- GraphQL API 설명
- OpenWeather API 사용 방식
- 프로젝트 구조
- 반응형 구현 기준
- 코드 스플리팅 적용 위치
- 구현 과정에서 리서치한 내용
- 완료한 기능과 보완 항목이 있을 경우 해당 내용

## 13. 산출물 관리 규칙

각 작업 단계가 끝날 때 해당 단계에서 생성된 산출물을 `project-artifacts` 하위 디렉터리에 정리한다.

파일 이름은 단계 순서를 알아보기 쉽도록 숫자 prefix를 사용한다.

```txt
01-nextjs-12-initialization.md
02-module-css-and-layout.md
03-city-routing.md
```

산출물 저장 기준은 다음과 같다.

- 학습 자료는 `project-artifacts/03-learning`에 저장한다.
- 구현 단계별 작업 요약은 `project-artifacts/04-implementation-log`에 저장한다.
- 리뷰 결과는 `project-artifacts/05-review`에 저장한다.
- 실행, 빌드, 테스트 검증 결과는 `project-artifacts/06-qa`에 저장한다.
- 제출용 요약과 기술 설명 자료는 `project-artifacts/07-submission`에 저장한다.

루트 디렉터리에는 프로젝트 실행에 직접 필요한 파일만 두고, 프로젝트 기준 문서는 `project-artifacts/00-project-management/project-guidelines`에 둔다.

## 14. 구현 우선순위

권장 구현 순서는 다음과 같다.

1. Next.js 12 프로젝트 초기화
2. Module CSS, 전역 스타일, 레이아웃 wrapper 구성
3. 도시 목록 상수 정의
4. 메인 페이지와 도시 상세 라우팅 구현
5. GraphQL API Route 구성
6. OpenWeather service 구현
7. Apollo Client 연결
8. 현재 날씨 UI 구현
9. 5일 예보 UI 구현
10. figma 디자인 시안 적용
11. 코드 스플리팅 적용
12. Jest 테스트 추가

