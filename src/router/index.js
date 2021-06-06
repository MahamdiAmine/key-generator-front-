import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '@/views/Dashboard.vue'
import createKey from '@/views/CreateKey.vue'
import keyDetail from '@/views/KeyDetail.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: dashboard
  },
  {
    path: '/create-key',
    name: 'CreateKey',
    component: createKey
  },
  {
    path: '/key/:id',
    name: 'KeyDetail',
    component: keyDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
