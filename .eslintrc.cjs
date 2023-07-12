/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:vitest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'prettier/prettier': 'warn',
    'import/order': [
      'warn',
      { groups: ['type', 'builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'] },
    ],
  },
  ignorePatterns: ['*.cjs', 'node_modules', 'dist', 'public'],
  settings: { 'import/resolver': { typescript: true } },
  globals: { vi: true },
}
