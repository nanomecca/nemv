import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import axios from 'axios'

Vue.use(Router)

// Vue.prototype.$axios = axios
// const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
// Vue.prototype.$apiRootPath = apiRootPath

// const pageCheck = (to, from, next) => {
//   // return next()
//   axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
//     .then((r) => {
//       if (!r.data.success) throw new Error(r.data.msg)
//       next()
//     })
//     .catch((e) => {
//       // console.error(e.message)
//       next(`/block/${e.message}`)
//     })
// }
Vue.prototype.$axios = axios

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user.vue')
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import('./views/header'),
      // ##네비게이션 가드 처리##
      // to: 라우트: 대상 Route 객체 로 이동합니다.
      // from: 라우트: 현재 라우트로 오기전 라우트 입니다.
      // next: 함수: 이 함수는 훅을 해결하기 위해 호출 되어야 합니다. 액션은 next에 제공된 전달인자에 달려 있습니다.
      // next(): 파이프라인의 다음 훅으로 이동하십시오. 훅이 없는 경우 네비게이션은 승인됩니다.
      // next(false): 현재 네비게이션을 중단합니다. 브라우저 URL이 변경되면(사용자 또는 뒤로 버튼을 통해 수동으로 변경됨) from경로의 URL로 재설정됩니다.
      // next('/') 또는 next({ path: '/' }): 다른 위치로 리디렉션합니다. 현재 네비게이션이 중단되고 새 네비게이션이 시작됩니다
      beforeEnter: (to, from, next) => {
        // console.log(to)
        // console.log(from)
        if (!localStorage.getItem('token')) return next('block')
        next()
      }
    },
    {
      path: '/block',
      name: '차단',
      component: () => import('./views/block')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign.vue')
    }
  ]
})
