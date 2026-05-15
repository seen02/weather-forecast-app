import { gql } from '@apollo/client';

export const WEATHER_BY_CITY_QUERY = gql`
  query WeatherByCity($city: String!) {
    weatherByCity(city: $city) {
      city
      country
      current {
        temperature
        feelsLike
        humidity
        windSpeed
        description
        icon
        measuredAt
      }
      forecast {
        dateTime
        temperature
        humidity
        windSpeed
        description
        icon
      }
    }
  }
`;
