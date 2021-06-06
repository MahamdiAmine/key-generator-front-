import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home.vue'
import dashboard from '@/views/Dashboard.vue'
import createKey from '@/views/CreateKey.vue'
import about from '@/views/About.vue'
import keyDetail from '@/views/KeyDetail.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: home
  },
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
    path: '/about',
    name: 'About',
    component: about
  },
  {
    path: '/key/:id',
    name: 'KeyDetail',
    component: keyDetail,
    props: true
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
