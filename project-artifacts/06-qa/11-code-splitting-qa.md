# 11. Code Splitting QA

## 실행 명령

```bash
npm run lint
npm run build
```

## 결과

- `npm run lint`: 통과
- `npm run build`: 통과

## 확인 사항

- `/[city]` 페이지가 정상 빌드됨
- `ForecastSection`이 `next/dynamic`으로 동적 import됨
- 빌드 결과에서 `ForecastSection`, `ForecastCard` 코드가 별도 chunk로 생성됨

## 수동 확인 권장 항목

개발 서버 실행 후 아래 경로를 확인한다.

```txt
http://localhost:3000/Seoul
http://localhost:3000/Tokyo
http://localhost:3000/Paris
http://localhost:3000/London
```

확인 포인트:

- 현재 날씨 카드가 표시되는지
- 5일 예보 영역이 표시되는지
- 날짜 아코디언이 펼침/접힘 동작을 유지하는지
- API key가 없거나 잘못된 경우 에러 상태가 표시되는지

