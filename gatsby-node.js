const gatsbySourceGraphQLNode = require("gatsby-source-graphql/gatsby-node");
const { Pool } = require("pg");

const createSchema = require("./lib/createSchema");
const PostGraphileLink = require("./lib/PostGraphileLink");

exports.sourceNodes = async (
  utils,
  {
    typeName = "PostGraphile",
    fieldName = "postgres",
    refetchInterval,
    ...options
  },
) => {
  const { connectionString, schema: postgresSchema, ...rest } = options;

  const pool = new Pool({
    connectionTimeoutMillis: 30 * 1000,
    connectionString,
  });
  const graphqlSchema = await createSchema(pool, postgresSchema, rest);

  await gatsbySourceGraphQLNode.sourceNodes(utils, {
    typeName,
    fieldName,
    refetchInterval,
    createLink: () => new PostGraphileLink({ pool, schema: graphqlSchema }),
    createSchema: () => graphqlSchema,
  });
};
