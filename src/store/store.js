import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    async authorize() {

    }
  }
})