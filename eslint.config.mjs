import nextPlugin from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'graphify-out',
      '*.config.js',
      '*.config.ts',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
];
