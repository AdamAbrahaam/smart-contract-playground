/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "no-redeclare": "off",
    "no-useless-constructor": "off",
    "vue/no-v-for-template-key-on-child": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      },
    ],
  },
  ignorePatterns: ["vue-shim.d.ts", "dist/"],
};
