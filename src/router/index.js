import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import { routes as person } from '$modules/person'
import { routes as buyerorder } from '$modules/buyerorder'
import { routes as goods } from '$modules/goods'
import { routes as sellerorder } from '$modules/sellerorder'
import { routes as shop } from '$modules/shop'
import { routes as distribution } from '$modules/distribution'
import { routes as help } from '$modules/help'
import { routes as feedback } from '$modules/feedback'
import { routes as message } from '$modules/message'
import { routes as collection } from '$modules/collection'
import { routes as commodity } from '$modules/commodity'
import { routes as flow } from '$modules/flow'
import { routes as settle } from '$modules/settle'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
Vue.use(Router)

const AppRoute = {
    path: '/:store/',
    component: () =>
        import ('../app'),
    children: [...home, ...auth, ...person, ...goods, ...buyerorder, ...sellerorder, ...shop, ...distribution, ...help, ...feedback, ...message, ...collection, ...commodity, ...flow, ...settle]
}