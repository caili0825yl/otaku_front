import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import 'normalize.css'
import VueCookie from 'vue-cookies'
Vue.config.productionTip = false



Vue.use(VueCookie)
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3050/api',
  withCredentials:true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
