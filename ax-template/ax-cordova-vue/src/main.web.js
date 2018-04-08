import Vue from 'vue'
import App from './App'
import router from './router'
import 'reset-css/reset.css'

if (window.config.mock) {
  require('./mock/index')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: {App},
  template: '<App/>'
})
