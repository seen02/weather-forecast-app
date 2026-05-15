/* eslint-env jest */
import {
  formatForecastDate,
  formatForecastTime,
  getDailyForecastGroups,
  getDailyForecasts,
} from '../../utils/forecast';

const forecastItems = [
  {
    dateTime: '2026-05-15T00:00:00.000Z',
    temperature: 10,
    humidity: 50,
    windSpeed: 2,
    description: 'clear sky',
  },
  {
    dateTime: '2026-05-15T03:00:00.000Z',
    temperature: 16,
    humidity: 70,
    windSpeed: 4,
    description: 'few clouds',
  },
  {
    dateTime: '2026-05-16T00:00:00.000Z',
    temperature: 20,
    humidity: 80,
    windSpeed: 6,
    description: 'light rain',
  },
];

describe('forecast utils', () => {
  it('summarizes 3-hour forecasts by UTC date', () => {
    const dailyForecasts = getDailyForecasts(forecastItems);

    expect(dailyForecasts).toEqual([
      {
        dateKey: '2026-05-15',
        dateTime: '2026-05-15T00:00:00.000Z',
        minTemperature: 10,
        maxTemperature: 16,
        humidity: 60,
        windSpeed: 3,
        description: 'clear sky',
        itemCount: 2,
      },
      {
        dateKey: '2026-05-16',
        dateTime: '2026-05-16T00:00:00.000Z',
        minTemperature: 20,
        maxTemperature: 20,
        humidity: 80,
        windSpeed: 6,
        description: 'light rain',
        itemCount: 1,
      },
    ]);
  });

  it('groups hourly forecasts by UTC date for accordion rendering', () => {
    const dailyGroups = getDailyForecastGroups(forecastItems);

    expect(dailyGroups).toHaveLength(2);
    expect(dailyGroups[0]).toEqual({
      dateKey: '2026-05-15',
      dateTime: '2026-05-15T00:00:00.000Z',
      forecasts: forecastItems.slice(0, 2),
    });
  });

  it('formats forecast date and time with UTC basis', () => {
    expect(formatForecastDate('2026-05-15T00:00:00.000Z')).toBe('May 15');
    expect(formatForecastTime('2026-05-15T03:00:00.000Z')).toBe('03:00am');
  });
});
