import Vue from "vue";
import App from "./App";
import router from "./router";
import "reset-css/reset.css";

if (window.config.mock) {
  require('./mock/index')
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
document.addEventListener('deviceready', function () {
  new Vue({
    router,
    el: '#app',
    components: {App},
    template: '<App/>'
  })
}, false)
