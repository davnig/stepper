import jsPlugin from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHookPlugin from 'eslint-plugin-react-hooks'
import tailwindcss from 'eslint-plugin-tailwindcss'

// https://www.npmjs.com/package/@eslint/js
const jsConfig = {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
        ...jsPlugin.configs.rules,
        'no-unused-vars': 'warn',
    },
}

// https://www.npmjs.com/package/eslint-plugin-react
const jsxConfig = {
    files: ['**/*.jsx'],
    plugins: {
        react: reactPlugin,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    rules: {
        ...jsPlugin.configs.rules,
        'react/jsx-key': 'off',
    },
}

// https://typescript-eslint.io/linting/typed-linting/monorepos
const tsConfig = {
    files: ['**/*.ts'],
    languageOptions: {
        parser: tsParser,
    },
    plugins: {
        '@typescript-eslint': tsPlugin,
    },
    rules: {
        ...tsPlugin.configs['recommended'].rules,
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
    },
}

// https://typescript-eslint.io/linting/typed-linting/monorepos
const tsxConfig = {
    files: ['**/*.tsx'],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    plugins: {
        '@typescript-eslint': tsPlugin,
        react: reactPlugin,
    },
    rules: {
        ...tsPlugin.configs['recommended'].rules,
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
    },
}

// https://www.npmjs.com/package/eslint-plugin-react-hooks
const hookPlugin = {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
        'react-hooks': reactHookPlugin,
    },
}

// https://www.npmjs.com/package/eslint-plugin-tailwindcss
const tailwindcssPlugin = {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
        tailwindcss: tailwindcss,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    rules: {
        ...tailwindcss.configs.recommended.rules,
        'tailwindcss/no-unnecessary-arbitrary-value': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/enforces-shorthand': 'off',
    },
    settings: {
        tailwindcss: {
            callees: ['cn'],
            config: './tailwind.config.js',
        },
    },
}

// https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
const ignorePlugin = {
    ignores: ['**/.*', 'node_modules/*', 'public/*', 'docs/*', 'dist/*'],
}

export default [jsConfig, jsxConfig, tsConfig, tsxConfig, hookPlugin, tailwindcssPlugin, ignorePlugin]
