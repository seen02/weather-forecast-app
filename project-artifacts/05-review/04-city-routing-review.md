# 04. City Routing Review

## 리뷰 결과

이번 단계의 요구사항은 충족했다.

## 체크리스트

| 항목 | 결과 |
| --- | --- |
| `pages/index.js`가 `SUPPORTED_CITIES` 기반으로 도시 목록 렌더링 | 통과 |
| 도시 항목이 Next.js `Link`로 `city.path`에 연결 | 통과 |
| 도시 선택 UI가 `components/city`로 분리 | 통과 |
| `CityButtonList`가 배열 렌더링 책임 담당 | 통과 |
| `CityButton`이 단일 도시 링크 책임 담당 | 통과 |
| `pages/[city].js`가 `/Seoul`, `/Tokyo`, `/Paris`, `/London` 처리 | 통과 |
| 유효하지 않은 city는 `fallback: false` 및 `notFound`로 404 처리 | 통과 |
| 상세 페이지는 API 호출 없이 placeholder 유지 | 통과 |
| Module CSS 사용 | 통과 |
| ES6, `const`, semicolon 규칙 준수 | 통과 |

## 주의사항

- 현재 상세 페이지의 Current Weather와 5 Day Forecast는 placeholder다.
- `pages/api/hello.js`는 아직 Create Next App 기본 파일로 남아 있으며 GraphQL API 단계에서 교체 또는 제거할 예정이다.

