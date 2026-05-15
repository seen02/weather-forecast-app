export const SUPPORTED_CITIES = [
  {
    id: 'seoul',
    name: 'Seoul',
    displayName: 'Seoul',
    countryCode: 'KR',
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
