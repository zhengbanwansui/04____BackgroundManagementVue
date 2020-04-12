import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'hello',
    component: () => import('../views/Hello.vue')
  },
  {
    path: '/1-1',
    name: '1-1',
    component: () => import('../views/1-1.vue')
  },
  {
    path: '/1-2',
    name: '1-2',
    component: () => import('../views/1-2.vue')
  },
  {
    path: '/1-3',
    name: '1-3',
    component: () => import('../views/1-3.vue')
  },
  {
    path: '/1-4',
    name: '1-4',
    component: () => import('../views/1-4.vue')
  },
  {
    path: '/listData',
    name: 'listData',
    component: () => import('../views/listData.vue')
  },
  {
    path: '/insertData',
    name: 'insertData',
    component: () => import('../views/insertData.vue')
  },
  {
    path: '/updateData',
    name: 'updateData',
    component: () => import('../views/updateData.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
