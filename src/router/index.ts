import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '@/views/HomeView.vue'

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'simple'
    },
    component: () => import('@/views/AboutView.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      layout: 'simple'
    },
    component: () => import('@/views/NotFoundView.vue')
  }
]

// init
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
