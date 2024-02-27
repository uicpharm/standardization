module.exports = {
   root: true,
   env: {
      node: true,
   },
   extends: [
      '@vue/typescript/recommended',
      'plugin:vue/vue3-recommended',
      '@vue/airbnb',
   ],
   ignorePatterns: [
      'cache',
      'dist',
      '!.vitepress',
   ],
   parserOptions: {
      ecmaVersion: 2020,
   },
   settings: {
      'import/resolver': {
         node: {
            extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
         },
      },
   },
   rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-cond-assign': [ 'error', 'except-parens' ],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-underscore-dangle': [ 'error', { allowAfterThis: true } ],
      indent: [ 'error', 3 ],
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
         },
      ],
      'import/no-extraneous-dependencies': [
         'error',
         {
            devDependencies: [
               '**/*.test.*',
               '**/.vitepress/**/*',
               'gulpfile.*',
               'vue.config.*',
            ],
         },
      ],
      'lines-between-class-members': [ 'error', 'always', { exceptAfterSingleLine: true } ],
      '@typescript-eslint/no-var-requires': 'off',
   },
   overrides: [
      {
         files: [ '**/*.vue' ],
         parser: 'vue-eslint-parser',
         env: {
            'vue/setup-compiler-macros': true,
            browser: true,
         },
         rules: {
            'vue/html-indent': [ 'error', 3 ],
         },
      },
      {
         files: [ '**/*.test.ts' ],
         env: {
            jest: true,
         },
      },
   ],
};
