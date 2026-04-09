const gatsbySourceGraphQLNode = require("gatsby-source-graphql/gatsby-node");
const { Pool } = require("pg");

const createSchema = require("./lib/createSchema");
const PostGraphileLink = require("./lib/PostGraphileLink");

exports.createSchemaCustomization = async (props, options) => {
  const {
    typeName = "PostGraphile",
    fieldName = "postgres",
    refetchInterval,
    connectionString,
    schema: postgresSchema,
    ...rest
  } = options;

  const pool = new Pool({
    connectionTimeoutMillis: 30 * 1000,
    connectionString,
  });

  const schemaResult = await createSchema(pool, postgresSchema, rest);

  return gatsbySourceGraphQLNode.createSchemaCustomization(props, {
    ...rest,
    typeName,
    fieldName,
    refetchInterval,
    createLink: () =>
      new PostGraphileLink({
        pool,
        schema: schemaResult.schema,
        resolvedPreset: schemaResult.resolvedPreset,
      }),
    createSchema: () => schemaResult.gatsbySchema,
  });
};

exports.sourceNodes = async (utils, options) => {
  await gatsbySourceGraphQLNode.sourceNodes(utils, options);
};
