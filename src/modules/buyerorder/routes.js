export default [
    {
        path: 'buyer/order',
        name: 'buyer.order',
        meta: {
            requiresAuth: true
        },
        component: () => import('./order')
    },
    {
        path: 'buyer/orderview/:order.html',
        name: 'buyer.orderview',
        meta: {
            requiresAuth: true
        },
        component: () => import('./order-view')
    },
]

