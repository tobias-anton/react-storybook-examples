module.exports = {
  root: true,
  plugins: ['react', 'unused-imports'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        // Recommended rules when using React
        'plugin:react/recommended',
      ],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/no-children-prop': 'off',
        'react/prop-types': 'off',
        // TODO refactor code to remove this rule
        '@typescript-eslint/no-explicit-any': 'off',
        'eslint-comments/no-unused-disable': 'off',
      },
    },
  ],
};
