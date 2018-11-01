const gatsbySourceGraphQLNode = require("gatsby-source-graphql/gatsby-node");

const createLink = require("./createLink");

exports.sourceNodes = async (
  utils,
  { typeName = "PostGraphile", fieldName = "postgres", ...options }
) => {
  await gatsbySourceGraphQLNode.sourceNodes(utils, {
    typeName,
    fieldName,
    createLink: () => createLink(options),
  });
};
