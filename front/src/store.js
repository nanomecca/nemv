import Vue from 'vue'
import Vuex from 'vuex'

// 상태: 전역 변수
// Getter: 변수 조합용
// 변이: 변수 변경
// 액션: 비동기 변수 변경
// 모듈: 여러개 사용할 때

Vue.use(Vuex)

export default new Vuex.Store({
  // state에 전역으로 사용할 변수를 선언합니다. 초기값을 로컬스토리지값을 넣습니다.(새로고침해도 토큰값을 유지하기 위함)
  // mutations에 전역변수가 변이할 때 할 일들을 정의 해둡니다.
  state: {
    token: localStorage.getItem('token')
  },
  mutations: {
    getToken (state) {
      state.token = localStorage.getItem('token')
    },
    delToken (state) {
      localStorage.removeItem('token')
      state.token = null
    }
  },
  actions: {

  }
})
