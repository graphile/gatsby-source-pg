const { withPostGraphileContext } = require("postgraphile");
const { graphql, print } = require("graphql");

module.exports = async function performQuery(
  pgPool,
  schema,
  query,
  variables,
  operationName,
) {
  const queryString = typeof query === "string" ? query : print(query);
  return withPostGraphileContext({ pgPool }, async (context) =>
    graphql(
      schema, // The schema from `createPostGraphileSchema`
      queryString,
      null,
      { ...context }, // You can add more to context if you like
      variables,
      operationName,
    ),
  );
};
