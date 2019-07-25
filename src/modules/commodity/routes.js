
export default [
    {
        path: 'commodity',
        name: 'commodity',
        meta: {
            requiresAuth: true
        },
        component: () => import('./commodity')
    },

]
