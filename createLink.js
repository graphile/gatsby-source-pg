const { Pool } = require("pg");

const createSchema = require("./createSchema");
const PostGraphileLink = require("./PostGraphileLink");

module.exports = async options => {
  const { connectionString, schema: postgresSchema, ...rest } = options;

  const pool = new Pool({
    connectionString,
  });

  const graphqlSchema = await createSchema(pool, postgresSchema, rest);
  return new PostGraphileLink({ pool, schema: graphqlSchema });
};
