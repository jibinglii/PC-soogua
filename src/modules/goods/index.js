const routes = [{
        path: 'goods/:goods.html',
        name: 'goods',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./goods')
    },
    {
        path: 'gamecenter',
        name: 'gamecenter',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./list')
    },
    {
        path: 'goods/refer',
        name: 'goods.refer',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./refer')
    },
    {
        path: 'goods/flow',
        name: 'goods.flow',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./flow')
    },
    {
        path: 'goods/account',
        name: 'goods.account',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./account')
    },
    {
        path: 'goods/service',
        name: 'goods.service',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./service')
    }
]

export { routes }