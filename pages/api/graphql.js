import { graphql } from 'graphql/index.mjs';
import { rootValue } from '../../server/graphql/resolvers';
import { schema } from '../../server/graphql/schema';

const ALLOWED_METHODS = ['POST'];

const parseRequestBody = (body) => {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
};

const handler = async (req, res) => {
  if (!ALLOWED_METHODS.includes(req.method)) {
    res.setHeader('Allow', ALLOWED_METHODS);
    return res.status(405).json({
      errors: [
        {
          message: 'Method not allowed',
        },
      ],
    });
  }

  try {
    const { query, variables, operationName } = parseRequestBody(req.body);

    if (!query) {
      return res.status(400).json({
        errors: [
          {
            message: 'GraphQL query is required',
          },
        ],
      });
    }

    const result = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
      operationName,
    });

    const statusCode = result.errors ? 400 : 200;

    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

export default handler;
