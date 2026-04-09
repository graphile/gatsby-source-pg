const { makeSchema } = require("postgraphile");
const { PostGraphileAmberPreset } = require("postgraphile/presets/amber");
const { makeV4Preset } = require("postgraphile/presets/v4");
const { makePgService } = require("postgraphile/adaptors/pg");
const { buildClientSchema, introspectionFromSchema } = require("graphql");

const disablePlugins = ["MutationPlugin", "SubscriptionPlugin"];
module.exports = async (pool, schema, options) => {
  const schemas = Array.isArray(schema) ? schema : schema.split(",");
  const {
    appendPlugins = [],
    prependPlugins = [],
    disablePlugins: userDisablePlugins = [],
    ...restOptions
  } = options;

  const v4Preset = makeV4Preset({
    simpleCollections: "both",
    dynamicJson: true,
    showErrorStack: true,
    extendedErrors: ["hint", "detail", "errcode"],
    legacyRelations: "omit",
    ...restOptions,
    appendPlugins,
  });

  const { schema: graphqlSchema, resolvedPreset } = await makeSchema({
    extends: [PostGraphileAmberPreset, v4Preset],
    pgServices: [
      makePgService({
        pool,
        schemas,
      }),
    ],
    plugins: [...prependPlugins],
    disablePlugins: [...disablePlugins, ...userDisablePlugins],
  });

  // Build a clean client schema stripped of Grafast metadata (plan functions,
  // assertStep, etc.) to pass to Gatsby's schema builder. Gatsby uses
  // graphql-compose internally, which recurses infinitely on Grafast's
  // circular step objects if the raw PostGraphile schema is passed directly.
  const gatsbySchema = buildClientSchema(
    introspectionFromSchema(graphqlSchema),
  );

  return { schema: graphqlSchema, gatsbySchema, resolvedPreset };
};
