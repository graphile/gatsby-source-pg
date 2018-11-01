const gatsbySourceGraphQLNode = require("gatsby-source-graphql/gatsby-node");
const { Pool } = require("pg");

const createSchema = require("./createSchema");
const PostGraphileLink = require("./PostGraphileLink");

exports.sourceNodes = async (
  utils,
  { typeName = "PostGraphile", fieldName = "postgres", ...options }
) => {
  const { connectionString, schema: postgresSchema, ...rest } = options;

  const pool = new Pool({
    connectionString,
  });
  const graphqlSchema = await createSchema(pool, postgresSchema, rest);

  await gatsbySourceGraphQLNode.sourceNodes(utils, {
    typeName,
    fieldName,
    createLink: () => new PostGraphileLink({ pool, schema: graphqlSchema }),
    createSchema: () => graphqlSchema,
  });
};
