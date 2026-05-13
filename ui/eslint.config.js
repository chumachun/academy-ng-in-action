// @ts-check
const eslint = require('@eslint/js');
const { defineConfig, globalIgnores } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const stylistic = require('@stylistic/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const ngrxEslint = require('@ngrx/eslint-plugin/v9');
const prettierEslint = require('eslint-config-prettier/flat');

module.exports = tseslint.config(
  globalIgnores(['.angular/**', 'coverage/**', 'dist/**', 'node_modules/**']),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      stylistic.configs.customize({
        semi: true,
      }),
      angular.configs.tsRecommended,
      ngrxEslint.configs.store,
      ngrxEslint.configs.effects,
      ngrxEslint.configs.operators,
      ngrxEslint.configs.allTypeChecked,
    ],
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      'arrow-body-style': ['error', 'as-needed'],
      'comma-dangle': ['error', 'always-multiline'],
      curly: 'error',
      'no-console': ['warn', { 'allow': ["warn", "error", "debug"] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs/Rx',
              message: 'Please use rxjs only.',
            },
            {
              name: 'moment',
              message: 'Please use lodash-es/fooBar or dayjs instead.',
            },
            {
              name: 'dayjs',
              message: 'Please use dayjs/esm instead.',
            },
            {
              name: 'lodash',
              message: 'Please use lodash-es/fooBar instead.',
            },
            {
              name: 'lodash-es',
              message: 'Please use lodash-es/fooBar instead.',
            },
            {
              name: '@angular/forms',
              importNames: [
                'UntypedFormGroup',
                'UntypedFormBuilder',
                'FormBuilder',
                'UntypedFormControl',
                'UntypedFormArray',
              ],
              message:
                'Please use FormGroup, NonNullableFormBuilder, FormControl, FormArray instead of the untyped versions.',
            },
          ],
          patterns: [
            {
              group: ['**/*mock*'],
              message: 'Please remove mock data import from production build.',
            },
          ],
        },
      ],
      'prefer-template': 'error',

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
      ],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      // '@typescript-eslint/member-ordering': 'error', // Not suitable for academy set-up.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: ['classMethod', 'typeMethod', 'function', 'typeProperty', 'classProperty'],
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: ['typeLike', 'enumMember'],
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unsafe-type-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_+$',
          caughtErrors: 'all',
        },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*mock*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-inline-styles': [
        'error',
        {
          allowBindToStyle: true,
        },
      ],
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/prefer-class-binding': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',
      // '@angular-eslint/template/prefer-ngsrc': 'error', // Requires NgOptimizedImage.
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-static-string-properties': 'error',
      '@angular-eslint/template/prefer-template-literal': 'error',
    },
  },
  prettierEslint,
);
