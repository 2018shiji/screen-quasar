
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: 'clientConfig', component: () => import('components/ClientScreen.vue') },
      { path: 'serverConfig', component: () => import('components/ServerScreen.vue') },

      { path: 'clientPlan1', component: () => import('components/plan/Plan1.vue') },
      { path: 'clientPlan2', component: () => import('components/plan/Plan2.vue') },
      { path: 'clientPlan3', component: () => import('components/plan/Plan3.vue') },

      { path: 'clientScript', component: () => import('components/ClientScript.vue') },

      { path: 'videoConfig', component: () => import('components/VideoConfig.vue') },
      { path: 'videoControl', component: () => import('components/VideoControl.vue') },

      { path: 'serverService', component: () => import('components/ServerService.vue') },
      { path: 'clientService', component: () => import('components/ClientService.vue') },

      { path: 'screenControl', component: () => import('components/ScreenControl.vue') }
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
