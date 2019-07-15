const routes = [
    {
        path: 'message',
        name: 'message',
        component: () => import('./message')
    },
    {
        path: 'message/:tab/:index',
        name: 'message.details',
        component: () => import('./details')
    }
]

export {routes}