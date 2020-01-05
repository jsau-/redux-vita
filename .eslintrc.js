module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': './tsconfig.json',
    'sourceType': 'module'
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '[iI]gnored' }],
    camelcase: 'error',
    'capitalized-comments': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    complexity: 'error',
    'consistent-return': 'error',
    'default-case': 'error',
    'func-style': ['error', 'declaration'],
    'eol-last': ['error', 'always'],
    'id-blacklist': ['error', 'data', 'err', 'e', 'cb', 'callback'],
    'id-length': ['error', { min: 2 }],
    'implicit-arrow-linebreak': ['off'],
    indent: ['error', 2],
    'line-comment-position': ['error', { position: 'above' }],
    'linebreak-style': ['error', 'unix'],
    'max-classes-per-file': ['error', 1],
    'max-depth': 'error',
    'max-len': ['error', 80],
    'max-nested-callbacks': ['error', 5],
    'max-params': ['error', 10],
    'max-statements-per-line': ['error', { max: 1 }],
    'multiline-comment-style': ['error', 'starred-block'],
    'new-parens': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-extend-native': 'error',
    'no-eval': 'error',
    'no-tabs': 'error',
    'no-underscore-dangle': 'off',
    'no-warning-comments': [
      'error',
      {
        terms: ['xxx', 'todo', 'fixme'],
      },
    ],
    'no-var': 'error',
    'operator-linebreak': ['error', 'after'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'sort-keys': ['error', 'asc', { natural: true }],
    yoda: ['error', 'always'],
  },
  settings: {
    'import/extensions': ['.js','.jsx','.ts','.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts','.tsx']
    },
    'import/resolver': {
      'node': {
        'extensions': ['.js','.jsx','.ts','.tsx']
      }
    }
  }
};
