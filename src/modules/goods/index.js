const routes = [{
        path: 'goods:goods.html',
        name: 'goods',
        component: () =>
            import ('./goods')
    },
    {
        path: 'gamecenter',
        name: 'gamecenter',
        component: () =>
            import ('./list')
    },
    {
        path: 'goods/refer',
        name: 'goods.refer',
        component: () =>
            import ('./refer')
    },
    {
        path: 'goods/flow',
        name: 'goods.flow',
        component: () =>
            import ('./flow')
    },
    {
        path: 'goods/account',
        name: 'goods.account',
        component: () =>
            import ('./account')
    },
    {
        path: 'goods/service',
        name: 'goods.service',
        component: () =>
            import ('./service')
    }
]

export { routes }