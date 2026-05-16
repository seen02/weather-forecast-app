# 02. Module CSS, 전역 스타일, 레이아웃 Wrapper 학습 노트

이 문서는 전역 스타일, CSS 변수, Module CSS, 공통 레이아웃 wrapper를 어떻게 구성했는지 정리한 학습 자료다.

## 학습 목표

- 전역 CSS와 CSS Module의 역할 차이를 이해한다.
- 반응형 요구사항인 `1280px`, `800px` 기준이 어디에서 적용되는지 확인한다.
- `PageLayout`이 페이지 공통 구조와 SEO 메타 정보를 담당하는 흐름을 이해한다.
- Figma 디자인 적용 전에도 유지되어야 하는 레이아웃 골격을 파악한다.

## 전역 스타일과 CSS Module의 역할

Next.js에서는 전역 CSS를 `_app.js`에서 import해야 한다. 이 프로젝트에서는 `pages/_app.js` 3-4행에서 `variables.css`와 `globals.css`를 불러온다.

```js
import '../styles/variables.css';
import '../styles/globals.css';
```

전역 CSS는 모든 페이지에 공통으로 적용되는 스타일에 사용한다. 반면 CSS Module은 특정 컴포넌트나 페이지에만 적용되는 스타일을 작성할 때 사용한다.

이 프로젝트의 구분은 다음과 같다.

```txt
styles/variables.css               전역 디자인 토큰
styles/globals.css                 body, html, font, reset
styles/Home.module.css             메인 페이지 전용
styles/CityDetail.module.css       상세 페이지 전용
components/**/*.module.css         컴포넌트 전용
```

## CSS 변수로 디자인 기준 관리

관련 파일: `styles/variables.css`

- 2-11행: 색상 토큰을 정의한다.
- 13-15행: 기본 폰트 패밀리를 정의한다.
- 17행: 최소 레이아웃 폭 `800px`을 정의한다.
- 18행: 최대 레이아웃 폭 `1280px`을 정의한다.
- 19행: 좌우 gutter 기준을 정의한다.

CSS 변수는 같은 값을 여러 CSS 파일에서 반복하지 않기 위해 사용한다. 예를 들어 `var(--layout-min-width)`는 `globals.css`, `PageLayout.module.css`에서 함께 사용된다.

## 800px 최소 폭 구현

관련 파일: `styles/globals.css`, `components/layout/PageLayout.module.css`

`styles/globals.css` 8-16행에서 `html`, `body`의 기본 스타일을 정의한다. 그중 11행에서 `min-width: var(--layout-min-width);`가 적용된다.

```css
body {
  min-width: var(--layout-min-width);
}
```

`components/layout/PageLayout.module.css` 8-14행에서도 `.main`에 같은 최소 폭을 적용한다.

```css
.main {
  width: 100%;
  min-width: var(--layout-min-width);
  max-width: var(--layout-max-width);
  margin: 0 auto;
}
```

이렇게 하면 800px 미만의 화면에서는 레이아웃이 더 줄어들지 않고 가로 스크롤로 볼 수 있다. 과제 요구사항의 “800px 미만일 경우 레이아웃 크기가 더 이상 줄지 않고 스크롤”에 해당한다.

## 1280px 이상 중앙 정렬

`PageLayout.module.css` 11-12행에서 최대 폭과 중앙 정렬이 적용된다.

```css
max-width: var(--layout-max-width);
margin: 0 auto;
```

`--layout-max-width`는 `1280px`이다. 따라서 화면이 1280px보다 넓으면 컨텐츠 영역은 1280px까지만 커지고, 남는 공간은 좌우 margin으로 배분되어 가운데 정렬된다.

`PageLayout.module.css` 16-20행의 media query는 1280px 미만에서 `max-width` 제한을 풀어 화면 너비를 100% 사용하게 한다.

```css
@media (max-width: 1279px) {
  .main {
    max-width: none;
  }
}
```

## PageLayout의 역할

관련 파일: `components/layout/PageLayout.js`

- 1행: `next/head`를 import한다.
- 4행: `title`, `description`, `children`을 props로 받는다.
- 5-7행: 페이지 title과 description 기본값을 만든다.
- 11-15행: `<Head>`로 title, meta description, favicon을 설정한다.
- 17-19행: 공통 page/main wrapper를 적용한다.

`children`은 React에서 컴포넌트 사이에 들어온 내용을 의미한다. 예를 들어 `pages/index.js` 8-31행은 `PageLayout` 안에 메인 페이지 내용을 넣는다.

## 시멘틱 태그 적용

이 단계에서는 단순히 `div`만 사용하는 대신 의미가 있는 태그를 사용했다.

- `PageLayout.js` 18행: 주요 컨텐츠 영역은 `<main>`으로 감싼다.
- `pages/index.js` 9행: 메인 페이지 주요 영역은 `<section>`으로 작성한다.
- `pages/index.js` 20행: 도시 선택 영역은 `<nav>`로 작성한다.
- `pages/[city].js` 38행: 상세 페이지 상단은 `<header>`로 작성한다.

시멘틱 태그는 화면 구조를 명확하게 만들고, 접근성 도구가 페이지를 이해하는 데 도움을 준다.

## JavaScript / JSX 문법 포인트

### props destructuring

`PageLayout.js` 4행은 함수 인자에서 props를 바로 구조 분해한다.

```js
const PageLayout = ({ title = 'Weather Forecast', description, children }) => {
```

`title = 'Weather Forecast'`는 기본값이다. 부모 컴포넌트가 title을 넘기지 않으면 기본 title을 사용한다.

### Fragment

`PageLayout.js` 10행의 `<>...</>`는 React Fragment다. JSX는 하나의 부모 요소를 반환해야 하므로, 실제 DOM 요소를 추가하지 않고 여러 요소를 묶을 때 사용한다.

## 정리

이 단계의 핵심은 프로젝트 전체의 시각적 기준을 먼저 고정한 것이다. 전역 CSS는 폰트, body, 최소 폭 같은 공통 기준을 담당하고, CSS Module은 페이지와 컴포넌트별 스타일을 격리한다. 이 구조 덕분에 이후 Figma 디자인 적용 단계에서도 전체 반응형 기준은 유지하면서 개별 화면 스타일만 수정할 수 있었다.
