import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type City {
    id: String!
    name: String!
    displayName: String!
    countryCode: String!
    path: String!
  }

  type Query {
    supportedCities: [City!]!
    city(name: String!): City
  }
`);
