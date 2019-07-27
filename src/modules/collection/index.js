const routes = [

    {
        path: 'collection',
        name: 'collection',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./collection')
    }

]

export { routes }