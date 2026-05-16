# 10. Figma 디자인 시안 적용 학습 노트

이 문서는 Figma 시안을 실제 Next.js 화면에 적용하며 확인한 디자인 구현 방식과 CSS 구조를 정리한 학습 자료다.

## 학습 목표

- Figma에서 제공된 px 기반 시안을 CSS로 옮기는 과정을 이해한다.
- Pretendard font를 프로젝트에 적용한 방식을 파악한다.
- 디자인 토큰, CSS Module, 전역 스타일이 함께 사용되는 구조를 이해한다.
- 시안의 고정 폭 디자인을 과제의 반응형 요구사항과 함께 맞추는 방식을 정리한다.

## 디자인 적용의 기준

시안은 크게 세 화면으로 구성되어 있었다.

- 메인 페이지
- 도시 상세 페이지, 5일 예보 접힘 상태
- 도시 상세 페이지, 특정 날짜 예보 펼침 상태

이 프로젝트에서는 시안의 주요 시각 요소를 다음 코드 영역에 반영했다.

```txt
styles/Home.module.css
styles/CityDetail.module.css
components/weather/CurrentWeatherCard.module.css
components/weather/ForecastSection.module.css
components/weather/ForecastCard.module.css
components/city/CityButton.module.css
styles/variables.css
styles/globals.css
```

## Pretendard font 적용

관련 파일: `styles/globals.css`

- 1-6행: `@font-face`로 Pretendard font를 등록한다.
- 3행: `public/fonts/PretendardVariable.woff2`를 참조한다.
- 4행: `font-display: block`을 사용한다.
- 5행: variable font의 weight 범위를 지정한다.

```css
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/PretendardVariable.woff2') format('woff2');
  font-display: block;
  font-weight: 100 900;
}
```

`font-display: block`은 웹폰트가 로드되기 전 fallback font가 잠깐 보이는 현상을 줄이기 위한 선택이다. 대신 폰트 로드 전 텍스트 표시가 잠시 지연될 수 있다.

## 디자인 토큰

관련 파일: `styles/variables.css`

Figma 시안에서 반복되는 색상과 레이아웃 값을 CSS 변수로 정리했다.

- 2행: 배경색 `#faf7f5`
- 3행: 카드 배경 `#ffffff`
- 4행: 아이콘 원형 배경 `#ffd2cc`
- 5행: 기본 텍스트 `#3d3d3d`
- 7행: 보조 텍스트 `#8b8b8b`
- 8행: border `#dfdfdf`
- 9행: 포인트 컬러 `#ff0045`
- 17행: 최소 폭 `800px`
- 18행: 최대 폭 `1280px`

Figma 값을 CSS 변수로 올려두면, 여러 컴포넌트에서 같은 색을 반복해 적지 않아도 된다.

## 메인 페이지 디자인

관련 파일: `pages/index.js`, `styles/Home.module.css`

`pages/index.js`는 구조를 담당하고, `Home.module.css`는 시각 배치를 담당한다.

- `pages/index.js` 9행: 메인 페이지 section
- 10-18행: title group
- 20-22행: 도시 버튼 nav
- 24-29행: hero image 영역

`Home.module.css`에서 시안 위치를 맞춘 주요 부분은 다음과 같다.

- 1-5행: 메인 페이지 전체 높이와 배경
- 7-17행: title group 위치
- 19-30행: 큰 제목 스타일
- 45-51행: 도시 버튼 nav 위치
- 53-60행: hero image 영역
- 62-73행: globe 표현
- 75-156행: cloud 표현

실제 이미지 파일을 사용하지 않고 CSS와 emoji를 조합해 시안의 분위기를 맞췄다. 과제의 핵심은 OpenWeather API와 Next.js/GraphQL 구현이므로, 디자인 시안의 레이아웃과 톤을 맞추는 데 집중했다.

## 도시 버튼 디자인

관련 파일: `components/city/CityButton.js`, `components/city/CityButton.module.css`

`CityButton.js`는 Next.js `Link`로 이동 기능을 담당하고, CSS Module은 버튼 스타일을 담당한다.

- `CityButton.js` 6행: `city.path`로 이동 경로 설정
- `CityButton.module.css` 1-14행: 기본 버튼 스타일
- 16-20행: hover/focus 상태
- 22-27행: label typography

Figma 시안의 버튼은 흰 배경, 핑크 border, 6px radius, 40px 높이를 가진다. 이 값들을 CSS로 반영했다.

## 상세 페이지 디자인

관련 파일: `styles/CityDetail.module.css`

- 1-5행: 상세 페이지 배경과 padding
- 7-12행: 헤더 정렬
- 14-20행: 상단 아이콘
- 22-30행: 페이지 제목
- 32-36행: 현재 날씨 카드와 예보 섹션 사이 간격

상세 페이지는 시안처럼 위쪽에는 제목과 현재 날씨 카드가 있고, 아래쪽에는 5일 예보 아코디언이 이어지는 구조다.

## 현재 날씨 카드 디자인

관련 파일: `components/weather/CurrentWeatherCard.module.css`

- 1-12행: 카드 전체를 grid로 구성
- 14-28행: 원형 날씨 아이콘
- 30-35행: 날짜/도시 정보 column
- 53-71행: 도시명과 인구수
- 73-88행: 오른쪽 온도 영역
- 105-114행: 체감 온도, 설명, 풍속, 습도 문구

Figma 시안에서 현재 날씨 카드는 왼쪽에 아이콘, 가운데에 도시 정보, 오른쪽에 온도 정보가 배치된다. CSS Grid의 `grid-template-columns: 80px 1fr auto`로 이 구조를 만들었다.

## 5일 예보 디자인

관련 파일: `components/weather/ForecastSection.module.css`, `components/weather/ForecastCard.module.css`

`ForecastSection.module.css`는 아코디언 wrapper와 날짜 버튼을 담당한다.

- 1-7행: 예보 섹션 카드
- 9-15행: header 영역
- 17-23행: title typography
- 40-45행: 리스트 reset
- 55-70행: 날짜 버튼
- 72-83행: 화살표
- 85-87행: 시간별 예보 리스트 영역

`ForecastCard.module.css`는 펼쳐진 날짜 안의 시간별 예보 row를 담당한다.

Figma 시안에서 각 row는 아이콘, 시간, 날씨 설명과 온도가 좌우로 배치된다. 컴포넌트 구조는 `ForecastCard.js` 7-23행에서 확인할 수 있다.

## 반응형 요구사항과 디자인 시안 조정

Figma 시안은 1280px 기준의 고정 레이아웃에 가깝다. 과제 요구사항은 다음과 같다.

- 1280px 이상: 레이아웃이 화면 가운데 위치
- 800px 이상 1280px 미만: 화면 width 100% 사용
- 800px 미만: 더 줄지 않고 스크롤

이 기준은 `PageLayout.module.css`와 `globals.css`에서 처리한다.

- `styles/globals.css` 11행: body 최소 폭
- `PageLayout.module.css` 10행: main 최소 폭
- `PageLayout.module.css` 11-12행: 1280px 최대 폭과 중앙 정렬
- `PageLayout.module.css` 16-20행: 1280px 미만에서 max-width 해제

따라서 각 페이지 CSS는 시안의 배치와 간격에 집중하고, 전체 반응형 정책은 layout wrapper가 담당한다.

## 정리

Figma 디자인 적용 단계에서는 시안의 px 값을 그대로 옮기는 것보다, 반복되는 디자인 값을 토큰화하고 컴포넌트별 CSS Module에 나누어 적용하는 것이 중요했다. 전역 layout wrapper가 반응형 기준을 잡고, 각 페이지와 컴포넌트는 시안의 typography, spacing, border, color를 반영하는 구조로 정리했다.
