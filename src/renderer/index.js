import Vue from 'vue/dist/vue';

import App from './App.vue';

import '../style/index.less';

// vue devtools
Vue.config.devtools = true;

new (Vue.extend(App))({}).$mount('#app');
