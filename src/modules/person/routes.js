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
        component: () =>
            import ('./profile')
    },
    {
        path: 'person/approve',
        name: 'person.approve',
        component: () =>
            import ('./approve')
    },
    {
        path: 'person/card',
        name: 'person.card',
        component: () =>
            import ('./card')
    },
    {
        path: 'person/addcard',
        name: 'person.addcard',
        component: () =>
            import ('./addcard')
    }
]