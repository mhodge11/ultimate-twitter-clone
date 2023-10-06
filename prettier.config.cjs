/** @type {import("prettier").Config} */
// eslint-disable-next-line no-undef
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
