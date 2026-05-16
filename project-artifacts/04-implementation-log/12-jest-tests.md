# 12. Jest Tests Implementation Log

## 작업 요약

Jest 기반 단위 테스트 환경을 구성하고, 순수 함수 및 상수 테스트를 추가했다.

## 변경 파일

- `package.json`
  - `test` script 추가
  - `jest` dev dependency 추가
- `package-lock.json`
  - Jest 설치에 따른 lockfile 갱신
- `jest.config.js`
  - `next/jest` 기반 Jest 설정 추가
- `__tests__/utils/forecast.test.js`
  - forecast 날짜별 summary, accordion group, 날짜/시간 포맷 테스트 추가
- `__tests__/utils/weather.test.js`
  - 온도, 풍속, 현재 날씨 날짜/시간 포맷 테스트 추가
- `__tests__/constants/cities.test.js`
  - 지원 도시 목록, route, 도시 조회 함수 테스트 추가
- `.github/workflows/ci.yml`
  - CI에서 `npm test` 실행 단계 추가

## 구현 의도

외부 API를 직접 호출하지 않고, 프로젝트 내부 순수 함수와 상수 검증부터 테스트했다.

테스트 우선순위는 프로젝트 지침에 맞춰 `utils/forecast.js`, `utils/weather.js`, `constants/cities.js` 순서로 잡았다.

## 검증

- `npm test` 통과
- `npm run lint` 통과
- `npm run build` 통과

## 특이사항

`npm install --save-dev jest@29.7.0` 실행 후 npm audit 결과로 2개 취약점 알림이 출력되었다.

- 1 moderate
- 1 critical

이번 단계에서는 테스트 추가가 목적이므로 자동 수정은 수행하지 않았다. `npm audit fix --force`는 의존성 major 변경 가능성이 있어 별도 판단이 필요하다.

