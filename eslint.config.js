import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended']
        ],
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser
            }
        },
        rules: {
            'max-len': [
                'error',
                {
                    code: 120, // Set max line length to 80 characters
                    ignoreUrls: true, // Optional: Ignore long URLs
                    ignoreComments: false, // Optional: Don't ignore comments
                    ignoreStrings: false, // Optional: Don't ignore strings
                    ignoreTemplateLiterals: false // Optional: Don't ignore template literals
                }
            ]
        }
    },
    eslintConfigPrettier
)
