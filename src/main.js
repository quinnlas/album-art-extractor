import Vue from 'vue'
import store from './store/store'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

store.dispatch('authorize')

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
