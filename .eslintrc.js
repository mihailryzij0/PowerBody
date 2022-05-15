module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-restricted-globals": "off",
    "no-unused-expressions": "off",
    "no-underscore-dangle": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
  },
  plugins: ["jest"],
};
