
export default [
    {
        path: 'settle',
        redirect: {
            name: 'settle.order'
        }, meta: {
            requiresAuth: true
        },
    },
    {
        path: 'settle/order',
        name: 'settle.order',
        meta: {
            requiresAuth: true
        },
        component: () => import('./order')
    },
    {
        path: 'settle/record',
        name: 'settle.record',
        meta: {
            requiresAuth: true
        },
        component: () => import('./record')
    },
    {
        path: 'settle/monthlybill',
        name: 'settle.monthlybill',
        meta: {
            requiresAuth: true
        },
        component: () => import('./monthlybill')
    },
    {
        path: 'settle/details',
        name: 'settle.details',
        meta: {
            requiresAuth: true
        },
        component: () => import('./details')
    },
    {
        path: 'settle/withdraw',
        name: 'settle.withdraw',
        meta: {
            requiresAuth: true
        },
        component: () => import('./withdraw')
    }
    // 结算管理
]
