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
    }
]

export { routes }