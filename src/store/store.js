import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability', 
      'nature', 
      'animal welfare', 
      'housing', 
      'education', 
      'food', 
      'community']
    },
  mutations: {
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    }
  },
  actions: {    
    addCategory({commit, rootState}, category) {
      if (!rootState.categories.includes(category)) {
        commit('ADD_CATEGORY', category)
      }
    }
  }
  })
