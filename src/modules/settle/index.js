const routes = [
    {
        path: 'settle',
        redirect: {
            name: 'settle.order'
        }
    },
    {
        path: 'settle/order',
        name: 'settle.order',
        component: () => import('./order')
    },
    {
        path: 'settle/record',
        name: 'settle.record',
        component: () => import('./record')
    },
    {
        path: 'settle/monthlybill',
        name: 'settle.monthlybill',
        component: () => import('./monthlybill')
    },
    {
        path: 'settle/details',
        name: 'settle.details',
        component: () => import('./details')
    }
    // 结算管理
]

export { routes }