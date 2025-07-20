// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config({
    files: ["**/*.ts", "**/*.tsx"],
    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
        eslintJs.configs.recommended,
        ...tseslint.configs.recommended,
        eslintReact.configs["recommended-typescript"],
    ],
    // Configure language/parsing options
    languageOptions: {
        // Use TypeScript ESLint parser for TypeScript files
        parser: tseslint.parser,
        parserOptions: {
            // Enable project service for better TypeScript integration
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    plugins: {
        "react-hooks": reactHooks,
        "react-compiler": reactCompiler,
    },
    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
        "@eslint-react/no-missing-key": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react-compiler/react-compiler": "error",
        "@typescript-eslint/no-namespace": [
            "error",
            {
                allowDeclarations: true,
                allowDefinitionFiles: true,
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_" },
        ],
    },
    // Ignore generated files and build output
    ignores: [
        ".react-router/types/**/*",
        "build/**/*",
        "dist/**/*",
        "node_modules/**/*",
    ],
});
