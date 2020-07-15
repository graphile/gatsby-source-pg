module.exports = function RenamedQueryPlugin(builder) {
  builder.hook("build", (build) =>
    build.extend(
      build,
      {
        $$isQuery: Symbol("isQuery"),
      },
      `Extending Build`,
    ),
  );
  builder.hook("GraphQLSchema", (schema, build) => {
    const {
      $$isQuery,
      newWithHooks,
      extend,
      graphql: { GraphQLObjectType },
    } = build;
    const queryType = newWithHooks(
      GraphQLObjectType,
      {
        description:
          "PostGraphile Query type, gives access to data from PostgreSQL",
        name: "PostGraphileQuery",
        isTypeOf: (value, _context, info) =>
          info.parentType == null || value === $$isQuery,
        fields: {},
      },
      {
        __origin: `gatsby-source-pg override`,
        isRootQuery: true,
      },
    );
    return extend(
      schema,
      {
        query: queryType,
      },
      `Adding 'query' type to Schema`,
    );
  });
};
