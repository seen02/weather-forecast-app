export const formatTemperature = (temperature) => {
  return `${Math.round(temperature)}°C`;
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
