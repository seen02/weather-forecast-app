import { buildSchema } from 'graphql/index.mjs';

export const schema = buildSchema(`
  type City {
    id: String!
    name: String!
    displayName: String!
    countryCode: String!
    path: String!
  }

  type CurrentWeather {
    temperature: Float!
    feelsLike: Float!
    humidity: Int!
    windSpeed: Float!
    description: String!
    icon: String!
    measuredAt: String!
  }

  type ForecastWeather {
    dateTime: String!
    temperature: Float!
    humidity: Int!
    windSpeed: Float!
    description: String!
    icon: String!
  }

  type WeatherByCity {
    city: String!
    country: String!
    current: CurrentWeather!
    forecast: [ForecastWeather!]!
  }

  type Query {
    supportedCities: [City!]!
    city(name: String!): City
    weatherByCity(city: String!): WeatherByCity!
  }
`);
