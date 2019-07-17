export default [
    {
        path: 'buyer/order',
        name: 'buyer.order',
        meta: {
            requiresAuth: true
        },
        component: () => import('./order')
    },
]

