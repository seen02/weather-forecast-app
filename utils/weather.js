export const formatTemperature = (temperature) => {
  return `${Math.round(temperature)}°C`;
};

export const formatPreciseTemperature = (temperature) => {
  return `${Number(temperature).toFixed(2)}°C`;
};

export const formatWindSpeed = (windSpeed) => {
  return `${windSpeed} m/s`;
};

export const formatMeasuredTime = (measuredAt) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(measuredAt));
};

export const formatWeatherDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const day = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
    .format(date)
    .replace(' ', '')
    .toLowerCase();

  return `${day}. ${time}`;
};
