# 12. Jest Tests QA

## 실행 명령

```bash
npm test
npm run lint
npm run build
```

## 결과

- `npm test`: 통과
- `npm run lint`: 통과
- `npm run build`: 통과

## 테스트 결과

```txt
Test Suites: 3 passed, 3 total
Tests: 9 passed, 9 total
Snapshots: 0 total
```

## 테스트 범위

- `utils/forecast.js`
  - 3시간 forecast 데이터의 날짜별 summary 변환
  - 날짜별 accordion group 변환
  - forecast 날짜/시간 포맷
- `utils/weather.js`
  - 온도 포맷
  - 풍속 포맷
  - 현재 날씨 날짜/시간 포맷
- `constants/cities.js`
  - 과제 요구 도시 목록
  - route path
  - 도시 조회 및 지원 여부 검증

## 남은 확인 항목

브라우저에서 기존 기능이 정상 동작하는지 수동으로 확인한다.

```txt
http://localhost:3000
http://localhost:3000/Seoul
http://localhost:3000/Tokyo
http://localhost:3000/Paris
http://localhost:3000/London
```

