const routes = [
    {
        path: 'person',
        name: 'person',
        component: () => import('./person')
    },
    {
        path: 'person/resetpwd',
        name: 'person.resetpwd',
        component: () => import('./resetpwd')
    },
    {
        path: 'person/resetpaypwd',
        name: 'person.resetpaypwd',
        component: () => import('./resetpaypwd')
    },
    {
        path: 'person/profile',
        name: 'person.profile',
        component: () => import('./profile')
    },
    {
        path: 'person/approve',
        name: 'person.approve',
        component: () => import('./approve')
    },
    {
        path: 'person/card',
        name: 'person.card',
        component: () => import('./card')
    },
    {
        path: 'person/addcard',
        name: 'person.addcard',
        component: () => import('./addcard')
    }
]

export {routes}