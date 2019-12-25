
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/pgWelcome.vue')
      },
      {
        path: '/dashboard',
        meta: { requireLogin: true }, 
        name: 'dashboard', 
        component: () => import('pages/pgDashBoard.vue')
      },
      {
        path: '/sowcard',
        meta: { requireLogin: true }, 
        component: () => import('pages/pgSowCard.vue')
      },
      {
        path: '/login',
        name: 'login', 
        component: () => import('pages/pgLogin.vue')
      },
      {
        path: '/signup',
        name: 'signup', 
        component: () => import('pages/pgSignup.vue')
      },
      {
        path: '/createFarm',
        name: 'create farm',
        meta: { requireLogin: true }, 
        component: () => import('pages/farm/create.vue')
      },
      {
        path: '/editFarm/:id',
        name: 'edit farm',
        meta: { requireLogin: true }, 
        component: () => import('pages/farm/edit.vue')
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
