import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { ignores: ['dist/**', 'eslint.config.mjs'], },
  { plugins: 
    { '@stylistic/js': stylisticJs, },
     rules: { 
      '@stylistic/js/indent': ['error', 2], 
      '@stylistic/js/linebreak-style': ['error', 'unix'], 
      '@stylistic/js/quotes': ['error', 'single'], 
      '@stylistic/js/semi': ['error', 'never'],    
    },   
  },
  { rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',    
      'object-curly-spacing': ['error', 'always'],    
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    }
  },
  pluginReact.configs.flat.recommended,
]);
