export const SUPPORTED_CITIES = [
  {
    id: 'seoul',
    name: 'Seoul',
    displayName: 'Seoul',
    countryCode: 'KR',
    population: 10349312,
    path: '/Seoul',
    coordinates: {
      latitude: 37.5665,
      longitude: 126.978,
    },
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    displayName: 'Tokyo',
    countryCode: 'JP',
    population: 13929286,
    path: '/Tokyo',
    coordinates: {
      latitude: 35.6762,
      longitude: 139.6503,
    },
  },
  {
    id: 'paris',
    name: 'Paris',
    displayName: 'Paris',
    countryCode: 'FR',
    population: 2148327,
    path: '/Paris',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },
  {
    id: 'london',
    name: 'London',
    displayName: 'London',
    countryCode: 'GB',
    population: 8982000,
    path: '/London',
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
  },
];

export const SUPPORTED_CITY_NAMES = SUPPORTED_CITIES.map((city) => city.name);

export const getCityByName = (cityName) => {
  return SUPPORTED_CITIES.find((city) => city.name === cityName);
};

export const isSupportedCity = (cityName) => {
  return Boolean(getCityByName(cityName));
};
