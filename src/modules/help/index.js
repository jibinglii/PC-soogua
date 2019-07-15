const routes = [
    {
        path: 'help',
        name: 'help',
        component: () => import('./help')
    },
    {
        path: 'help/:tab/:index',
        name: 'help.details',
        component: () => import('./details')
    }
]

export {routes}