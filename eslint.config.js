const security = require('eslint-plugin-security');

module.exports = [
  {
    ignores: ['node_modules/**', '_build/**', 'dist/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        // jQuery
        $: 'readonly',
        jQuery: 'readonly'
      }
    },
    plugins: {
      security
    },
    rules: {
      ...security.configs.recommended.rules
    }
  }
];
