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
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/rank'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'new',
        name: 'new',
        component: () => import('@/views/new'),
        meta: {
          keepAlive: true
        }
      }
    ]
  }
]
