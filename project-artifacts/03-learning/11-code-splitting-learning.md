# 11. 코드 스플리팅 학습 노트

이 문서는 Next.js의 기본 코드 스플리팅과, 이 프로젝트에서 추가로 적용한 동적 import 방식을 정리한 학습 자료다.

## 학습 목표

- 코드 스플리팅이 필요한 이유를 이해한다.
- Next.js가 페이지 단위 코드 스플리팅을 기본 제공한다는 점을 이해한다.
- `next/dynamic`을 사용한 컴포넌트 단위 지연 로딩 방식을 파악한다.
- 이 프로젝트에서 어떤 범위까지 코드 스플리팅을 적용하는 것이 적절한지 정리한다.

## 코드 스플리팅의 의미

코드 스플리팅은 모든 JavaScript 코드를 한 번에 내려받지 않고, 필요한 단위로 나누어 로드하는 방식이다. 초기 화면에 필요하지 않은 코드를 나중에 불러오면 첫 로딩 부담을 줄일 수 있다.

Next.js에서는 기본적으로 페이지 단위 코드 스플리팅이 적용된다.

```txt
pages/index.js      → 메인 페이지 bundle
pages/[city].js     → 도시 상세 페이지 bundle
pages/api/graphql.js → 서버 API 코드
```

즉 `/`에 접속할 때 상세 페이지 UI 코드 전체를 반드시 함께 받을 필요가 없다. Next.js가 페이지 경로 기준으로 필요한 bundle을 나눈다.

## 이 프로젝트에서 추가 적용한 부분

관련 파일: `pages/[city].js`

- 1행: `next/dynamic`을 import한다.
- 10-20행: `ForecastSection`을 dynamic import로 불러온다.

```js
const ForecastSection = dynamic(
  () => import('../components/weather/ForecastSection'),
  {
    loading: () => (
      <section className={styles.forecastLoading} aria-label="Loading forecast">
        <h2 className={styles.forecastLoadingTitle}>5-day Forecast</h2>
        <p className={styles.forecastLoadingText}>Loading forecast data...</p>
      </section>
    ),
  }
);
```

5일 예보 섹션은 상세 페이지에서 비교적 큰 UI 블록이다. 현재 날씨 카드는 상세 페이지의 핵심 정보이므로 즉시 import하고, 예보 섹션은 dynamic import로 분리했다.

## next/dynamic의 동작

`dynamic`은 컴포넌트를 별도 chunk로 분리하고, 해당 컴포넌트가 렌더링될 때 로드한다.

```txt
CityDetailPage
→ CurrentWeatherCard는 즉시 로드
→ ForecastSection은 dynamic chunk로 로드
→ 로드 중에는 loading UI 표시
```

이 프로젝트의 `loading` 옵션은 예보 섹션이 로드되기 전에도 레이아웃이 갑자기 비어 보이지 않도록 간단한 대체 UI를 제공한다.

## loading fallback

관련 파일: `pages/[city].js` 13-18행, `styles/CityDetail.module.css` 38-65행

dynamic import의 loading fallback은 컴포넌트 코드가 로드되는 동안 표시된다. GraphQL 데이터 로딩 상태와는 다르다.

구분하면 다음과 같다.

```txt
dynamic loading
→ ForecastSection 컴포넌트 코드가 아직 로드되지 않은 상태

GraphQL loading
→ ForecastSection은 로드되었지만 날씨 데이터 요청이 진행 중인 상태
```

`CityDetail.module.css`의 `forecastLoading`, `forecastLoadingTitle`, `forecastLoadingText`는 dynamic loading UI 스타일이다.

## 코드 스플리팅을 과하게 적용하지 않은 이유

코드 스플리팅은 성능 최적화 기법이지만, 무조건 많이 나누는 것이 좋은 것은 아니다.

이 프로젝트에서 고려한 기준은 다음과 같다.

- 메인 페이지와 상세 페이지는 Next.js가 이미 페이지 단위로 분리한다.
- `CurrentWeatherCard`는 상세 페이지 핵심 정보이므로 즉시 로드가 자연스럽다.
- `ForecastSection`은 상대적으로 크고 하위 `ForecastCard`를 포함하므로 분리할 가치가 있다.
- 작은 버튼 컴포넌트까지 dynamic import하면 코드 복잡도에 비해 이점이 작다.

따라서 과제 요구사항을 만족하면서도 구조를 과하게 복잡하게 만들지 않는 수준으로 적용했다.

## JavaScript 문법 포인트

### dynamic import

`pages/[city].js` 11행:

```js
() => import('../components/weather/ForecastSection')
```

일반 import는 파일 상단에서 즉시 로드된다. dynamic import는 함수가 실행될 때 모듈을 비동기로 가져온다.

### arrow function

`loading: () => (...)`는 loading UI를 반환하는 함수다. JSX를 바로 반환하기 위해 괄호를 사용했다.

### default export와 dynamic import

`ForecastSection.js` 85행은 default export다.

```js
export default ForecastSection;
```

`dynamic(() => import(...))`는 기본적으로 해당 모듈의 default export를 컴포넌트로 사용한다.

## 확인 방법

코드 스플리팅 적용 후에는 다음을 확인한다.

```bash
npm run build
```

빌드 결과에서 페이지별 JavaScript bundle이 생성되는지 확인할 수 있다. 브라우저에서는 `/Seoul` 접속 시 현재 날씨와 예보 섹션이 정상 표시되는지 확인한다.

## 정리

Next.js는 기본적으로 페이지 단위 코드 스플리팅을 제공한다. 이 프로젝트에서는 과제 요구사항을 더 명확히 충족하기 위해 상세 페이지의 예보 섹션을 `next/dynamic`으로 추가 분리했다. 핵심 정보는 즉시 로드하고, 상대적으로 큰 UI 블록만 지연 로딩하여 구조와 성능의 균형을 맞췄다.
