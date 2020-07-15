module.exports = function RemoveNodeInterfaceFromQueryPlugin(builder) {
  builder.hook("GraphQLObjectType:interfaces", (interfaces, build, context) => {
    if (!context.scope.isRootQuery) {
      return interfaces;
    }
    return [];
  });
  builder.hook("GraphQLObjectType", (obj, build, context) => {
    if (!context.scope.isRootQuery) {
      return obj;
    }
    const { isTypeOf, ...rest } = obj;
    return rest;
  });
};
