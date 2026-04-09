const { ApolloLink, Observable } = require("@apollo/client/core");
const performQuery = require("./performQuery");

module.exports = class PostGraphileLink extends ApolloLink {
  constructor({ pool, schema, resolvedPreset }) {
    super();

    this.pool = pool;
    this.schema = schema;
    this.resolvedPreset = resolvedPreset;
  }

  request(operation) {
    return new Observable((observer) => {
      performQuery(
        this.schema,
        this.resolvedPreset,
        operation.query,
        operation.variables,
        operation.operationName,
      )
        .then((data) => {
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch((error) => {
          if (!observer.closed) {
            observer.error(error);
          }
        });
    });
  }
};
