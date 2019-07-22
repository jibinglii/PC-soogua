const routes = [{
        path: 'help/help',
        name: 'help.help',
        component: () =>
            import ('./help')
    },
    {
        path: 'help/details/:id.html',
        name: 'help.details',
        component: () =>
            import ('./details')
    },
    {
        path: 'help/sort',
        name: 'help.sort',
        component: () =>
            import ('./sort')
    },
    {
        path: 'help/sortlist/:id.html',
        name: 'help.sortlist',
        component: () =>
            import ('./sortList')
    }
]

export { routes }