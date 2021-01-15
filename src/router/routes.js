
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: 'clientConfig', component: () => import('components/ClientScreen.vue') },
      { path: 'serverConfig', component: () => import('components/ServerScreen.vue') },
      { path: 'test', component: () => import('components/Test.vue') },
      { path: 'testAddRow', component: () => import('components/TestAddRow.vue') },
      { path: 'testMultiCheckBox', component: () => import('components/TestMultiCheckBox.vue') },

      { path: 'clientPlan1', component: () => import('components/plan/Plan1.vue') },
      { path: 'clientPlan2', component: () => import('components/plan/Plan2.vue') },
      { path: 'clientPlan3', component: () => import('components/plan/Plan3.vue') },
      { path: 'clientPlan4', component: () => import('components/plan/Plan4.vue') },
      { path: 'clientPlan5', component: () => import('components/plan/Plan5.vue') },
      { path: 'clientPlan6', component: () => import('components/plan/Plan6.vue') },
      { path: 'clientPlan7', component: () => import('components/plan/Plan7.vue') },

      { path: 'clientScript', component: () => import('components/ClientScript.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
