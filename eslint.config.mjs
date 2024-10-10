import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierEslint from 'eslint-config-prettier';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    prettierEslint,
    {
        rules: { 'no-undef-init': 'error' },
        ignores: [
            'node_modules/*',
            './node_modules/**',
            '**/node_modules/**',
            '.git/',
            '*.config.*',
        ],
    },
];
