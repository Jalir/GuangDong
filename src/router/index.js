import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
// import App from '../App'
// import store from '../store/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/cutv'
  },
  {
    path: '/home/',
    redirect: '/home/cutv',
    component: () => import(/* webpackChunkName: "Home" */ '../components/Home/ShowMain.vue'),
    children: [{
      path: 'cutv/:tvColumn?',
      name: 'CUTV',
      component: () => import(/* webpackChunkName: "AA" */ '../components/Home/Items/SecondItems/CUTV.vue')
    }, {
      path: 'gdtv/:tvColumn?',
      name: 'GDTV',
      component: () => import(/* webpackChunkName: "AA" */ '../components/Home/Items/SecondItems/GDTV.vue')
    }
    ]
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import(/* webpackChunkName: "Video" */ '../components/Home/Items/SecondItems/ListDetails/Video.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/ArticleMin.vue')
  },
  // {
  //   path: '/mould',
  //   name: 'Mould',
  //   component: () => import(/* webpackChunkName: "Article" */ '../views/MouldPage.vue')
  // },
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "Search" */ '../components/Home/nav-search-input/SearchResult.vue')
  },
  {
    path: '/live',
    name: 'Live',
    component: () => import(/* webpackChunkName: "Search" */ '../views/LiveModule.vue')
  },
  {
    path: '/advanced',
    name: 'Advanced',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Advanced.vue'),
    children: [{
      path: 'cutv/:tvColumn?',
      name: 'CUTV',
      component: () => import(/* webpackChunkName: "AA" */ '../components/Advanced/advancedCUTV.vue')
    }]
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "Error" */ '../components/error.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "Error" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  // await store.dispatch('checkLogin')
  if (to.path === '/404' || to.path === '/error') {
    next()
  } else if (!localStorage.getItem('token')) {
    next({ path: '/error' })
  } else if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/404')
  } else {
    next()
  }
})

export default router
