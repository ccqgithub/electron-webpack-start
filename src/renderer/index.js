import Vue from 'vue';
import store from './data/store/main';
import App from './App.vue';

import '../style/index.less';

// vue devtools
Vue.config.devtools = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
});
