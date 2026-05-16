# 02. Module CSS, Global Styles, Layout Wrapper Implementation Log

## 변경 범위

이번 단계에서는 전역 스타일, CSS 변수, 공통 레이아웃 wrapper를 구성했다.

## 추가한 파일

- `styles/variables.css`
  - 색상, 폰트, 레이아웃 최소/최대 너비, gutter 변수 정의
- `components/layout/PageLayout.js`
  - 모든 페이지의 공통 wrapper
  - `Head`, `Header`, `main` 구조 제공
- `components/layout/PageLayout.module.css`
  - `1280px` 최대 너비, `800px` 최소 너비, 가운데 정렬, 가로 스크롤 정책 관리
- `components/layout/Header.js`
  - 공통 상단 header
- `components/layout/Header.module.css`
  - header 내부 폭 정책과 브랜드 스타일 정의

## 수정한 파일

- `pages/_app.js`
  - `variables.css`와 `globals.css`를 전역 import
- `pages/index.js`
  - Create Next App 기본 화면 제거
  - `PageLayout` 적용
  - `section`, `h1` 기반 시멘틱 구조 적용
- `styles/globals.css`
  - reset, 기본 font, `body` 최소 너비, `box-sizing`만 유지
- `styles/Home.module.css`
  - 메인 페이지 전용 스타일만 남기도록 정리

## 반응형 기준

공통 레이아웃 폭 정책은 `PageLayout.module.css`와 `Header.module.css`에서 관리한다.

- `1280px 이상`: `max-width: var(--layout-max-width)`, `margin: 0 auto`
- `800px 이상 1280px 미만`: `max-width: none`, `width: 100%`
- `800px 미만`: `min-width: var(--layout-min-width)`, `overflow-x: auto`

## 다음 단계

다음 단계에서는 `constants/cities.js`를 추가하여 지원 도시 목록과 route path를 중앙에서 관리한다.

