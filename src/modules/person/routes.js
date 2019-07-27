export default [{
        path: 'person',
        name: 'person.person',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./person')
    },
    {
        path: 'person/resetpwd',
        name: 'person.resetpwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./resetpwd')
    },
    {
        path: 'person/resetpaypwd',
        name: 'person.resetpaypwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./resetpaypwd')
    },
    {
        path: 'person/setpaypwd',
        name: 'person.setpaypwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./setpaypwd')
    },
    {
        path: 'person/profile',
        name: 'person.profile',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./profile')
    },
    {
        path: 'person/approve',
        name: 'person.approve',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./approve')
    },
    {
        path: 'person/card',
        name: 'person.card',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./card')
    },
    {
        path: 'person/addcard',
        name: 'person.addcard',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./addcard')
    }
]