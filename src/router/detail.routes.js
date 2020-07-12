export default [
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail'),
    meta: {
      keepAlive: true
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
