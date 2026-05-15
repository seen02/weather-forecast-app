/* eslint-env jest */
import {
  formatPreciseTemperature,
  formatTemperature,
  formatWeatherDateTime,
  formatWindSpeed,
} from '../../utils/weather';

describe('weather utils', () => {
  it('formats rounded and precise temperatures', () => {
    expect(formatTemperature(21.6)).toBe('22°C');
    expect(formatPreciseTemperature(21.6)).toBe('21.60°C');
  });

  it('formats wind speed', () => {
    expect(formatWindSpeed(3.33)).toBe('3.33 m/s');
  });

  it('formats current weather date and time for display', () => {
    expect(formatWeatherDateTime('2026-05-15T00:00:00.000Z')).toMatch(
      /^May \d+\. \d{2}:\d{2}(am|pm)$/
    );
  });
});
