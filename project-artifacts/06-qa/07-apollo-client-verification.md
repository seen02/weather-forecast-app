# 07. Apollo Client Verification

## Automated Checks

```powershell
npm ls @apollo/client graphql
npm run lint
npm run build
```

Result:

- `@apollo/client@4.1.9` installed
- `graphql@16.8.1` installed
- `npm run lint`: passed
- `npm run build`: passed

Build note:

- Next.js build completed successfully.
- Next.js build completed successfully.

## Runtime Checks

Dev server:

```powershell
npm run dev
```

### Page HTTP check

```txt
GET http://localhost:3000/Seoul
```

Result:

- HTTP `200`
- Static page HTML includes `Seoul`

### Apollo Client query check

Apollo Client was used against the local GraphQL endpoint.

Result:

```txt
CITY=Seoul
COUNTRY=KR
FORECAST_COUNT=40
```

## Browser Automation

Browser visual verification was left as a manual verification item.

Manual browser verification is still required.

## Manual Test Needed By User

1. Create `.env.local` if it does not exist.

```txt
OPENWEATHER_API_KEY=your_real_openweather_api_key
```

2. Start the app.

```powershell
npm run dev
```

3. Open these pages in the browser.

```txt
http://localhost:3000/Seoul
http://localhost:3000/Tokyo
http://localhost:3000/Paris
http://localhost:3000/London
```

4. Verify each page.

- The page initially shows a loading state.
- Current weather values replace the placeholder.
- Forecast section shows the number of forecast items loaded from GraphQL.
- If the API key is missing or invalid, the current weather panel shows an error state.

