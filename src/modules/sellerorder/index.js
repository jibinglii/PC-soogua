const routes = [
    {
        path: 'seller/order',
        name: 'seller.order',
        component: () => import('./order')
    }
]

export {routes}