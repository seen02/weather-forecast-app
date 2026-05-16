# 02. Module CSS, Global Styles, Layout Wrapper Review

## 리뷰 결과

이번 단계의 주요 요구사항은 충족했다.

## 체크리스트

| 구분 | 결과 | 확인 내용 |
| --- | --- | --- |
| `PageLayout` 존재 | 통과 | `components/layout/PageLayout.js` 추가 |
| `Header` 분리 | 통과 | `components/layout/Header.js` 추가 |
| 전역 CSS 최소화 | 통과 | `globals.css`는 reset과 기본 스타일만 유지 |
| CSS 변수 분리 | 통과 | `styles/variables.css` 추가 |
| CSS Module 사용 | 통과 | `PageLayout.module.css`, `Header.module.css`, `Home.module.css` 사용 |
| className camelCase | 통과 | `.inner`, `.brand`, `.intro`, `.eyebrow` 등 camelCase 또는 단일 단어 사용 |
| 시멘틱 구조 | 통과 | `header`, `main`, `section`, `h1` 사용 |
| 1280px 이상 | 통과 | `max-width: var(--layout-max-width)`와 가운데 정렬 적용 |
| 800px 이상 1280px 미만 | 통과 | `max-width: none`, `width: 100%` 적용 |
| 800px 미만 | 통과 | `min-width: var(--layout-min-width)`와 `overflow-x: auto` 적용 |
| Create Next App 기본 화면 제거 | 통과 | 기본 docs/link/Vercel 화면 제거 |

## 남은 주의사항

- 현재 메인 페이지는 레이아웃 확인용 최소 콘텐츠만 포함한다.
- 도시 버튼 구현은 다음 단계에서 `constants/cities.js`와 함께 진행한다.
- `pages/api/hello.js`는 Create Next App 기본 API Route이므로 GraphQL API 구현 단계에서 제거하거나 교체한다.

