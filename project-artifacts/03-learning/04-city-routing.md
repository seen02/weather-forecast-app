# 04. 메인 페이지와 도시 상세 라우팅 학습 노트

이 문서는 메인 페이지에서 도시 버튼을 클릭했을 때 상세 페이지로 이동하는 흐름과, Next.js 동적 라우팅을 어떻게 사용했는지 정리한 학습 자료다.

## 학습 목표

- Next.js의 파일 기반 라우팅과 동적 라우팅을 이해한다.
- `Link`, `getStaticPaths`, `getStaticProps`의 역할을 구분한다.
- 메인 페이지와 상세 페이지가 도시 상수를 공유하는 흐름을 이해한다.
- 정적 생성 방식이 이 과제에 적합한 이유를 정리한다.

## 메인 페이지 라우팅 흐름

관련 파일: `pages/index.js`

- 1행: 도시 버튼 목록 컴포넌트를 import한다.
- 3행: 지원 도시 목록 `SUPPORTED_CITIES`를 import한다.
- 8행: 공통 레이아웃인 `PageLayout`으로 페이지를 감싼다.
- 20-22행: 도시 선택 영역을 `<nav>`로 구성한다.
- 21행: `CityButtonList`에 도시 배열을 전달한다.

도시 버튼 자체는 `components/city/CityButton.js`에서 만든다.

- 1행: Next.js의 `Link`를 import한다.
- 6행: `href={city.path}`로 이동 경로를 지정한다.
- 7-9행: 실제 클릭 가능한 `<a>`를 렌더링한다.

Next.js 12에서는 `Link` 안에 `<a>`를 넣는 방식이 일반적이다. 사용자가 Seoul 버튼을 클릭하면 `city.path` 값인 `/Seoul`로 이동한다.

## 동적 라우트 파일

관련 파일: `pages/[city].js`

파일 이름이 `[city].js`이기 때문에 이 파일은 동적 라우트로 동작한다.

```txt
pages/[city].js
→ /Seoul
→ /Tokyo
→ /Paris
→ /London
```

대괄호 안의 `city`는 URL 파라미터 이름이다. `/Seoul`로 접근하면 `params.city` 값은 `"Seoul"`이 된다.

## getStaticPaths

관련 파일: `pages/[city].js` 63-72행

`getStaticPaths`는 빌드 시점에 어떤 동적 페이지를 미리 만들지 알려주는 함수다.

```js
export const getStaticPaths = () => {
  return {
    paths: SUPPORTED_CITIES.map((city) => ({
      params: {
        city: city.name,
      },
    })),
    fallback: false,
  };
};
```

여기서는 `SUPPORTED_CITIES`에 있는 도시만 상세 페이지로 생성한다. `fallback: false`는 목록에 없는 경로를 404로 처리하겠다는 의미다. 과제에서 요구한 도시가 고정되어 있으므로 이 방식이 적합하다.

Spring Boot와 비교하면, `getStaticPaths`는 Controller의 경로 매핑이라기보다는 “빌드 시점에 어떤 URL 결과물을 만들어 둘지 선언하는 단계”에 가깝다.

## getStaticProps

관련 파일: `pages/[city].js` 74-88행

`getStaticProps`는 정적 페이지에 필요한 props를 준비한다.

```js
export const getStaticProps = ({ params }) => {
  const city = getCityByName(params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
    },
  };
};
```

이 프로젝트에서는 `params.city`로 도시 정보를 조회하고, 찾은 도시 객체를 페이지 컴포넌트에 props로 전달한다. 실제 날씨 데이터는 빌드 시점이 아니라 브라우저에서 Apollo Client를 통해 가져온다.

## 상세 페이지 렌더링 흐름

관련 파일: `pages/[city].js`

- 22행: `CityDetailPage` 컴포넌트는 `city` props를 받는다.
- 23-27행: Apollo `useQuery`로 GraphQL 요청을 실행한다.
- 28-30행: 응답 데이터에서 현재 날씨와 예보 데이터를 꺼낸다.
- 33-59행: 공통 레이아웃 안에서 현재 날씨와 예보 컴포넌트를 렌더링한다.

즉 상세 페이지는 라우팅 정보로 도시를 결정하고, 런타임 GraphQL 요청으로 날씨 데이터를 가져온다.

## JavaScript / Next.js 문법 포인트

### 화살표 함수

`pages/[city].js` 22행:

```js
const CityDetailPage = ({ city }) => {
```

화살표 함수는 함수를 짧게 작성하는 문법이다. React 함수형 컴포넌트도 화살표 함수로 작성할 수 있다.

### optional chaining

`pages/[city].js` 28-30행:

```js
const weather = data?.weatherByCity;
const currentWeather = weather?.current;
```

`?.`는 값이 `null` 또는 `undefined`일 수 있을 때 안전하게 접근하는 문법이다. 데이터 로딩 전에는 `data`가 없을 수 있으므로 필요하다.

### props

`getStaticProps`가 반환한 `props.city`는 `CityDetailPage`의 인자로 전달된다. 이 흐름은 서버/빌드 단계에서 준비한 데이터를 페이지 컴포넌트가 받는 방식이다.

## 이 단계에서 확인할 동작

- `/` 접속 시 메인 페이지가 표시된다.
- Seoul 버튼 클릭 시 `/Seoul`로 이동한다.
- `/Tokyo`, `/Paris`, `/London` 경로가 동작한다.
- 지원하지 않는 도시는 `fallback: false`에 의해 404 처리된다.

## 정리

이 단계에서는 도시 선택과 상세 페이지 이동 구조를 완성했다. Next.js의 파일 기반 라우팅 덕분에 별도의 라우터 설정 파일 없이 `pages/index.js`, `pages/[city].js`만으로 메인 페이지와 도시 상세 페이지를 구성할 수 있었다. 고정된 도시 목록은 `getStaticPaths`와 잘 맞기 때문에 빌드 시점에 필요한 상세 경로를 명확하게 만들 수 있다.
