
export default [{
    path: 'seller/orderview/:order.html',
    name: 'seller.orderview',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./order-view')
},
{
    path: 'seller/orderlist',
    name: 'seller.orderlist',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./orderList')
}
]