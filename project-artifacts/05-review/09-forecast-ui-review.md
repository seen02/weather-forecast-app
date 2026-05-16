# 09. Forecast UI Review

## Findings

No blocking code-level issues found in the forecast UI implementation.

Review feedback about timezone inconsistency was addressed by using UTC for both grouping and date display.

## Review Notes

| Area | Result | Notes |
| --- | --- | --- |
| Architecture / conventions | Pass | Forecast UI is separated into `ForecastSection`, `ForecastCard`, and `utils/forecast.js`; page stays mostly container-level. |
| Module CSS | Pass | Forecast styles are component-scoped with `ForecastSection.module.css` and `ForecastCard.module.css`. |
| Semantic markup | Pass | Forecast success state uses `ul` / `li`, with per-card weather details in `dl` / `dt` / `dd`. |
| Data transformation | Pass | 3-hour forecast list is transformed into up to 5 daily summaries. |
| Timezone consistency | Pass | Grouping and date display both use UTC. |
| States | Pass | Loading, error, empty, and success states are covered in `ForecastSection`. |
| API key exposure | Pass | OpenWeather key remains server-only via `OPENWEATHER_API_KEY`; no `NEXT_PUBLIC` key usage found. |

## Verification

실행한 명령:

```powershell
npm run lint -- --no-cache
npm run build
```

결과:

- lint 통과
- build 통과

런타임 확인:

- `weatherByCity(city: "Seoul")` forecast count: `40`
- daily group count: `5`
- `GET /Seoul`: HTTP `200`
- HTML에 `5 Day Forecast` 포함 확인

## Residual Risk

- 실제 브라우저 시각 검증은 사용자가 수동으로 확인해야 한다.
- 도시별 local timezone 기반 grouping은 아직 구현하지 않았다. 현재는 UTC 기준으로 grouping/display를 일관되게 맞췄다.
- 디자인 정합성은 10단계 Figma 시안 적용에서 다시 조정한다.

