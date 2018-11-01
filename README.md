<p align="center">
  <a href="https://www.graphile.org/postgraphile/">
    <img alt="PostGraphile" src="https://www.graphile.org/images/postgraphile.optimized.svg" width="60" />
  </a>
  <img alt="Graphile Heart" src="https://www.graphile.org/images/graphile.optimized.svg" width="60" />
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">
  gatsby-source-pg
</h1>

This module helps you pull your PostgreSQL database into Gatsby with minimal effort.

To install:

```
yarn add gatsby-source-pg
```

(or `npm install --save gatsby-source-pg`)

Then add the config to your `gatsby-config.js`:

```js
module.exports = {
  /* ... */
  plugins: [
    /* ... */

    {
      resolve: "gatsby-source-pg",
      options: {
        connectionString: "postgres:///mydb",
        schema: "public",
        refetchInterval: 60, // Refetch data every 60 seconds
      },
    },
  ],
};
```

The `connectionString` can be any valid PostgreSQL connection string, a full
connection string might look like:
`postgres://pg_user:pg_pass@pg_host:pg_port/pg_db?ssl=1`

## How to query

```graphql
{
  postgres {
    allPostsList {
      id
      authorId
      userByAuthorId {
        id
        username
      }
      title
    }
  }
}
```

## Example

For a working example of `gatsby-source-pg`, see
[gatsby-source-pg-example](https://github.com/graphile/gatsby-source-pg-example).

## Thanks

This plugin uses
[`gatsby-source-graphql`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-graphql#readme)
to merge the PostGraphile GraphQL schema into Gatsby's.

## Customising

This plugin is powered by PostGraphile, which is built on the highly flexible
and customisable Graphile Engine.

You can add to `options` most of the [PostGraphile schema-only options](https://www.graphile.org/postgraphile/usage-schema/#api-createpostgraphileschemapgconfig-schemaname-options)

In addition, we accept the `typeName` and `fieldName` options from
`gatsby-source-graphql` which affect how the schema is namespaced, and the `refetchInterval` setting to trigger refetching data every X seconds.

A common thing you might want to do is to shorten the names that PostGraphile uses by default, you can do this using a plugin such as `@graphile-contrib/pg-simplify-inflector`:

```js
// gatsby-config.js
module.exports = {
  /* ... */
  plugins: [
    /* ... */
    {
      resolve: "gatsby-source-pg",
      options: {
        connectionString: "postgres:///mydb",
        schema: "public",

        /* 👇 */
        appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
        /* 👆 */
      },
    },
  ],
};
```

## Getting help

Pop into the Graphile Discord: [http://discord.gg/graphile](http://discord.gg/graphile)

## Helpful links

- [Gatsby documentation](https://www.gatsbyjs.org/)
- [gatsby-source-pg-example](https://github.com/graphile/gatsby-source-pg-example/)
- [PostGraphile documentation](https://www.graphile.org/postgraphile/)
