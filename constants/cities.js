export const SUPPORTED_CITIES = [
  {
    id: 'seoul',
    name: 'Seoul',
    displayName: 'Seoul',
    countryCode: 'KR',
    path: '/Seoul',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    displayName: 'Tokyo',
    countryCode: 'JP',
    path: '/Tokyo',
  },
  {
    id: 'paris',
    name: 'Paris',
    displayName: 'Paris',
    countryCode: 'FR',
    path: '/Paris',
  },
  {
    id: 'london',
    name: 'London',
    displayName: 'London',
    countryCode: 'GB',
    path: '/London',
  },
];

export const SUPPORTED_CITY_NAMES = SUPPORTED_CITIES.map((city) => city.name);

export const getCityByName = (cityName) => {
  return SUPPORTED_CITIES.find((city) => city.name === cityName);
};

export const isSupportedCity = (cityName) => {
  return Boolean(getCityByName(cityName));
};
