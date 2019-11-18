// imports for the application's components

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'

Vue.use(Router)


// defined some routes as guest (which means only users not authenticated should see it), some to require authentication (which means only authenticated users should see it) and the last one to be only accessible to admin users.

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
  ]
})

// Vue-router has a beforeEach method that is called before each route is processed. This is where we can define our checking condition and restrict user access. The method takes three parameters — to, from and next. to is where the user wishes to go, from is where the user is coming from, next is a callback function that continues the processing of the user request. Our check is on the to object.

router.beforeEach((to, from, next) => {
  // if route requiresAuth, check for a jwt token showing the user is logged in.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      // if route requiresAuth and is only for admin users, check for auth and check if the user is an admin
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1){
          next()
        }
        else {
          next({ name: 'userboard' })
        }
      } else {
          // next() called at the end of every condition being checked to prevent application from failing in the event that there is a condition you forgot to check
          next()
      }
    }
  // if route requires guest, check if the user is logged in
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})

export default router
