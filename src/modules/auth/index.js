const routes = [
    {
        path: 'auth/login',
        name: 'auth.login',
        component: () => import('./login')
    }
]

export { routes }
export { default as vuex } from './vuex'
