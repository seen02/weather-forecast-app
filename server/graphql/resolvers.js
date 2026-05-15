import { getCityByName, SUPPORTED_CITIES } from '../../constants/cities';

export const rootValue = {
  supportedCities: () => {
    return SUPPORTED_CITIES;
  },
  city: ({ name }) => {
    return getCityByName(name) || null;
  },
};
