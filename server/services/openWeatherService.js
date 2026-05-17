import { getCityByName } from '../../constants/cities';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_UNITS = 'metric';

const getApiKey = () => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY is required');
  }

  return apiKey;
};

const buildRequestUrl = (path, params) => {
  const url = new URL(`${OPENWEATHER_BASE_URL}${path}`);

  Object.entries({
    ...params,
    appid: getApiKey(),
    lang: DEFAULT_LANGUAGE,
    units: DEFAULT_UNITS,
  }).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const parseResponseBody = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const requestOpenWeather = async (path, params) => {
  const response = await fetch(buildRequestUrl(path, params));
  const data = await parseResponseBody(response);

  if (!response.ok) {
    const message = data?.message || `status ${response.status}`;
    throw new Error(`OpenWeather request failed: ${message}`);
  }

  return data;
};

const getLocationParams = (city) => {
  return {
    lat: city.coordinates.latitude,
    lon: city.coordinates.longitude,
  };
};

const getPrimaryWeather = (weatherList) => {
  return weatherList?.[0] || {};
};

const toLocalIsoString = (unixSeconds, timezoneOffsetSeconds = 0) => {
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
    .toISOString()
    .replace('Z', '');
};

const getTimezoneOffsetSeconds = (...timezoneOffsets) => {
  return timezoneOffsets.find((timezoneOffset) => Number.isFinite(timezoneOffset)) || 0;
};

const mapCurrentWeather = (currentData, timezoneOffsetSeconds) => {
  const weather = getPrimaryWeather(currentData.weather);

  return {
    temperature: currentData.main.temp,
    feelsLike: currentData.main.feels_like,
    humidity: currentData.main.humidity,
    windSpeed: currentData.wind?.speed || 0,
    description: weather.description || '',
    icon: weather.icon || '',
    measuredAt: toLocalIsoString(currentData.dt, timezoneOffsetSeconds),
  };
};

const mapForecastWeather = (forecastItem, timezoneOffsetSeconds) => {
  const weather = getPrimaryWeather(forecastItem.weather);

  return {
    dateTime: toLocalIsoString(forecastItem.dt, timezoneOffsetSeconds),
    temperature: forecastItem.main.temp,
    humidity: forecastItem.main.humidity,
    windSpeed: forecastItem.wind?.speed || 0,
    description: weather.description || '',
    icon: weather.icon || '',
  };
};

export const getWeatherByCity = async (cityName) => {
  const city = getCityByName(cityName);

  if (!city) {
    throw new Error(`Unsupported city: ${cityName}`);
  }

  const locationParams = getLocationParams(city);
  const [currentData, forecastData] = await Promise.all([
    requestOpenWeather('/weather', locationParams),
    requestOpenWeather('/forecast', locationParams),
  ]);
  const timezoneOffsetSeconds = getTimezoneOffsetSeconds(
    forecastData.city?.timezone,
    currentData.timezone
  );

  return {
    city: city.name,
    country: currentData.sys?.country || city.countryCode,
    current: mapCurrentWeather(currentData, timezoneOffsetSeconds),
    forecast: (forecastData.list || []).map((forecastItem) =>
      mapForecastWeather(forecastItem, timezoneOffsetSeconds)
    ),
  };
};
