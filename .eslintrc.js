module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "prettier"],
  plugins: ["jest"],
  env: {
    jest: true,
    node: true,
    es6: true,
  },
  rules: {
    // Autofix removes debugger automatically, which makes debugging annoying.
    "no-debugger": 0,

    // Jest
    "jest/no-focused-tests": 2,
    "jest/no-identical-title": 2,

    // Embrace JavaScript...
    "no-plusplus": 0,
    "no-bitwise": 0,
    "no-confusing-arrow": 0,
    "no-else-return": 0,
    "no-return-assign": [2, "except-parens"],
    "no-underscore-dangle": 0,
    "no-unused-vars": [
      2,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-cond-assign": [2, "except-parens"],
    "no-unused-expressions": [
      0,
      {
        allowTernary: true,
      },
    ],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: true,
        // Allow overwriting properties on 'memo' which is the name we tend to use in `.reduce(...)` calls
        ignorePropertyModificationsFor: ["memo"],
      },
    ],
    camelcase: 0,
  },
};
