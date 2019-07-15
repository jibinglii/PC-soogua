const routes = [
    {
        path: 'distribution',
        redirect: {
            name: 'distribution.task'
        }
    },
    {
        path: 'distribution/task',
        name: 'distribution.task',
        component: () => import('./task')
    },
    {
        path: 'distribution/order',
        name: 'distribution.order',
        component: () => import('./order')
    },
    {
        path: 'distribution/personnel',
        name: 'distribution.personnel',
        component: () => import('./personnel')
    },
    {
        path: 'distribution/personnel/state',
        name: 'distribution.personnel.state',
        component: () => import('./state')
    }
]

export { routes }