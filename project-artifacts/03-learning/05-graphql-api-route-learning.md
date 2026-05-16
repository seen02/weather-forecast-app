# 05. GraphQL API Route 구성 학습 노트

이 문서는 Next.js API Route에서 GraphQL endpoint를 구성한 방식과 schema, resolver, service의 역할을 정리한 학습 자료다.

## 학습 목표

- GraphQL endpoint가 REST endpoint와 어떻게 다른지 이해한다.
- Next.js API Route가 서버 코드로 동작하는 위치를 파악한다.
- schema와 resolver의 역할을 구분한다.
- 프론트엔드가 OpenWeather API를 직접 호출하지 않고 GraphQL API를 통해 데이터를 받는 흐름을 이해한다.

## 전체 흐름

이 프로젝트의 GraphQL 요청 흐름은 다음과 같다.

```txt
Browser
→ Apollo Client
→ POST /api/graphql
→ pages/api/graphql.js
→ server/graphql/schema.js
→ server/graphql/resolvers.js
→ server/services/openWeatherService.js
→ OpenWeather API
```

Spring Boot 관점으로 보면 다음처럼 비교할 수 있다.

```txt
Next.js API Route       ≈ Controller
GraphQL schema          ≈ 요청/응답 계약
GraphQL resolver        ≈ Controller method + service 호출 연결부
OpenWeather service     ≈ 외부 API 연동 Service
```

REST에서는 `/api/weather/current?city=Seoul`, `/api/weather/forecast?city=Seoul`처럼 여러 endpoint를 만들 수 있다. GraphQL에서는 `/api/graphql` 하나의 endpoint에 query 본문을 보내고, 필요한 필드를 query 안에서 선택한다.

## API Route handler

관련 파일: `pages/api/graphql.js`

- 1행: `graphql` 실행 함수를 가져온다.
- 2행: resolver 객체인 `rootValue`를 가져온다.
- 3행: GraphQL schema를 가져온다.
- 5행: 허용 HTTP method를 `POST`로 제한한다.
- 15행: Next.js API Route handler를 async 함수로 정의한다.
- 16-25행: POST가 아닌 요청은 405로 응답한다.
- 28행: request body에서 `query`, `variables`, `operationName`을 꺼낸다.
- 30-38행: query가 없으면 400으로 응답한다.
- 40-46행: GraphQL 실행 함수에 schema, query, resolver, variables를 넘긴다.
- 48-50행: GraphQL 결과를 JSON으로 반환한다.

핵심은 `pages/api/graphql.js`가 직접 날씨 데이터를 만드는 것이 아니라, GraphQL 실행 환경을 준비하고 resolver에 연결한다는 점이다.

## Request body 파싱

관련 파일: `pages/api/graphql.js` 7-13행

```js
const parseRequestBody = (body) => {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
};
```

Next.js API Route에서는 요청 body가 이미 객체로 들어올 수 있고, 테스트나 환경에 따라 문자열일 수도 있다. 이 함수는 두 경우를 모두 처리하기 위한 방어 코드다.

## GraphQL schema

관련 파일: `server/graphql/schema.js`

schema는 GraphQL API의 계약이다. 프론트엔드가 어떤 query를 보낼 수 있고, 어떤 필드를 받을 수 있는지 정의한다.

주요 타입은 다음과 같다.

- 4-10행: `City`
- 12-20행: `CurrentWeather`
- 22-29행: `ForecastWeather`
- 31-36행: `WeatherByCity`
- 38-42행: `Query`

`Query` 타입의 핵심 필드는 41행이다.

```graphql
weatherByCity(city: String!): WeatherByCity!
```

`String!`의 `!`는 필수 값을 의미한다. 즉 `city` 변수는 반드시 문자열로 들어와야 한다. 반환 타입 `WeatherByCity!`도 null이 아닌 값을 반환해야 한다는 의미다.

## GraphQL resolver

관련 파일: `server/graphql/resolvers.js`

- 1행: 도시 상수 helper를 가져온다.
- 2행: OpenWeather service를 가져온다.
- 4행: `rootValue` 객체를 export한다.
- 5-7행: `supportedCities` query 처리
- 8-10행: `city(name: String!)` query 처리
- 11-13행: `weatherByCity(city: String!)` query 처리

resolver는 schema에 정의된 query 이름과 같은 이름의 함수를 제공한다. 예를 들어 GraphQL query에서 `weatherByCity`를 요청하면 `rootValue.weatherByCity`가 실행된다.

## GraphQL 요청 예시

PowerShell에서 GraphQL 요청을 테스트할 때는 `/api/graphql`로 POST 요청을 보내면 된다.

```powershell
$body = @{
  query = @"
    query WeatherByCity($city: String!) {
      weatherByCity(city: $city) {
        city
        country
        current {
          temperature
          description
        }
      }
    }
"@
  variables = @{
    city = "Seoul"
  }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
  -Uri "http://localhost:3000/api/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

REST API 테스트에서는 URL과 method가 중요하고, GraphQL 테스트에서는 endpoint는 고정된 채 query 본문이 중요하다.

## JavaScript 문법 포인트

### async / await

`pages/api/graphql.js` 15행과 40행에서 async/await를 사용한다.

```js
const handler = async (req, res) => {
  const result = await graphql(...);
};
```

비동기 작업을 순차적으로 읽을 수 있게 작성하는 문법이다. `graphql` 실행 결과가 준비될 때까지 기다린 뒤 다음 줄을 실행한다.

### try / catch

`pages/api/graphql.js` 27-59행은 GraphQL 실행 중 발생한 에러를 잡아 JSON 응답으로 변환한다. API Route에서는 예외가 그대로 터지는 것보다 일정한 응답 형식으로 내려주는 것이 프론트엔드 처리에 유리하다.

### object destructuring

`pages/api/graphql.js` 28행:

```js
const { query, variables, operationName } = parseRequestBody(req.body);
```

객체에서 필요한 속성만 꺼내는 문법이다. Spring Boot의 DTO 바인딩과 목적은 비슷하지만, JavaScript에서는 객체 구조 분해로 간단히 꺼낼 수 있다.

## 정리

GraphQL API Route는 프론트엔드와 OpenWeather API 사이의 중간 계층이다. 프론트엔드는 `/api/graphql`에 query를 보내고, Next.js API Route는 schema와 resolver를 통해 필요한 데이터를 조합한다. 이 구조 덕분에 API Key와 외부 API 구조를 클라이언트에 직접 노출하지 않고, 화면에 필요한 형태의 데이터만 전달할 수 있다.
