// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import SocialSharing from 'vue-social-sharing'

import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import { Tabs, Tab } from 'vue-tabs-component'

Vue.use(SocialSharing)
Vue.use(BootstrapVue)

Vue.component('tabs', Tabs)
Vue.component('tab', Tab)
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
