
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
        meta: {
            requiresAuth: true
        },
        component: () => import('./selectgame')
    },
    {
        path: 'shop/add',
        name: 'shop.add',
        meta: {
            requiresAuth: true
        },
        component: () => import('./add')
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
        path: 'shop/spec/:id.html',
        name: 'shop.spec',
        meta: {
            requiresAuth: true
        },
        component: () => import('./spec')
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
    },
    {
        path: 'shop/edit-game-info/:id.html',
        name: 'shop.editGameInfo',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import('./EditGameInfo')
    },
    {
        path: 'shop/edit-game-spec/:id.html',
        name: 'shop.editGameSpec',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import('./EditGameSpec')
    },
]

