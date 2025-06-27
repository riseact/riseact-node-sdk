module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: 'detect' } },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react', 'jsx-a11y'],
  extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
