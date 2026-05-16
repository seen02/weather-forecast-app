# 03. City List Constants Review

## 리뷰 결과

이번 단계의 요구사항은 충족했다.

## 체크리스트

| 항목 | 결과 |
| --- | --- |
| `constants/cities.js` 존재 | 통과 |
| `SUPPORTED_CITIES` named export | 통과 |
| 단순 문자열 배열이 아닌 도시 메타데이터 구조 | 통과 |
| `name`, `displayName`, `path` 포함 | 통과 |
| `/Seoul`, `/Tokyo`, `/Paris`, `/London` 요구 경로와 일치 | 통과 |
| 허용 도시 검증 함수 존재 | 통과 |
| 검증 함수가 `SUPPORTED_CITIES` 기준으로 동작 | 통과 |
| `pages/index.js`가 하드코딩 대신 상수를 참조 | 통과 |
| ES6 import/export 사용 | 통과 |
| `const`, single quote, semicolon 규칙 준수 | 통과 |

## 주의사항

- 아직 도시 버튼과 상세 페이지 라우팅은 구현하지 않았다.
- 다음 단계에서 `city.path`를 사용해 링크를 생성해야 한다.
- GraphQL resolver 단계에서도 `isSupportedCity`를 재사용해 서버 측 검증을 추가해야 한다.

