const routes = [{
        path: 'flow',
        name: 'flow',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./flow')
    }
    // 操作流程
]

export { routes }