import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '@/styles/index.scss' // global css
import './permission' // permission control
import './icons' // icon

import VueResource from 'vue-resource'

import './mock' // simulation data
import VueClipboard from 'vue-clipboard2'

Vue.use(VueResource)
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
