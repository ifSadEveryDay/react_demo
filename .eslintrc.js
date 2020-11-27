module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: ['plugin:@typescript-eslint/recommended', '@smart/standard', 'plugin:react/recommended' ],
    plugins: ['react', '@typescript-eslint'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
    },
    globals: {
      'Cesium': true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaFeatures: {
        jsx: true
      }
    }
  };  