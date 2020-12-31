export default [
  {
    path: '/',
    name: 'home',
    redirect: '/recommend',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/recommend'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/sort'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'finish',
        name: 'finish',
        component: () => import('@/views/finish'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'recent',
        name: 'recent',
        component: () => import('@/views/recent'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'bookshelf',
        name: 'bookshelf',
        component: () => import('@/views/bookshelf'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
          keepAlive: true
        }
      }
    ]
  }
]
