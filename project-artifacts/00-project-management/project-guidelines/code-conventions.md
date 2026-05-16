# Code Conventions

## 1. 기본 원칙

이 프로젝트는 Next.js 12, GraphQL, Apollo Client, Module CSS 기반으로 구현한다.

코드는 다음 원칙을 따른다.

- 모듈 단위로 책임을 분리한다.
- ES6 문법을 사용한다.
- UI 컴포넌트와 데이터 처리 로직을 분리한다.
- 외부 API 호출은 서버 영역에서만 수행한다.
- 컴포넌트는 재사용 가능하고 테스트하기 쉬운 형태로 작성한다.
- 시멘틱 태그를 사용하여 페이지 구조를 명확히 한다.

## 2. JavaScript 스타일

### 기본 문법

- `import/export` 문법을 사용한다.
- `var`는 사용하지 않는다.
- 기본적으로 `const`를 사용한다.
- 재할당이 필요한 경우에만 `let`을 사용한다.
- 문자열은 single quote를 사용한다.
- 세미콜론을 사용한다.
- 들여쓰기는 2 spaces를 사용한다.

예:

```js
const cityName = 'Seoul';

export const formatTemperature = (temperature) => {
  return `${Math.round(temperature)}°C`;
};
```

### 함수 작성

- 일반 로직은 arrow function을 우선 사용한다.
- 함수 하나는 하나의 책임만 갖도록 작성한다.
- 복잡한 조건문은 별도 함수로 분리한다.
- 중복되는 포맷팅 로직은 `utils`로 분리한다.

예:

```js
export const isSupportedCity = (city) => {
  return SUPPORTED_CITIES.includes(city);
};
```

## 3. 파일 및 폴더 네이밍

### 컴포넌트

컴포넌트 파일은 `PascalCase`를 사용한다.

```txt
CurrentWeatherCard.js
ForecastSection.js
CityButtonList.js
```

### CSS Module

CSS Module 파일은 컴포넌트 파일명과 동일하게 작성한다.

```txt
CurrentWeatherCard.js
CurrentWeatherCard.module.css
```

### 유틸 파일

유틸 파일은 도메인 기준으로 `camelCase` 또는 짧은 명사형 이름을 사용한다.

```txt
date.js
weather.js
forecast.js
```

### 상수 파일

상수 파일은 관리하는 데이터의 의미가 드러나도록 작성한다.

```txt
cities.js
```

## 4. Export 규칙

### Default Export

Next.js page와 React component는 `default export`를 사용한다.

```js
const CurrentWeatherCard = ({ weather }) => {
  return <section>{weather.city}</section>;
};

export default CurrentWeatherCard;
```

### Named Export

상수, 유틸 함수, GraphQL query는 `named export`를 사용한다.

```js
export const SUPPORTED_CITIES = ['Seoul', 'Tokyo', 'Paris', 'London'];

export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};
```

## 5. React 컴포넌트 규칙

### 컴포넌트 책임

- 컴포넌트는 가능한 한 UI 렌더링에 집중한다.
- 데이터 요청은 page 또는 container 성격의 컴포넌트에서 처리한다.
- 표시 전용 컴포넌트는 props로 데이터를 전달받는다.
- 로딩, 에러, 빈 상태는 공통 컴포넌트로 분리한다.

### Props

- props 이름은 의미가 분명해야 한다.
- boolean props는 `is`, `has`, `can`, `should`로 시작하는 이름을 사용한다.
- props를 바로 변경하지 않는다.

예:

```js
const ForecastSection = ({ forecasts, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {forecasts.map((forecast) => (
        <ForecastCard key={forecast.dateTime} forecast={forecast} />
      ))}
    </section>
  );
};
```

## 6. Next.js 페이지 규칙

- `pages/index.js`는 메인 페이지 역할만 담당한다.
- `pages/[city].js`는 도시 상세 페이지 역할만 담당한다.
- 페이지 파일에서 복잡한 UI는 직접 작성하지 않고 컴포넌트로 분리한다.
- 유효하지 않은 도시 접근은 명확히 처리한다.

라우팅 기준:

```txt
/
/Seoul
/Tokyo
/Paris
/London
```

## 7. GraphQL 규칙

### 프론트엔드

- GraphQL query는 `graphql/queries.js`에서 관리한다.
- Apollo Client 설정은 `graphql/client.js`에서 관리한다.
- 컴포넌트 내부에 query 문자열을 직접 작성하지 않는다.

### 백엔드

- GraphQL schema는 `server/graphql/schema.js`에서 관리한다.
- resolver는 `server/graphql/resolvers.js`에서 관리한다.
- resolver에는 복잡한 외부 API 호출 로직을 작성하지 않는다.
- OpenWeather API 호출은 `server/services/openWeatherService.js`에서 처리한다.

## 8. OpenWeather API 규칙

- OpenWeather API key는 `.env.local`에만 저장한다.
- 브라우저에서 OpenWeather API를 직접 호출하지 않는다.
- 외부 API 응답은 service 계층에서 화면에 필요한 형태로 가공한다.
- API 호출 실패, 잘못된 도시명, 네트워크 오류를 고려한다.

환경 변수 이름:

```txt
OPENWEATHER_API_KEY=your_api_key
```

## 9. CSS 규칙

### Module CSS

- 컴포넌트 스타일은 CSS Module을 사용한다.
- 클래스 이름은 `camelCase`를 사용한다.
- 전역 클래스에 의존하지 않는다.

예:

```css
.weatherCard {
  padding: 24px;
}

.temperatureText {
  font-size: 32px;
}
```

### 전역 스타일

전역 스타일은 최소화한다.

전역 스타일에 포함할 수 있는 항목:

- CSS reset
- `body` 기본 스타일
- CSS variables
- 공통 font 설정

### 반응형 기준

반응형 레이아웃 기준은 `PageLayout`에서 관리한다.

- `1280px 이상`: 최대 너비 `1280px`, 가운데 정렬
- `800px 이상 1280px 미만`: 너비 `100%`
- `800px 미만`: 최소 너비 `800px`, 가로 스크롤 허용

## 10. 시멘틱 태그 규칙

페이지 구조는 의미에 맞는 HTML 태그를 사용한다.

- 주요 콘텐츠: `main`
- 페이지 상단 영역: `header`
- 독립적인 콘텐츠 영역: `section`
- 예보 목록: `ul`, `li`
- 클릭 가능한 동작: `button`
- 페이지 이동: Next.js `Link`

예:

```jsx
<main>
  <header>
    <h1>Weather Forecast</h1>
  </header>

  <section aria-labelledby="current-weather-title">
    <h2 id="current-weather-title">Current Weather</h2>
  </section>

  <section aria-labelledby="forecast-title">
    <h2 id="forecast-title">5 Day Forecast</h2>
  </section>
</main>
```

## 11. 에러 처리 규칙

- API 요청 중에는 loading 상태를 표시한다.
- 요청 실패 시 사용자에게 에러 메시지를 표시한다.
- 유효하지 않은 도시 접근은 별도로 처리한다.
- 콘솔 로그는 디버깅 완료 후 제거한다.

권장 상태:

```txt
loading
error
empty
success
```

## 12. 테스트 규칙

Jest 테스트를 추가할 경우 순수 함수부터 테스트한다.

우선순위:

1. `utils/forecast.js`
2. `utils/weather.js`
3. `constants/cities.js`
4. 주요 UI 컴포넌트

테스트 작성 기준:

- 외부 API를 직접 호출하지 않는다.
- OpenWeather API 응답은 mock 데이터로 대체한다.
- 날짜, 온도, 예보 데이터 가공 로직을 우선 검증한다.

## 13. README 작성 규칙

README에는 제출자가 프로젝트를 checkout한 뒤 바로 실행할 수 있도록 필요한 정보를 작성한다.

포함할 내용:

- 프로젝트 소개
- 사용 기술
- 설치 방법
- 환경 변수 설정 방법
- 실행 방법
- 프로젝트 구조
- GraphQL API 설명
- OpenWeather API 사용 방식
- 반응형 구현 기준
- 구현 과정 및 리서치 내용
- 완료 기능과 보완 항목

