import Vue from 'vue'
import http from '$utils/http'
import Element from 'element-ui'
import { sync } from 'vuex-router-sync'
import Root from './root'
import router from './router'
import store from './vuex'

sync(store, router)

Vue.use(Element)
Vue.prototype.$http = http
Vue.prototype.$user = () => {
  return store.getters.currentUser
}

Vue.config.productionTip = false
setTimeout(() => {
  new Vue({
    store,
    router,
    render: h => h(Root)
  }).$mount('#app')
}, 200)
