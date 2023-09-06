import { createRouter, createWebHistory } from 'vue-router'
import ExhiView from '../views/exhi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/exhi/1'
    },
    {
      path: '/exhi/:exhi',
      name: 'exhi',
      component: ExhiView,
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('../views/drawer/main.vue')
        },
        {
          path: 'user/:id',
          name: 'user',
          component: () => import('../views/drawer/user.vue')
        },
        {
          path: 'booth/:id',
          name: 'booth',
          component: () => import('../views/drawer/booth.vue')
        }
      ]
    }
  ]
})

export default router
