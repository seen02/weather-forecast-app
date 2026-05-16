# 12. Jest 테스트 추가 학습 노트

이 문서는 선택 구현 사항인 Jest 단위 테스트를 어떤 범위에 추가했는지, 그리고 테스트 대상 선정 기준을 정리한 학습 자료다.

## 학습 목표

- Jest가 JavaScript 단위 테스트 도구로 어떤 역할을 하는지 이해한다.
- Next.js 프로젝트에서 Jest 설정을 구성하는 방식을 파악한다.
- UI 렌더링보다 순수 함수와 상수부터 테스트한 이유를 이해한다.
- 테스트 코드에서 `describe`, `it`, `expect`의 역할을 구분한다.

## 테스트 범위 선정

이 프로젝트에서 우선 테스트한 대상은 다음 세 가지다.

```txt
constants/cities.js
utils/weather.js
utils/forecast.js
```

이 파일들은 입력과 출력이 명확하고, 외부 API나 브라우저 렌더링에 의존하지 않는다. 따라서 단위 테스트로 안정적으로 검증하기 좋다.

반대로 GraphQL API Route나 OpenWeather service는 외부 API Key, 네트워크, 환경 변수에 영향을 받는다. 이 단계에서는 단위 테스트 범위를 순수 함수 중심으로 제한했다.

## Jest 설정

관련 파일: `jest.config.js`

- 1행: Next.js용 Jest helper인 `next/jest`를 가져온다.
- 3-5행: 프로젝트 루트를 기준으로 Next.js 설정을 로드한다.
- 7-10행: custom Jest 설정을 정의한다.
- 8행: 테스트 환경을 `node`로 지정한다.
- 9행: `.next`, `node_modules`는 테스트 경로에서 제외한다.
- 12행: Next.js 설정이 반영된 Jest config를 export한다.

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});
```

Next.js 프로젝트는 Babel, CSS Module, 환경 설정 등이 일반 Node 프로젝트와 다를 수 있다. `next/jest`를 사용하면 Next.js 설정과 호환되는 Jest 환경을 구성하기 쉽다.

## package.json script

관련 파일: `package.json`

10행에 테스트 실행 script가 있다.

```json
"test": "jest"
```

따라서 다음 명령으로 테스트를 실행한다.

```bash
npm test
```

## 도시 상수 테스트

관련 파일: `__tests__/constants/cities.test.js`

테스트 대상: `constants/cities.js`

- 10-18행: 지원 도시 이름과 path가 과제 요구사항과 일치하는지 확인한다.
- 20-26행: `getCityByName('Seoul')`이 올바른 도시 정보를 반환하는지 확인한다.
- 28-31행: `isSupportedCity`가 지원 도시와 미지원 도시를 구분하는지 확인한다.

이 테스트는 라우팅과 메인 버튼의 기준 데이터가 깨지지 않도록 보호한다.

## 날씨 포맷팅 테스트

관련 파일: `__tests__/utils/weather.test.js`

테스트 대상: `utils/weather.js`

- 10-13행: 온도 포맷팅 확인
- 15-17행: 풍속 포맷팅 확인
- 19-23행: 현재 날씨 날짜/시간 포맷팅 확인

`formatPreciseTemperature(21.6)`이 `21.60°C`가 되는지 확인하는 식으로 입력과 출력이 명확한 함수를 테스트한다.

## 예보 유틸 테스트

관련 파일: `__tests__/utils/forecast.test.js`

테스트 대상: `utils/forecast.js`

- 9-31행: 테스트에 사용할 fixture 데이터
- 34-59행: 3시간 예보를 날짜별 요약으로 만드는지 확인
- 61-70행: 아코디언 렌더링용 날짜 그룹을 만드는지 확인
- 72-75행: 예보 날짜와 시간 포맷팅 확인

`getDailyForecastGroups`는 Forecast UI가 의존하는 핵심 데이터 구조를 만든다. 이 함수가 깨지면 아코디언 렌더링도 영향을 받기 때문에 테스트 가치가 높다.

## Jest 문법 포인트

### describe

`describe`는 관련 테스트들을 묶는 블록이다.

```js
describe('forecast utils', () => {
  ...
});
```

### it

`it`은 하나의 테스트 케이스를 정의한다.

```js
it('formats forecast date and time with UTC basis', () => {
  ...
});
```

문장형 설명을 넣어두면 테스트 결과를 읽을 때 어떤 동작을 검증하는지 알기 쉽다.

### expect

`expect`는 실제 결과와 기대 결과를 비교한다.

```js
expect(formatForecastDate('2026-05-15T00:00:00.000Z')).toBe('May 15');
```

`toBe`는 원시 값 비교에 사용하고, `toEqual`은 객체나 배열 구조 비교에 사용한다.

## eslint-env jest

각 테스트 파일 1행에는 다음 주석이 있다.

```js
/* eslint-env jest */
```

Jest는 `describe`, `it`, `expect` 같은 전역 함수를 제공한다. ESLint가 이 전역 함수를 알 수 있도록 테스트 파일에 환경 주석을 추가했다.

## 테스트가 보호하는 기능

이번 테스트는 다음 기능을 보호한다.

- 지원 도시 목록과 라우팅 path
- 도시 검색 helper
- 날씨 온도/풍속/시간 표시 형식
- 예보 데이터를 날짜별로 묶는 로직
- 예보 날짜/시간 표시 형식

UI를 직접 렌더링하지 않더라도, UI가 의존하는 데이터 변환 로직을 테스트하기 때문에 기능 회귀를 줄일 수 있다.

## 추후 확장 가능한 테스트 범위

현재 테스트는 순수 함수 중심이다. 프로젝트를 더 확장한다면 다음 영역도 추가할 수 있다.

- GraphQL resolver 단위 테스트
- OpenWeather service의 fetch mock 테스트
- React Testing Library를 사용한 컴포넌트 렌더링 테스트
- 에러/로딩 상태 UI 테스트

## 정리

Jest 테스트 단계에서는 가장 안정적으로 검증 가능한 순수 함수와 상수부터 테스트했다. 도시 목록, 포맷팅, 예보 그룹화 로직은 화면과 API 흐름의 기반이 되는 부분이므로 작은 단위 테스트만으로도 프로젝트 신뢰도를 높일 수 있다.
