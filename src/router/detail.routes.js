export default [
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/detail/reader',
    name: 'detailReader',
    component: () => import('@/views/detail/detailReader'),
    meta: {
      keepAlive: false
    }
  }
]
