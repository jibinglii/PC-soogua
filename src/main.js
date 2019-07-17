import Vue from 'vue'
import http from '$utils/http'
import Element from 'element-ui'
import { sync } from 'vuex-router-sync'
import Root from './root'
import router from './router'
import store from './vuex'
import Toast from 'vant/lib/toast'
import Notify from 'vant/lib/notify'
import 'vant/lib/toast/style'
import VueCookies from 'vue-cookies';
import Lazyload from 'vant/lib/lazyload'
Vue.use(Lazyload)
Vue.use(VueCookies)

sync(store, router)

Vue.use(Element)
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.prototype.$http = http
Vue.prototype.$user = () => {
    return store.getters.currentUser
}
Vue.prototype.$currentStore = () => {
    return store.getters.currentStore
}

Vue.config.productionTip = false
store.dispatch('storeInfo')
setTimeout(() => {
    new Vue({
        store,
        router,
        render: h => h(Root)
    }).$mount('#app')
}, 200)