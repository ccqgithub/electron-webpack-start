module.exports = {
  globals: {
    __static: true,
  },
  parserOptions: {
    // move it into parserOptions, for eslint-plugin-vue
    // https://github.com/vuejs/eslint-plugin-vue#couple-faq
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    // https://github.com/babel/eslint-plugin-babel
    'babel',
    'vue',
    'prettier'
  ],
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/strongly-recommended',

    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb-base',

    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    'prettier',
    'prettier/standard',
    'prettier/vue',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    // 强制使用全等
    eqeqeq: 'warn',
    // prettier 格式化
    'prettier/prettier': 'warn',
    // 未使用变量
    'no-unused-vars': ['warn', { args: 'none' }],
    // new
    'no-new': 'off',
    // 不能使用console
    'no-console': 'off',
    // 禁止使用 javascript: url
    'no-script-url': 'warn',
    // 不能定义和父作用域同名变量
    'no-shadow': 'warn',
    // 不重新设置参数
    'no-param-reassign': 'off',
    // 变量不使用下划线
    'no-underscore-dangle': 'off',
    // 未改变的变量，强制使用const
    'prefer-const': 'off',
    // 只能使用解构获取对象的值
    'prefer-destructuring': 'off',
    // 不能导入dependencies之外的模块，比如devDependencies
    'import/no-extraneous-dependencies': 'off',
    // 强制 export default
    'import/prefer-default-export': 'off',
    // 不允许全局require
    'global-require': 'off',
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 'off',
    // 箭头函数body类型
    'arrow-body-style': 'off',
    // 回调函数使用箭头函数
    'prefer-arrow-callback': 'off',
    // html属性必须带引号
    'vue/html-quotes': 'error',
    // 不能在模板里用this
    'vue/this-in-template': 'error',
    // 属性
    // "vue/max-attributes-per-line": ["error", {
    //   "singleline": 2,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off"
  },
  "overrides": [
    // {
    //   "files": ["*-test.js","*.spec.js"],
    //   "rules": {
    //     "no-unused-expressions": "off"
    //   }
    // }
  ]
};
