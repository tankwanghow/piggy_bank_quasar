
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/PageWelcome.vue')
      },
      {
        path: '/dashboard',
        meta: { requireLogin: true }, 
        name: 'dashboard', 
        component: () => import('pages/PageDashBoard.vue')
      },
      {
        path: '/sowcard',
        meta: { requireLogin: true }, 
        component: () => import('pages/PageSowCard.vue')
      },
      {
        path: '/login',
        name: 'login', 
        component: () => import('pages/PageLogin.vue')
      },
      {
        path: '/signup',
        name: 'signup', 
        component: () => import('pages/PageSignup.vue')
      }
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
