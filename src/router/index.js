import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'index',
        meta: { title: '首页', noCache: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login'),
    name: 'login',
    meta: { title: '登录', noCache: true }
  },
  {
    path: '/register',
    component: () => import('@/views/user/register'),
    name: 'register',
    meta: { title: '首页', noCache: true }
  },
  {
    path: '/control',
    component: layout,
    redirect: '/control/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/controlCenter'),
        name: 'coontrol/index',
        meta: { title: '我的后台', noCache: true }
      },
      {

        path: 'gift',
        component: () => import('@/views/controlCenter/gift'),
        name: 'coontrol/gift',
        meta: { title: '礼品', noCache: true }
      },
      {
        path: 'buy',
        component: () => import('@/views/controlCenter/buy'),
        name: 'control/buy',
        meta: { title: '采购', noCache: true }
      },
      {
        path: 'order',
        component: () => import('@/views/controlCenter/order'),
        name: 'control/order',
        meta: { title: '我的订单', noCache: true }
      },
      {
        path: 'check',
        component: () => import('@/views/controlCenter/check'),
        name: 'control/check',
        meta: { title: '我的订单', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
