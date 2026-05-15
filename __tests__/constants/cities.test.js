/* eslint-env jest */
import {
  getCityByName,
  isSupportedCity,
  SUPPORTED_CITIES,
  SUPPORTED_CITY_NAMES,
} from '../../constants/cities';

describe('city constants', () => {
  it('contains the required supported city routes', () => {
    expect(SUPPORTED_CITY_NAMES).toEqual(['Seoul', 'Tokyo', 'Paris', 'London']);
    expect(SUPPORTED_CITIES.map((city) => city.path)).toEqual([
      '/Seoul',
      '/Tokyo',
      '/Paris',
      '/London',
    ]);
  });

  it('finds a city by its exact supported name', () => {
    expect(getCityByName('Seoul')).toMatchObject({
      name: 'Seoul',
      countryCode: 'KR',
      path: '/Seoul',
    });
  });

  it('checks whether a city is supported', () => {
    expect(isSupportedCity('London')).toBe(true);
    expect(isSupportedCity('Berlin')).toBe(false);
  });
});
