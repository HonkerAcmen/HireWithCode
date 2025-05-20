import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: 'reder',
          component: () => import('@/views/Layout/components/reder.vue'),
        },
      ],
    },
  ],
})

export default router
