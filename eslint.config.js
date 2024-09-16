import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      // Enforce consistent return types for functions
      "@typescript-eslint/explicit-function-return-type": "warn",

      // Disallow unused variables (helps avoid accidental leftovers)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Disallow non-null assertions (!), helps avoid potential runtime errors
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Disable the base no-unused-vars rule as it can conflict with @typescript-eslint/no-unused-vars
      "no-unused-vars": "off",

      // Enforce using type imports to ensure clean separation between types and values
      "@typescript-eslint/consistent-type-imports": "error",

      "@typescript-eslint/no-explicit-any": "warn",

      // Require explicit accessibility modifiers on class properties and methods
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit" },
      ],

      // Disable explicit function return type rule
      "@typescript-eslint/explicit-function-return-type": "off",

      // Disable comma-dangle rule
      "comma-dangle": "off",

      // New rules from React config that are applicable for Node.js
      eqeqeq: ["error", "always"],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      "no-console": "error",
      semi: ["error", "always"],

      "unused-imports/no-unused-imports": "error",

      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
        },
      ],

      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],

      "@typescript-eslint/no-shadow": ["error"],
      "no-underscore-dangle": ["off"],
    },
  },
];
