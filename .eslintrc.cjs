/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "app/generated/prisma/**",
    "public/schoolImages/**",
  ],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-this-alias": "off",
  },
};


