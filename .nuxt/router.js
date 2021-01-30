import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _35d0dbe7 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _d69c3e48 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _01c2830c = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _7454c08c = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _b0f93cc0 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _2a02022a = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _5b1f03d9 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _35d0dbe7,
    children: [{
      path: "",
      component: _d69c3e48,
      name: "home"
    }, {
      path: "/login",
      component: _01c2830c,
      name: "login"
    }, {
      path: "/register",
      component: _01c2830c,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _7454c08c,
      name: "profile"
    }, {
      path: "/settings",
      component: _b0f93cc0,
      name: "settings"
    }, {
      path: "/editor",
      component: _2a02022a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5b1f03d9,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
