import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LocalNotifications from '@/components/local-notifications'
import ForegroundDetection from '@/components/foreground-detections'
import CameraMicrofone from '@/components/camera-microfone'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/local-notifications',
    name: 'LocalNotifications',
    component: LocalNotifications
  },
  {
    path: '/foreground-detections',
    name: 'ForegroundDetection',
    component: ForegroundDetection
  },
  {
    path: '/camera-microfone',
    name: 'CameraMicrofone',
    component: CameraMicrofone
  }
]

const router = new VueRouter({
  routes
})

export default router
