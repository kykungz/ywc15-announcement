// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import SocialSharing from 'vue-social-sharing'
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon'
import * as VueGoogleMaps from 'vue2-google-maps'
import vueSmoothScroll from 'vue-smoothscroll'
import VueLazyload from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    libraries: 'places'
  }
})

Vue.use(VueLazyload)
//
// // or with options
// Vue.use(VueLazyload, {
//   loading: 'static/images/rolling.svg'
// })
Vue.use(SocialSharing)
Vue.use(BootstrapVue)
Vue.use(vueSmoothScroll)

Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
