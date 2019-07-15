const routes = [
    {
        path: 'buyer/order',
        name: 'buyer.order',
        component: () => import('./order')
    }
]

export {routes}