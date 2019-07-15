const routes = [
    {
        path: 'shop',
        name: 'shop',
        component: () => import('./shop')
    },
    {
        path: 'shop/release',
        name: 'shop.release',
        component: () => import('./release')
    },
    {
        path: 'shop/profile',
        name: 'shop.profile',
        component: () => import('./profile')
    },
    {
        path: 'shop/selectgame',
        name: 'shop.selectgame',
        component: () => import('./selectgame')
    },
    {
        path: 'shop/types',
        name: 'shop.types',
        component: () => import('./types')
    },
    {
        path: 'shop/fill',
        name: 'shop.fill',
        component: () => import('./fill')
    },
    {
        path: 'shop/success',
        name: 'shop.success',
        component: () => import('./success')
    },
    {
        path: 'shop/payresult',
        name: 'shop.payresult',
        component: () => import('./payresult')
    }
]

export {routes}