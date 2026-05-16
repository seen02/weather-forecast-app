# 07. Apollo Client 연결 학습 노트

이 문서는 프론트엔드에서 GraphQL API를 호출하기 위해 Apollo Client를 연결한 방식을 정리한 학습 자료다.

## 학습 목표

- Apollo Client가 GraphQL 요청을 보내는 클라이언트 계층임을 이해한다.
- `ApolloProvider`와 `useQuery`의 역할을 구분한다.
- GraphQL query 문서와 variables가 어떻게 API Route로 전달되는지 이해한다.
- loading, error, data 상태를 UI 컴포넌트에 넘기는 흐름을 파악한다.

## Apollo Client의 위치

이 프로젝트의 GraphQL 클라이언트 흐름은 다음과 같다.

```txt
pages/_app.js
→ ApolloProvider
→ pages/[city].js
→ useQuery(WEATHER_BY_CITY_QUERY)
→ graphql/client.js
→ POST /api/graphql
```

Apollo Client는 브라우저에서 GraphQL 요청을 만들고, 응답 데이터를 React 컴포넌트에서 사용할 수 있게 해준다.

## Apollo Client 설정

관련 파일: `graphql/client.js`

- 1행: `ApolloClient`, `HttpLink`, `InMemoryCache`를 import한다.
- 3행: Apollo Client 인스턴스를 생성한다.
- 4-6행: GraphQL endpoint를 `/api/graphql`로 지정한다.
- 7행: Apollo의 기본 메모리 캐시를 설정한다.

```js
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: '/api/graphql',
  }),
  cache: new InMemoryCache(),
});
```

`HttpLink`는 GraphQL 요청을 HTTP로 보낼 위치를 지정한다. 여기서는 OpenWeather API가 아니라 프로젝트 내부의 `/api/graphql`로 요청한다.

## ApolloProvider

관련 파일: `pages/_app.js`

- 1행: `ApolloProvider`를 import한다.
- 2행: 설정한 `apolloClient`를 가져온다.
- 8-10행: 모든 페이지를 `ApolloProvider`로 감싼다.

```js
<ApolloProvider client={apolloClient}>
  <Component {...pageProps} />
</ApolloProvider>
```

React Context를 통해 하위 컴포넌트들이 Apollo Client에 접근할 수 있게 하는 구조다. 이 wrapper가 없으면 `useQuery`가 어떤 client를 사용해야 하는지 알 수 없다.

## GraphQL query 문서

관련 파일: `graphql/queries.js`

- 1행: `gql`을 import한다.
- 3-27행: `WEATHER_BY_CITY_QUERY`를 정의한다.

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

GraphQL의 장점은 화면에 필요한 필드를 query에서 명시할 수 있다는 점이다. 이 프로젝트에서는 현재 날씨 카드와 예보 아코디언에 필요한 필드만 요청한다.

## useQuery로 데이터 가져오기

관련 파일: `pages/[city].js` 22-30행

```js
const { data, error, loading } = useQuery(WEATHER_BY_CITY_QUERY, {
  variables: {
    city: city.name,
  },
});
```

`useQuery`는 React Hook이다. 컴포넌트가 렌더링될 때 GraphQL 요청을 실행하고, 요청 상태를 `loading`, `error`, `data`로 제공한다.

이 프로젝트에서는 `city.name`을 GraphQL variable로 전달한다. `/Seoul` 페이지라면 `city.name`은 `"Seoul"`이고, GraphQL resolver는 해당 도시의 날씨 데이터를 가져온다.

## UI 컴포넌트로 상태 전달

관련 파일: `pages/[city].js` 45-56행

현재 날씨 카드에는 다음 props를 전달한다.

- `city`: 도시 표시 정보
- `hasError`: 에러 여부
- `isLoading`: 로딩 여부
- `weather`: 현재 날씨 데이터

예보 영역에는 다음 props를 전달한다.

- `forecasts`: 날짜별로 묶은 예보 데이터
- `hasError`: 에러 여부
- `isLoading`: 로딩 여부

이렇게 page 컴포넌트가 데이터 요청을 담당하고, 하위 UI 컴포넌트는 props 기반 표시를 담당하도록 역할을 나누었다.

## JavaScript / React 문법 포인트

### Hook

`useQuery`는 React Hook이다. Hook은 함수형 컴포넌트 안에서 상태나 외부 기능을 사용할 수 있게 해주는 함수다. `useQuery`는 내부적으로 요청 상태를 관리한다.

### destructuring

`pages/[city].js` 23행:

```js
const { data, error, loading } = useQuery(...);
```

GraphQL 요청 결과 객체에서 필요한 값만 꺼낸다.

### GraphQL variables

GraphQL query 안의 `$city`는 variables 객체로 전달된다.

```js
variables: {
  city: city.name,
}
```

REST에서 query parameter나 path variable을 사용하는 것처럼, GraphQL에서는 variables를 통해 동적인 값을 넘긴다.

## 이 구조의 장점

- API endpoint는 `/api/graphql` 하나로 고정된다.
- 화면에서 필요한 필드를 query에서 명확하게 볼 수 있다.
- 로딩, 에러, 성공 상태를 UI 컴포넌트로 분리해서 처리할 수 있다.
- API Key가 브라우저에 직접 노출되지 않는다.

## 정리

Apollo Client는 프론트엔드와 GraphQL API Route를 연결하는 계층이다. `_app.js`에서 Provider를 한 번 설정하고, 상세 페이지에서 `useQuery`로 필요한 데이터를 가져온다. 이 구조 덕분에 UI 컴포넌트는 네트워크 요청 방식보다 전달받은 props를 어떻게 보여줄지에 집중할 수 있다.
