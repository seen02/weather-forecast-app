# 06. OpenWeather Service Verification

## Automated Checks

```powershell
npm run lint
npm run build
```

Result:

- `npm run lint`: passed
- `npm run build`: passed

Build note:

- Next.js build completed successfully.
- Next.js build completed successfully.

## Local API Checks

Dev server:

```powershell
npm run dev
```

### 1. Supported cities query

Request:

```graphql
query {
  supportedCities {
    name
    countryCode
    path
  }
}
```

Result:

- HTTP `200`
- Returned Seoul, Tokyo, Paris, London

### 2. Method guard

Request:

```txt
GET /api/graphql
```

Result:

- HTTP `405`
- `Method not allowed`

### 3. Missing API key

Request:

```graphql
query Weather($city: String!) {
  weatherByCity(city: $city) {
    city
    country
    current {
      temperature
    }
    forecast {
      dateTime
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

Result without `.env.local`:

- HTTP `400`
- `OPENWEATHER_API_KEY is required`

### 4. Unsupported city

Variables:

```json
{
  "city": "Berlin"
}
```

Result:

- HTTP `400`
- `Unsupported city: Berlin`

## Manual Test Needed By User

Create `.env.local`:

```txt
OPENWEATHER_API_KEY=your_real_openweather_api_key
```

Then run:

```powershell
npm run dev
```

Send a `weatherByCity(city: "Seoul")` GraphQL request and verify:

- `city` is `Seoul`
- `country` is `KR`
- `current.temperature` returns a number
- `forecast` returns multiple 3-hour forecast items

