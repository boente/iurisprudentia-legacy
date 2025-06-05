module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'template-curly-spacing': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 120 }],
  },
};
