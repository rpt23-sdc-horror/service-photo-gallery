const allowCamelCase = [
  'other_photos', 'product_id', 'style_id',
  'main_photo', 'thumbnail_url', 'regular_url',
];

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  globals: {
    shallow: true,
    render: true,
    mount: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/recommended', 'plugin:jest/style'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ['react', 'jest'],
  rules: {
    camelcase: [
      'error', { allow: allowCamelCase },
    ],
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'linebreak-style': ['error', 'windows'],
    'react/destructuring-assignment': ['warn', 'always', { ignoreClassFields: true }],
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
