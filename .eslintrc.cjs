/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "vue-eslint-parser",
  plugins: ["@typescript-eslint"],
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
    },
  },
  rules: {
    "vue/attribute-hyphenation": ["warn", "never"],
  },
};
