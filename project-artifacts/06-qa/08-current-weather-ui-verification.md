# 08. Current Weather UI Verification

## Automated Checks

```powershell
npm run lint
npm run build
```

Result:

- `npm run lint`: passed
- `npm run build`: passed
- After review feedback, `npm run lint` and `npm run build` were run again and passed.

Build note:

- Next.js build completed successfully.
- Next.js build completed successfully.

## Runtime Checks

Dev server:

```powershell
npm run dev
```

### GraphQL current weather check

Request:

```graphql
query WeatherByCity($city: String!) {
  weatherByCity(city: $city) {
    current {
      temperature
      feelsLike
      humidity
      windSpeed
      description
      measuredAt
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
- `HAS_CURRENT=true`
- current weather fields returned

### Page check

```txt
GET http://localhost:3000/Seoul
```

Result:

- HTTP `200`
- HTML includes `Seoul`
- HTML includes `Current Weather`

## Manual Test Needed By User

1. Start the app.

```powershell
npm run dev
```

2. Open a city detail page.

```txt
http://localhost:3000/Seoul
```

3. Verify the Current Weather card.

- Loading text appears briefly.
- Temperature is displayed as `°C`.
- Description is displayed.
- Feels Like, Humidity, Wind, Measured At are displayed.
- If the API key is invalid or missing, the card shows an error message.
- The error message should be generic and should not expose raw backend/OpenWeather error details.

