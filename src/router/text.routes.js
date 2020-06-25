export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/Home')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@views/About')
  }
]
