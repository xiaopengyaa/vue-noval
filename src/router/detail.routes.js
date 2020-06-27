export default [
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail')
  },
  {
    path: '/detail/reader',
    name: 'detailReader',
    component: () => import('@/views/detail/detailReader')
  }
]
