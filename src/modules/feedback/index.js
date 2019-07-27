const routes = [{
    path: 'feedback',
    name: 'feedback',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import ('./feedback')
}]

export { routes }