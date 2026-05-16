# 09. Forecast UI Verification

## Automated Checks

```powershell
npm run lint -- --no-cache
npm run build
```

Result:

- `npm run lint -- --no-cache`: passed
- `npm run build`: passed

Build note:

- Next.js build completed successfully.
- Next.js build completed successfully.

## Runtime Checks

Dev server:

```powershell
npm run dev
```

### GraphQL forecast check

Request:

```graphql
query WeatherByCity($city: String!) {
  weatherByCity(city: $city) {
    forecast {
      dateTime
      temperature
      humidity
      windSpeed
      description
    }
  }
}
```

Variables:

```json
{
  "city": "Seoul"
}
```

Result:

- HTTP `200`
- `FORECAST_COUNT=40`
- `DAILY_GROUP_COUNT=5`

### Page check

```txt
GET http://localhost:3000/Seoul
```

Result:

- HTTP `200`
- HTML includes `Seoul`
- HTML includes `5 Day Forecast`

## Manual Test Needed By User

1. Start the app.

```powershell
npm run dev
```

2. Open a city detail page.

```txt
http://localhost:3000/Seoul
```

3. Verify the forecast section.

- Loading text appears briefly.
- 5 Day Forecast section renders daily forecast rows.
- Each row displays date, description, temperature range, humidity, and wind.
- If the API key is invalid or missing, the section shows a generic error message.

