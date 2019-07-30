export default [{
    path: 'distribution',
    meta: {
        requiresAuth: true
    },
    redirect: {
        name: 'distribution.task'
    }
},
{
    path: 'distribution/task',
    name: 'distribution.task',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./task')
},
{
    path: 'distribution/order',
    name: 'distribution.order',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./order')
},
{
    path: 'distribution/personnel',
    name: 'distribution.personnel',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./personnel')
},
{
    path: 'distribution/personnel/state/:id.html',
    name: 'distribution.personnel.state',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import('./state')
}
]
