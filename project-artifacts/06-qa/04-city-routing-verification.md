# 04. City Routing Verification

## Date

2026-05-15

## Commands

```bash
npm run lint
npm run build
```

## Result

### `npm run lint`

결과: 성공

```txt
✔ No ESLint warnings or errors
```

### `npm run build`

결과: 성공

빌드 결과에서 다음 정적 경로 생성을 확인했다.

```txt
/Seoul
/Tokyo
/Paris
/London
```

## Manual Test Scope

- `/` 접속 시 도시 링크 4개가 보이는지 확인한다.
- 각 도시 링크 클릭 시 해당 상세 페이지로 이동하는지 확인한다.
- `/Busan`, `/seoul` 같은 지원하지 않는 경로가 404로 처리되는지 확인한다.
- 상세 페이지에는 아직 실제 날씨 데이터가 아니라 placeholder가 표시되는 것이 정상이다.

## Local HTTP Check

개발 서버를 `http://localhost:3000`에서 실행하고 다음 경로를 확인했다.

| Path | Result |
| --- | --- |
| `/` | 200 |
| `/Seoul` | 200 |
| `/Tokyo` | 200 |
| `/Busan` | 404 |
| `/seoul` | 404 |

`/Seoul` 응답에서 `Current Weather` placeholder 문구도 확인했다.

