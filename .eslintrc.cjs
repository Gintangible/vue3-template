module.exports = {
  // 当前配置文件不能往父级查找
  root: true,
  // 指定环境的全局变量
  env: {
    browser: true,
    node: true,
  },
  // parser: 'vue-eslint-parser',
  extends: [
    // 校验vue组件，需要安装 eslint-plugin-vue
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: [
    'vite.config.js',
  ],
  rules: {
    'vue/html-self-closing': 0,
    // 强制每行的最大属性数
    'vue/max-attributes-per-line': [2, {
      // 单行时可以接收最大数量
      singleline: 3,
      // 多行时可以接收最大数量
      multiline: {
        max: 1,
      },
    }],
    'vue/multi-word-component-names': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // 强制类方法使用 this
    'class-methods-use-this': 'off',
    // 要求或禁止末尾逗号
    'comma-dangle': ['error', 'only-multiline'],
    // 文件末尾换行
    'eol-last': 2,
    // 强制行的最大长度
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    // 禁用 console
    'no-console': 'off',
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'off',
    // 禁止不规则的空白
    'no-irregular-whitespace': 'off',
    'no-lonely-if': 'off',
    // 禁止使用 new 以避免产生副作用
    'no-new': 'off',
    // 不允许空格和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 'off',
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 'off',
    // 禁用特定的语法
    'no-restricted-syntax': 'off',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 'off',
    // 优先使用数组和对象解构
    'prefer-destructuring': 'error',
    // 要求或禁止使用分号代替 ASI
    semi: [2, 'always'],
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
  },
};
