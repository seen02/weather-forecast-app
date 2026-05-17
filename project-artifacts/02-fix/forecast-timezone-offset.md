# 도시별 예보 시간 보정 수정

## 수정 배경

OpenWeather forecast API의 `dt` 값은 UTC 기준 timestamp다. 기존 코드는 이 값을 `toISOString()`으로 변환해 `Z`가 붙은 UTC 시간으로 저장했고, 예보 그룹/표시 로직도 UTC 시간을 기준으로 동작했다.

이 때문에 서울 예보를 볼 때 `2026-05-18T00:00:00.000Z`가 화면상 00시처럼 해석되었지만, 실제 서울 현지 시각으로는 09시 예보에 해당했다.

## 수정 내용

- OpenWeather 응답의 `forecastData.city.timezone` 값을 우선 사용하고, fallback으로 `currentData.timezone`을 사용하도록 했다.
- `dt + timezoneOffsetSeconds` 방식으로 각 도시의 로컬 예보 시각을 계산했다.
- 서버에서 내려주는 `forecast.dateTime`과 `current.measuredAt`은 도시 로컬 시각 기준 문자열로 변환했다.
- 프론트 예보 유틸은 `Date#getUTCHours()` 대신 로컬 시각 문자열의 시간 부분을 직접 읽도록 변경했다.
- 날짜 그룹도 UTC 날짜가 아니라 도시 로컬 날짜 기준으로 묶도록 변경했다.

## 영향 범위

- `server/services/openWeatherService.js`
- `utils/forecast.js`
- `__tests__/utils/forecast.test.js`

## 확인 기준

서울 기준으로 OpenWeather의 UTC 예보가 다음처럼 보정되어야 한다.

```txt
UTC 18:00 → Seoul 03:00
UTC 21:00 → Seoul 06:00
UTC 00:00 → Seoul 09:00
UTC 03:00 → Seoul 12:00
UTC 06:00 → Seoul 15:00
UTC 09:00 → Seoul 18:00
UTC 12:00 → Seoul 21:00
```

따라서 날짜별 예보를 펼쳤을 때 화면에는 도시 로컬 시간 기준으로 아래 순서가 표시되어야 한다.

```txt
03:00am
06:00am
09:00am
12:00pm
15:00pm
18:00pm
21:00pm
```

## 추가 검증

실제 Seoul GraphQL 응답에서 20일, 21일 예보가 UTC가 아닌 도시 로컬 시간 기준으로 내려오는 것을 확인했다.

예시는 다음과 같다.

```txt
2026-05-20T03:00:00.000
2026-05-20T06:00:00.000
2026-05-20T09:00:00.000
2026-05-20T12:00:00.000
2026-05-20T15:00:00.000
2026-05-20T18:00:00.000
2026-05-20T21:00:00.000
```
