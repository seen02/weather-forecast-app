const getForecastDateKey = (dateTime) => {
  return dateTime.slice(0, 10);
};

const FORECAST_DISPLAY_HOURS = [3, 6, 9, 12, 15, 18, 21];
const FORECAST_SLOT_TOLERANCE_HOURS = 2;

const getForecastHour = (dateTime) => {
  return Number(dateTime.slice(11, 13));
};

const formatDisplayHour = (hour) => {
  const suffix = hour < 12 ? 'am' : 'pm';

  return `${String(hour).padStart(2, '0')}:00${suffix}`;
};

const findClosestForecastByHour = (forecasts, targetHour, usedDateTimes) => {
  return forecasts
    .filter((forecast) => !usedDateTimes.has(forecast.dateTime))
    .map((forecast) => ({
      distance: Math.abs(getForecastHour(forecast.dateTime) - targetHour),
      forecast,
    }))
    .filter(({ distance }) => distance <= FORECAST_SLOT_TOLERANCE_HOURS)
    .sort((left, right) => left.distance - right.distance)[0]?.forecast;
};

const getAverage = (values) => {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const summarizeForecastGroup = ([dateKey, forecasts]) => {
  const temperatures = forecasts.map((forecast) => forecast.temperature);
  const humidities = forecasts.map((forecast) => forecast.humidity);
  const windSpeeds = forecasts.map((forecast) => forecast.windSpeed);

  return {
    dateKey,
    dateTime: forecasts[0].dateTime,
    minTemperature: Math.min(...temperatures),
    maxTemperature: Math.max(...temperatures),
    humidity: Math.round(getAverage(humidities)),
    windSpeed: Number(getAverage(windSpeeds).toFixed(1)),
    description: forecasts[0].description,
    itemCount: forecasts.length,
  };
};

export const getDailyForecasts = (forecasts = []) => {
  const forecastGroups = forecasts.reduce((groups, forecast) => {
    const dateKey = getForecastDateKey(forecast.dateTime);

    return {
      ...groups,
      [dateKey]: [...(groups[dateKey] || []), forecast],
    };
  }, {});

  return Object.entries(forecastGroups).slice(0, 5).map(summarizeForecastGroup);
};

export const getDailyForecastGroups = (forecasts = []) => {
  const forecastGroups = forecasts.reduce((groups, forecast) => {
    const dateKey = getForecastDateKey(forecast.dateTime);

    return {
      ...groups,
      [dateKey]: [...(groups[dateKey] || []), forecast],
    };
  }, {});

  return Object.entries(forecastGroups)
    .map(([dateKey, items]) => {
      const usedDateTimes = new Set();
      const displayForecasts = FORECAST_DISPLAY_HOURS.reduce(
        (forecastsForDisplay, displayHour) => {
          const forecast = findClosestForecastByHour(items, displayHour, usedDateTimes);

          if (!forecast) {
            return forecastsForDisplay;
          }

          usedDateTimes.add(forecast.dateTime);

          return [
            ...forecastsForDisplay,
            {
              ...forecast,
              displayTime: formatDisplayHour(displayHour),
            },
          ];
        },
        []
      );

      return {
        dateKey,
        dateTime: displayForecasts[0]?.dateTime || items[0].dateTime,
        forecasts: displayForecasts,
      };
    })
    .filter((forecastGroup) => forecastGroup.forecasts.length > 0)
    .slice(0, 5);
};

export const formatForecastDate = (dateTime) => {
  const [year, month, day] = getForecastDateKey(dateTime).split('-').map(Number);

  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export const formatForecastTime = (dateTime) => {
  const hour = getForecastHour(dateTime);

  return formatDisplayHour(hour);
};
