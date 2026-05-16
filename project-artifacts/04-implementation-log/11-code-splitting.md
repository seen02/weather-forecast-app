# 11. Code Splitting Implementation Log

## 작업 요약

도시 상세 페이지의 5일 예보 영역을 `next/dynamic`으로 동적 import하도록 변경했다.

## 변경 파일

- `pages/[city].js`
  - `ForecastSection` 정적 import 제거
  - `next/dynamic`으로 `ForecastSection` 동적 import 추가
  - 동적 로딩 중 표시할 fallback UI 추가
- `styles/CityDetail.module.css`
  - Forecast fallback UI 스타일 추가

## 구현 의도

Next.js는 페이지 단위 코드 스플리팅을 기본 제공하지만, 과제 요구사항을 명확하게 충족하기 위해 컴포넌트 단위 코드 스플리팅을 추가했다.

5일 예보 영역은 현재 날씨 카드와 독립적인 UI이고 상세 페이지에서만 사용되므로 분리 대상으로 선택했다.

## 검증

- `npm run lint` 통과
- `npm run build` 통과
- 빌드 후 `.next/static/chunks/883...js`에 `ForecastSection`, `ForecastCard` 코드가 별도 chunk로 생성된 것을 확인

## 특이사항

`npm run build` 실행 결과 빌드와 정적 페이지 생성이 정상 완료되었다.

