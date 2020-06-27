export default [
  {
    path: '/',
    name: 'home',
    redirect: '/recommend',
    component: () => import('@/views/home'),
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/recommend')
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/sort')
      },
      {
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/rank')
      },
      {
        path: 'new',
        name: 'new',
        component: () => import('@/views/new')
      }
    ]
  }
]
