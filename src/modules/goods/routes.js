
export default [{
    path: 'goods/:goods.html',
    name: 'goods',
    component: () =>
        import('./goods')
},
{
    path: 'gamecenter',
    name: 'gamecenter',

    component: () =>
        import('./list')
},
{
    path: 'goods/refer/:goods.html',
    name: 'goods.refer',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./refer')
},
{
    path: 'goods/flow',
    name: 'goods.flow',
    component: () =>
        import('./flow')
},
{
    path: 'goods/account',
    name: 'goods.account',

    component: () =>
        import('./account')
},
{
    path: 'goods/service',
    name: 'goods.service',

    component: () =>
        import('./service')
}
]