const { grafast, isAsyncIterable } = require("postgraphile/grafast");
const { print } = require("graphql");

module.exports = async function performQuery(
  schema,
  resolvedPreset,
  query,
  variables,
  operationName,
) {
  const queryString = typeof query === "string" ? query : print(query);
  const result = await grafast({
    schema,
    source: queryString,
    variableValues: variables,
    operationName,
    resolvedPreset,
    requestContext: {},
  });

  if (isAsyncIterable(result)) {
    throw new Error("Subscriptions are not supported by gatsby-source-pg");
  }

  return result;
};
