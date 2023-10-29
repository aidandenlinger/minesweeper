module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict', 'plugin:@typescript-eslint/stylistic', 'plugin:svelte/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte']
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ]
};
