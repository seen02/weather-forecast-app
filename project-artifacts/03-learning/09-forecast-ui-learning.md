# 09. 5일 예보 UI 구현 학습 노트

이 문서는 OpenWeather의 3시간 단위 5일 예보 데이터를 화면에서 날짜별 아코디언 형태로 보여주는 방식을 정리한 학습 자료다.

## 학습 목표

- 3시간 단위 예보 데이터를 날짜별로 그룹화하는 방식을 이해한다.
- React state로 아코디언 열림 상태를 관리하는 흐름을 파악한다.
- `ForecastSection`, `ForecastCard`, `utils/forecast.js`의 역할을 구분한다.
- 배열 메서드 `reduce`, `map`, `slice`를 실제 코드 기준으로 이해한다.

## 전체 흐름

관련 파일: `pages/[city].js`, `utils/forecast.js`, `components/weather/ForecastSection.js`, `components/weather/ForecastCard.js`

```txt
GraphQL forecast 응답
→ pages/[city].js
→ getDailyForecastGroups(weather?.forecast)
→ ForecastSection
→ 날짜별 아코디언
→ ForecastCard 목록
```

OpenWeather forecast API는 3시간 단위 데이터를 여러 개 반환한다. 화면에서는 이를 그대로 나열하지 않고 날짜별로 묶어 `May 23`, `May 24` 같은 아코디언 섹션으로 보여준다.

## 상세 페이지에서 예보 데이터 준비

관련 파일: `pages/[city].js`

- 8행: `getDailyForecastGroups`를 import한다.
- 30행: GraphQL 응답의 `weather?.forecast`를 날짜별 그룹으로 변환한다.
- 52-56행: 변환한 예보 데이터를 `ForecastSection`에 props로 전달한다.

```js
const dailyForecasts = getDailyForecastGroups(weather?.forecast);
```

`weather?.forecast`는 데이터 로딩 전에는 undefined일 수 있다. `getDailyForecastGroups`는 기본값을 빈 배열로 처리하므로 안전하게 호출할 수 있다.

## 예보 데이터 그룹화

관련 파일: `utils/forecast.js`

### 날짜 key 생성

1-3행의 `getForecastDateKey`는 ISO 문자열에서 날짜 부분만 잘라낸다.

```js
return new Date(dateTime).toISOString().slice(0, 10);
```

예를 들어 `2026-05-15T03:00:00.000Z`는 `2026-05-15`가 된다. 이 값을 그룹의 key로 사용한다.

### reduce로 그룹 만들기

39-47행의 `getDailyForecastGroups`는 forecast 배열을 날짜별 객체로 묶는다.

```js
const forecastGroups = forecasts.reduce((groups, forecast) => {
  const dateKey = getForecastDateKey(forecast.dateTime);

  return {
    ...groups,
    [dateKey]: [...(groups[dateKey] || []), forecast],
  };
}, {});
```

`reduce`는 배열을 하나의 값으로 누적할 때 사용한다. 여기서는 forecast 배열을 날짜 key를 가진 객체로 변환한다.

결과 예시는 다음과 같다.

```js
{
  '2026-05-15': [forecast1, forecast2],
  '2026-05-16': [forecast3]
}
```

### 5일, 하루 7개 항목 제한

49-55행:

```js
return Object.entries(forecastGroups)
  .slice(0, 5)
  .map(([dateKey, items]) => ({
    dateKey,
    dateTime: items[0].dateTime,
    forecasts: items.slice(0, 7),
  }));
```

`Object.entries`는 객체를 `[key, value]` 배열로 바꾼다. `slice(0, 5)`로 5일만 사용하고, 각 날짜 안에서는 `items.slice(0, 7)`로 시안에 맞춰 최대 7개의 시간대만 표시한다.

## ForecastSection

관련 파일: `components/weather/ForecastSection.js`

- 1행: React `useState`를 import한다.
- 6행: `forecasts`, `hasError`, `isLoading` props를 받는다.
- 7행: 열린 날짜 key를 state로 관리한다.
- 9-18행: 로딩 상태 처리
- 20-29행: 에러 상태 처리
- 31-40행: 빈 데이터 상태 처리
- 42행: 열릴 날짜를 결정한다.
- 52-80행: 날짜별 아코디언 목록을 렌더링한다.

`openDateKey`의 초기값은 빈 문자열이다. 42행에서 `openDateKey`가 없으면 첫 번째 날짜를 기본으로 열어 둔다.

```js
const activeDateKey = openDateKey || forecasts[0]?.dateKey;
```

## 아코디언 열림 상태

관련 파일: `ForecastSection.js` 58-68행

날짜 버튼을 클릭하면 `setOpenDateKey`로 열린 날짜를 바꾼다.

```js
onClick={() =>
  setOpenDateKey(isOpen ? 'none' : forecastGroup.dateKey)
}
```

현재 열려 있는 날짜를 다시 클릭하면 `'none'`으로 설정해 닫힌 상태를 만든다. 다른 날짜를 클릭하면 해당 날짜의 key로 변경된다.

`aria-expanded={isOpen}`은 버튼이 현재 확장되어 있는지 보조 기술에 알려준다.

## ForecastCard

관련 파일: `components/weather/ForecastCard.js`

- 1행: 예보 시간 포맷팅 함수 import
- 2행: 온도 포맷팅 함수 import
- 5행: `forecast` props를 받는다.
- 7행: 리스트 항목 `<li>`로 렌더링한다.
- 14행: 시간 표시
- 17행: 날씨 설명 표시
- 18-21행: 온도 표시

`ForecastSection`은 날짜 그룹과 열림 상태를 담당하고, `ForecastCard`는 시간별 예보 한 줄을 표시한다. 역할을 작게 나누면 컴포넌트가 읽기 쉬워진다.

## 날짜와 시간 포맷팅

관련 파일: `utils/forecast.js`

- 58-64행: 날짜를 `May 15` 형태로 변환한다.
- 66-76행: 시간을 `03:00am` 형태로 변환한다.

여기서 `timeZone: 'UTC'`를 명시했다. 테스트와 화면 표시 기준을 일정하게 유지하기 위해서다. 로컬 PC 시간대가 달라도 예보 그룹과 표시 결과가 흔들리지 않도록 했다.

## JavaScript 문법 포인트

### computed property name

`utils/forecast.js` 45행:

```js
[dateKey]: [...(groups[dateKey] || []), forecast]
```

객체의 key를 변수 값으로 만들 때 대괄호를 사용한다. 날짜 문자열이 key가 된다.

### 배열 spread

`[...(groups[dateKey] || []), forecast]`는 기존 날짜 그룹 배열에 현재 forecast를 추가한 새 배열을 만든다. 기존 배열을 직접 수정하지 않는 방식이다.

### conditional rendering

`ForecastSection.js` 70-76행:

```jsx
{isOpen && (
  <ul className={styles.hourlyList}>
    ...
  </ul>
)}
```

`isOpen`이 true일 때만 시간별 예보 목록을 렌더링한다.

## 테스트에서 확인한 내용

관련 파일: `__tests__/utils/forecast.test.js`

- 34-59행: 3시간 단위 예보를 날짜별 요약으로 변환하는지 확인한다.
- 61-70행: 아코디언 렌더링용 그룹 구조가 만들어지는지 확인한다.
- 72-75행: 날짜와 시간 포맷팅 결과를 확인한다.

## 정리

5일 예보 UI의 핵심은 외부 API의 원본 배열을 그대로 보여주지 않고, 화면 구조에 맞게 날짜별 그룹으로 변환한 것이다. `utils/forecast.js`는 데이터 가공을 담당하고, `ForecastSection`은 아코디언 상태를 담당하며, `ForecastCard`는 개별 시간대 표시를 담당한다. 이 분리 덕분에 데이터 처리, 상태 관리, UI 표시 흐름을 각각 이해하기 쉽다.
