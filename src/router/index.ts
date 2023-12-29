import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('../views/UpdateView.vue')
    },
    {
      path: '/city/:city',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/arcade/:arcade',
      name: 'arcade',
      component: () => import('../views/ArcadeView.vue')
    },
    // redirect 404 to /
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

export default router
