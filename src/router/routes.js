
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
        component: () => import('pages/user/signup.vue')
      },
      {
        path: '/user_list',
        name: 'user list', 
        meta: { requireLogin: true }, 
        component: () => import('pages/user/index.vue')
      },
      {
        path: '/editUser',
        name: 'edit user',
        meta: { requireLogin: true }, 
        component: () => import('pages/user/edit.vue')
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
      },
      {
        path: '/joinFarm',
        name: 'join farm',
        meta: { requireLogin: true }, 
        component: () => import('pages/farm/join.vue')
      },
      {
        path: '/changeFarm',
        name: 'change farm',
        meta: { requireLogin: true }, 
        component: () => import('pages/farm/change.vue')
      },
      {
        path: '/withdrawFarm',
        name: 'withdraw farm',
        meta: { requireLogin: true }, 
        component: () => import('pages/farm/withdraw.vue')
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
