module.exports = {
  root: true,
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 8,
      },
      env: {
        node: true,
        es6: true,
      },
      plugins: ["unused-imports", "prettier"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "unused-imports/no-unused-imports": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
        "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
        "@typescript-eslint/no-unused-vars": "off", // Delegate to unused-imports
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],

  ignorePatterns: [
    "node_modules/*",
    "lib/*",
    ".prettierrc.js",
  ],
};
