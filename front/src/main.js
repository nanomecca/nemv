import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// process.env.NODE_ENV값이 production 일때와 아닐 때의 경로를 지정
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/' // 'prototype' vue전역변수

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
