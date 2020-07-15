const { createPostGraphileSchema } = require("postgraphile");

function requireFrom(modules, moduleName) {
  const path = [...modules, moduleName].join("/node_modules/");
  try {
    return require(path); // eslint-disable-line
  } catch (e) {
    // Doesn't exist.
    if (modules.length > 1) {
      const result = requireFrom(
        modules.slice(0, modules.length - 1),
        moduleName,
      );
      if (result) return result;
    }
    return (
      requireFrom(modules.slice(1), moduleName) ||
      requireFrom(modules.slice(0, modules.length - 1), moduleName)
    );
  }
}
const graphileBuild = requireFrom(
  ["postgraphile", "postgraphile-core"],
  "graphile-build",
);

const RenamedQueryPlugin = require("./RenamedQueryPlugin");
const RemoveNodeInterfaceFromQueryPlugin = require("./RemoveNodeInterfaceFromQueryPlugin");

const skipPlugins = [
  graphileBuild.QueryPlugin,
  graphileBuild.MutationPlugin,
  graphileBuild.SubscriptionPlugin,
];
const prependPlugins = [RenamedQueryPlugin];

const appendPlugins = [RemoveNodeInterfaceFromQueryPlugin];

module.exports = async (pool, schema, options) => {
  const schemas = Array.isArray(schema) ? schema : schema.split(",");
  const graphqlSchema = await createPostGraphileSchema(pool, schemas, {
    simpleCollections: "both",
    dynamicJson: true,
    showErrorStack: true,
    extendedErrors: ["hint", "detail", "errcode"],
    legacyRelations: "omit",
    ...options,
    skipPlugins: [...skipPlugins, ...(options.skipPlugins || [])],
    prependPlugins: [...prependPlugins, ...(options.prependPlugins || [])],
    appendPlugins: [...appendPlugins, ...(options.appendPlugins || [])],
  });
  return graphqlSchema;
};
