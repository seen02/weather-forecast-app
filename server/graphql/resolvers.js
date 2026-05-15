import { getCityByName, SUPPORTED_CITIES } from '../../constants/cities';
import { getWeatherByCity } from '../services/openWeatherService';

export const rootValue = {
  supportedCities: () => {
    return SUPPORTED_CITIES;
  },
  city: ({ name }) => {
    return getCityByName(name) || null;
  },
  weatherByCity: async ({ city }) => {
    return getWeatherByCity(city);
  },
};
