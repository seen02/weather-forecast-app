# Paris, London 예보 슬롯 표시 수정

## 수정 배경

도시별 timezone 보정 이후 Seoul, Tokyo처럼 UTC offset이 3시간 단위와 맞는 도시는 `03:00`, `06:00`, `09:00`, `12:00`, `15:00`, `18:00`, `21:00` 슬롯이 정확히 존재했다.

하지만 Paris와 London은 daylight saving time 기준으로 각각 UTC+2, UTC+1이 적용될 수 있다. OpenWeather forecast는 3시간 단위 UTC 예보를 제공하므로, 로컬 시간으로 변환하면 Paris는 `02:00`, `05:00`, `08:00`처럼, London은 `01:00`, `04:00`, `07:00`처럼 슬롯이 어긋날 수 있다.

기존 로직은 `03/06/09/12/15/18/21`과 정확히 일치하는 슬롯만 사용했기 때문에 Paris와 London에서 예보 데이터가 모두 필터링되어 `No forecast data.`가 표시되었다.

## 수정 내용

- 각 날짜의 표시 기준 시간은 기존처럼 `03/06/09/12/15/18/21`로 유지했다.
- 정확히 같은 시간이 없는 도시는 해당 표시 시간과 가장 가까운 OpenWeather 예보 슬롯을 매핑하도록 변경했다.
- 예보 row에는 화면 표시용 `displayTime`을 추가해 UI는 항상 `03:00am`부터 `21:00pm`까지 고정된 순서로 표시한다.
- 같은 예보 슬롯이 여러 표시 시간에 중복 매핑되지 않도록 사용한 `dateTime`은 제외한다.
- Jest 테스트에 Paris처럼 로컬 슬롯이 `02/05/08/11/14/17/20/23`으로 밀리는 케이스를 추가했다.

## 영향 범위

- `utils/forecast.js`
- `components/weather/ForecastCard.js`
- `__tests__/utils/forecast.test.js`

## 확인 기준

Paris와 London 상세 페이지에서 5 Day Forecast를 펼쳤을 때 `No forecast data.`가 표시되지 않아야 한다.

각 날짜의 시간 row는 아래 순서로 표시되어야 한다.

```txt
03:00am
06:00am
09:00am
12:00pm
15:00pm
18:00pm
21:00pm
```

## 검증 결과

다음 명령으로 정적 검증을 완료했다.

```txt
npm run lint   통과
npm test       통과
npm run build  통과
```

실제 GraphQL 응답을 기준으로 Seoul, Tokyo, Paris, London의 forecast 데이터를 확인했다.

```txt
Seoul  groups=6
Tokyo  groups=6
Paris  groups=6
London groups=6
```

Paris와 London도 날짜별 예보 그룹이 생성되어 `No forecast data.` 상태가 발생하지 않는 것을 확인했다.

Seoul의 20일, 21일 예보도 도시 로컬 시간 기준으로 아래 슬롯에 매핑되는 것을 확인했다.

```txt
03:00
06:00
09:00
12:00
15:00
18:00
21:00
```
