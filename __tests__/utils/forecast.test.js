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

const hourlyForecastItems = [
  {
    dateTime: '2026-05-15T00:00:00.000Z',
    temperature: 8,
    humidity: 45,
    windSpeed: 1,
    description: 'midnight',
  },
  {
    dateTime: '2026-05-15T03:00:00.000Z',
    temperature: 10,
    humidity: 50,
    windSpeed: 2,
    description: '03 forecast',
  },
  {
    dateTime: '2026-05-15T06:00:00.000Z',
    temperature: 12,
    humidity: 55,
    windSpeed: 3,
    description: '06 forecast',
  },
  {
    dateTime: '2026-05-15T09:00:00.000Z',
    temperature: 14,
    humidity: 60,
    windSpeed: 4,
    description: '09 forecast',
  },
  {
    dateTime: '2026-05-15T12:00:00.000Z',
    temperature: 16,
    humidity: 65,
    windSpeed: 5,
    description: '12 forecast',
  },
  {
    dateTime: '2026-05-15T15:00:00.000Z',
    temperature: 18,
    humidity: 70,
    windSpeed: 6,
    description: '15 forecast',
  },
  {
    dateTime: '2026-05-15T18:00:00.000Z',
    temperature: 20,
    humidity: 75,
    windSpeed: 7,
    description: '18 forecast',
  },
  {
    dateTime: '2026-05-15T21:00:00.000Z',
    temperature: 22,
    humidity: 80,
    windSpeed: 8,
    description: '21 forecast',
  },
];

const parisForecastItems = [
  {
    dateTime: '2026-05-15T02:00:00.000',
    temperature: 11,
    humidity: 50,
    windSpeed: 2,
    description: '02 forecast',
  },
  {
    dateTime: '2026-05-15T05:00:00.000',
    temperature: 13,
    humidity: 52,
    windSpeed: 2,
    description: '05 forecast',
  },
  {
    dateTime: '2026-05-15T08:00:00.000',
    temperature: 16,
    humidity: 53,
    windSpeed: 3,
    description: '08 forecast',
  },
  {
    dateTime: '2026-05-15T11:00:00.000',
    temperature: 18,
    humidity: 54,
    windSpeed: 4,
    description: '11 forecast',
  },
  {
    dateTime: '2026-05-15T14:00:00.000',
    temperature: 21,
    humidity: 55,
    windSpeed: 5,
    description: '14 forecast',
  },
  {
    dateTime: '2026-05-15T17:00:00.000',
    temperature: 19,
    humidity: 56,
    windSpeed: 4,
    description: '17 forecast',
  },
  {
    dateTime: '2026-05-15T20:00:00.000',
    temperature: 15,
    humidity: 58,
    windSpeed: 3,
    description: '20 forecast',
  },
  {
    dateTime: '2026-05-15T23:00:00.000',
    temperature: 12,
    humidity: 60,
    windSpeed: 2,
    description: '23 forecast',
  },
];

describe('forecast utils', () => {
  it('summarizes 3-hour forecasts by local date', () => {
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

  it('groups hourly forecasts by local date for accordion rendering', () => {
    const dailyGroups = getDailyForecastGroups(hourlyForecastItems);

    expect(dailyGroups).toHaveLength(1);
    expect(dailyGroups[0]).toEqual({
      dateKey: '2026-05-15',
      dateTime: '2026-05-15T03:00:00.000Z',
      forecasts: hourlyForecastItems.slice(1).map((forecast, index) => ({
        ...forecast,
        displayTime: [
          '03:00am',
          '06:00am',
          '09:00am',
          '12:00pm',
          '15:00pm',
          '18:00pm',
          '21:00pm',
        ][index],
      })),
    });
  });

  it('maps shifted local forecast slots to fixed display times', () => {
    const dailyGroups = getDailyForecastGroups(parisForecastItems);

    expect(dailyGroups).toHaveLength(1);
    expect(dailyGroups[0].forecasts.map((forecast) => forecast.displayTime)).toEqual([
      '03:00am',
      '06:00am',
      '09:00am',
      '12:00pm',
      '15:00pm',
      '18:00pm',
      '21:00pm',
    ]);
    expect(dailyGroups[0].forecasts.map((forecast) => forecast.dateTime)).toEqual([
      '2026-05-15T02:00:00.000',
      '2026-05-15T05:00:00.000',
      '2026-05-15T08:00:00.000',
      '2026-05-15T11:00:00.000',
      '2026-05-15T14:00:00.000',
      '2026-05-15T17:00:00.000',
      '2026-05-15T20:00:00.000',
    ]);
  });

  it('formats forecast date and local display time', () => {
    expect(formatForecastDate('2026-05-15T00:00:00.000Z')).toBe('May 15');
    expect(formatForecastDate('2026-05-18T00:00:00.000')).toBe('May 18');
    expect(formatForecastTime('2026-05-15T03:00:00.000Z')).toBe('03:00am');
    expect(formatForecastTime('2026-05-15T12:00:00.000Z')).toBe('12:00pm');
    expect(formatForecastTime('2026-05-15T15:00:00.000Z')).toBe('15:00pm');
    expect(formatForecastTime('2026-05-15T21:00:00.000Z')).toBe('21:00pm');
  });
});
