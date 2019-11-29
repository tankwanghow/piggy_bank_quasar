
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/PageWelcome.vue') },
      { path: '/dashboard', component: () => import('pages/PageDashBoard.vue') },
      { path: '/sowcard', component: () => import('pages/PageSowCard.vue') },
      { path: '/login', component: () => import('pages/PageLogin.vue') },
      { path: '/signup', component: () => import('pages/PageSignup.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
