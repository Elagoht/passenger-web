import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": react
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description"
        }
      ],
      yoda: [
        "error",
        "never",
        {
          exceptRange: true
        }
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: [
            "none",
            "all",
            "multiple",
            "single"
          ]
        }
      ],
      "require-await": "error",
      "prefer-template": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true
        },
        {
          enforceForRenamedProperties: false
        }
      ],
      "no-var": "error",
      "prefer-const": "error",
      "no-useless-computed-key": "error",
      "no-useless-catch": "error",
      "no-unneeded-ternary": "error",
      "no-script-url": "error",
      "no-shadow-restricted-names": "error",
      "no-return-assign": [
        "error",
        "always"
      ],
      "no-new-wrappers": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-param-reassign": "error",
      "no-lonely-if": "error",
      "no-lone-blocks": "error",
      "no-empty": "error",
      "no-extra-boolean-cast": "error",
      "no-implicit-coercion": "error",
      "no-console": "error",
      "no-alert": "error",
      "multiline-comment-style": [
        "warn",
        "starred-block"
      ],
      "max-len": [
        "error",
        {
          code: 80,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],
      "max-lines": [
        "error",
        {
          max: 500,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      "max-nested-callbacks": [
        "error",
        5
      ],
      "id-denylist": [
        "error",
        "req",
        "res",
        "err",
        "e",
        "cb",
        "acc",
        "curr",
        "cur"
      ],
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore"
        }
      ],
      "default-case-last": "error",
      "default-case": "error",
      "dot-notation": "warn",
      "default-param-last": "error",
      "capitalized-comments": "warn",
      camelcase: "warn",
      "use-isnan": "error",
      "no-unused-private-class-members": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unreachable-loop": "error",
      "no-unreachable": "error",
      "no-unmodified-loop-condition": "error",
      "no-unexpected-multiline": "error",
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true
        }
      ],
      "jsx-quotes": [
        "error",
        "prefer-double"
      ],
      semi: [
        "error",
        "never"
      ],
      "react/jsx-first-prop-new-line": [
        "error",
        "multiprop"
      ],
      "react/jsx-max-props-per-line": [
        "error",
        {
          "maximum": 1,
          "when": "always"
        }
      ],
      "react/jsx-wrap-multilines": [
        "error",
        {
          "declaration": "never",
          "assignment": "never",
          "return": "never",
          "arrow": "never",
          "condition": "never",
          "logical": "never",
          "prop": "never"
        }
      ]
    }
  }
]