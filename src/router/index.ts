import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Messenger from '@/views/Messenger.vue'

import { AuthGuard, NoAuthGuard } from './AuthGuard'
import AuthForgotPassword from '@/views/AuthForgotPassword.vue'
import VerifyEmail from '@/views/VerifyEmail.vue'
import messengerRoutes from './messenger.routes'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Messenger'
    }
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: VerifyEmail,
    meta: {
      requiresNoAuth: true
    }
  },

  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresNoAuth: true
    }
  },

  {
    path: '/messenger',
    name: 'Messenger',
    component: Messenger,
    meta: {
      requiresAuth: true
    },
    children: messengerRoutes
  },

  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: AuthForgotPassword,
    meta: {
      requiresNoAuth: true
    }
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(AuthGuard)
router.beforeEach(NoAuthGuard)

export default router
