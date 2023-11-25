module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  overrides: [
    {
      env: {
        es6: true,
        browser: true,
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', '@tanstack/query'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-shadow': 0,
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 0,
    'no-console': 1,
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-no-useless-fragment': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-promise-executor-return': 0,
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
    '@typescript-eslint/ban-types': 0,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
    extensions: ['.ts'],
  },
  ignorePatterns: ['vite.config.ts'],
};
