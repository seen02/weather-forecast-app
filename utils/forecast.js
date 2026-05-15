const getForecastDateKey = (dateTime) => {
  return new Date(dateTime).toISOString().slice(0, 10);
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
    .slice(0, 5)
    .map(([dateKey, items]) => ({
      dateKey,
      dateTime: items[0].dateTime,
      forecasts: items.slice(0, 7),
    }));
};

export const formatForecastDate = (dateTime) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateTime));
};

export const formatForecastTime = (dateTime) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date(dateTime))
    .replace(' ', '')
    .toLowerCase();
};
