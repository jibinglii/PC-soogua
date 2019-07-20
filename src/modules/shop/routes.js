
export default [
    {
        path: 'shop',
        name: 'shop',
        meta: {
            requiresAuth: true
        },
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
        meta: {
            requiresAuth: true
        },
        component: () => import('./profile')
    },
    {
        path: 'shop/selectgame',
        name: 'shop.selectgame',
        component: () => import('./selectgame')
    },
    {
        path: 'shop/types/:id.html',
        name: 'shop.types',
        component: () => import('./types')
    },
    {
        path: 'shop/fill/:id.html',
        name: 'shop.fill',
        meta: {
            requiresAuth: true
        },
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

