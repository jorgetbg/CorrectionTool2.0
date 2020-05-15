import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
var VueCookie = require('vue-cookie');

import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Tell Vue to use the plugin
Vue.use(VueCookie);



Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
