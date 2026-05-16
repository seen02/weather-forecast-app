# 08. 현재 날씨 UI 구현 학습 노트

이 문서는 도시 상세 페이지의 현재 날씨 UI를 컴포넌트로 분리한 방식과, 로딩/에러/빈 데이터/성공 상태를 어떻게 처리했는지 정리한 학습 자료다.

## 학습 목표

- 데이터 요청과 화면 표시 책임을 분리하는 이유를 이해한다.
- 현재 날씨 카드가 어떤 props를 받고 어떤 상태별 UI를 반환하는지 파악한다.
- 날씨 값 포맷팅을 UI 컴포넌트 밖의 utility로 분리한 이유를 이해한다.
- 시멘틱 태그와 접근성 속성이 어떤 역할을 하는지 확인한다.

## 전체 흐름

관련 파일: `pages/[city].js`, `components/weather/CurrentWeatherCard.js`, `utils/weather.js`

```txt
pages/[city].js
→ useQuery로 GraphQL 데이터 요청
→ weather.current 추출
→ CurrentWeatherCard props 전달
→ utils/weather.js로 표시 문자열 포맷팅
→ 현재 날씨 카드 렌더링
```

상세 페이지는 데이터를 가져오고, `CurrentWeatherCard`는 받은 데이터를 표시한다. 이렇게 역할을 나누면 API 요청 로직과 UI 표시 로직이 섞이지 않는다.

## CurrentWeatherCard props

관련 파일: `components/weather/CurrentWeatherCard.js` 8행

```js
const CurrentWeatherCard = ({ city, hasError, isLoading, weather }) => {
```

컴포넌트가 받는 props는 다음과 같다.

- `city`: 도시 이름, 국가 코드, 인구수 등 표시 정보
- `hasError`: GraphQL 요청 에러 여부
- `isLoading`: GraphQL 요청 진행 여부
- `weather`: 현재 날씨 데이터

이 props는 `pages/[city].js` 46-51행에서 전달한다.

## 상태별 렌더링

현재 날씨 카드는 네 가지 상태를 처리한다.

### 로딩 상태

관련 파일: `CurrentWeatherCard.js` 9-18행

`isLoading`이 true이면 실제 날씨 값 대신 `Loading weather data...`를 표시한다. GraphQL 요청이 끝나기 전에는 `data`가 없을 수 있으므로 필요한 상태다.

### 에러 상태

관련 파일: `CurrentWeatherCard.js` 20-29행

`hasError`가 true이면 `Current weather is unavailable.`을 표시한다. 내부 에러 메시지를 그대로 보여주지 않고 일반화된 문구를 사용했다.

### 빈 데이터 상태

관련 파일: `CurrentWeatherCard.js` 31-40행

요청은 성공했지만 `weather`가 없을 경우 `No current weather data.`를 표시한다. 에러와 빈 데이터는 의미가 다르므로 분리했다.

### 성공 상태

관련 파일: `CurrentWeatherCard.js` 42-68행

실제 날씨 데이터가 있을 때 카드 UI를 렌더링한다.

- 43행: 카드 전체를 `<article>`로 감싼다.
- 44-48행: 날씨 아이콘 영역
- 50-56행: 측정 시간, 도시명, 인구수
- 58-66행: 현재 온도, 체감 온도, 설명, 풍속, 습도

## 표시 문자열 포맷팅

관련 파일: `utils/weather.js`

날씨 값은 API 응답 그대로 표시하지 않고 utility 함수로 변환한다.

- 1-3행: 반올림 온도 표시
- 5-7행: 소수점 둘째 자리 온도 표시
- 9-11행: 풍속 단위 표시
- 22-38행: 현재 날씨 측정 시간을 `May 15. 03:00am` 형태로 변환

`CurrentWeatherCard.js` 1-5행에서 이 함수들을 import하고, 51행, 60행, 63-64행에서 사용한다.

UI 컴포넌트 안에서 날짜/온도 변환 로직을 직접 작성하지 않은 이유는 다음과 같다.

- 컴포넌트가 표시 구조에 집중할 수 있다.
- 포맷팅 규칙을 테스트하기 쉽다.
- 예보 UI에서도 같은 온도 포맷팅을 재사용할 수 있다.

## 시멘틱 태그와 접근성

`CurrentWeatherCard.js` 43행의 `<article>`은 현재 날씨 카드가 독립적인 정보 블록임을 의미한다.

```jsx
<article className={styles.card} aria-labelledby="current-weather-title">
```

`aria-labelledby`는 이 article의 제목이 어떤 요소인지 연결한다. 52행의 `<h2 id="current-weather-title">`와 연결되어 보조 기술이 카드의 의미를 더 잘 파악할 수 있다.

날씨 아이콘 영역은 현재 실제 이미지가 아니라 장식적 표시이므로 44행에서 `aria-hidden="true"`를 사용한다.

## CSS Module 적용

관련 파일: `components/weather/CurrentWeatherCard.module.css`

- 1-12행: 카드 레이아웃을 grid로 구성한다.
- 14-28행: 원형 아이콘 영역 스타일
- 30-35행: 도시 정보 영역
- 53-63행: 도시명과 인구수 배치
- 73-88행: 온도 영역
- 97-103행: 에러 문구 스타일
- 105-114행: 상세 설명 문구 스타일

CSS Module을 사용하기 때문에 `styles.card`, `styles.icon` 같은 클래스 이름은 이 컴포넌트에만 scoped 된다.

## JavaScript / JSX 문법 포인트

### 조건부 조기 반환

`CurrentWeatherCard`는 if문으로 상태를 먼저 처리하고, 마지막에 성공 UI를 반환한다.

```js
if (isLoading) {
  return (...);
}
```

이 방식은 JSX 안에 복잡한 삼항 연산자를 여러 개 중첩하는 것보다 상태 흐름을 읽기 쉽다.

### JSX expression

`CurrentWeatherCard.js` 53-54행:

```jsx
{city.displayName}, {city.countryCode}
<span className={styles.population}>(인구수 : {city.population})</span>
```

JSX 안에서 `{}`를 사용하면 JavaScript 값을 화면에 넣을 수 있다.

### 문자열 조합

`CurrentWeatherCard.js` 63-64행은 체감 온도, 날씨 설명, 풍속, 습도를 한 문장으로 조합한다. 데이터 값과 고정 텍스트를 함께 보여주는 JSX 표현이다.

## 테스트와 연결되는 부분

관련 파일: `__tests__/utils/weather.test.js`

현재 날씨 카드 자체를 테스트하지는 않았지만, 카드에서 사용하는 포맷팅 함수는 테스트했다.

- 10-13행: 온도 포맷팅
- 15-17행: 풍속 포맷팅
- 19-23행: 날짜/시간 포맷팅

화면 컴포넌트보다 순수 함수부터 테스트한 이유는 입력과 출력이 명확하고, UI 렌더링 환경 없이도 검증할 수 있기 때문이다.

## 정리

현재 날씨 UI는 GraphQL 응답을 바로 화면에 흩뿌리는 방식이 아니라, page에서 데이터를 준비하고 컴포넌트가 상태별 표시를 담당하도록 구성했다. 포맷팅 로직은 utility로 분리해 재사용성과 테스트 가능성을 높였고, CSS Module로 컴포넌트 스타일 범위를 제한했다.
