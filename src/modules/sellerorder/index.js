const routes = [{
        path: 'seller/orderview',
        name: 'seller.orderview',
        component: () =>
            import ('./order-view')
    },
    {
        path: 'seller/orderlist',
        name: 'seller.orderlist',
        component: () =>
            import ('./orderList')
    }
]

export { routes }