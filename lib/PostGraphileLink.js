const { ApolloLink, Observable } = require("apollo-link");
const performQuery = require("./performQuery");

module.exports = class PostGraphileLink extends ApolloLink {
  constructor({ pool, schema }) {
    super();

    this.pool = pool;
    this.schema = schema;
  }

  request(operation) {
    return new Observable((observer) => {
      performQuery(
        this.pool,
        this.schema,
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
