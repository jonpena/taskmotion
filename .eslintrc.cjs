module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['react-refresh'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./client/tsconfig.json', './server/tsconfig.json', './shared/tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'max-lines': ['warn', { max: 250 }],
  },
  overrides: [
    {
      files: ['client/**/*.{ts,tsx}'],
      parserOptions: {
        project: './client/tsconfig.json',
      },
    },
    {
      files: ['client/vite.config.ts'],
      parserOptions: {
        project: './client/tsconfig.node.json',
      },
    },
    {
      files: ['server/**/*.{ts,tsx}'],
      parserOptions: {
        project: './server/tsconfig.json',
      },
    },
  ],
};
