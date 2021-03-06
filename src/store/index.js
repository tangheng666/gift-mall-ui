import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import express from './modules/express'
import getters from './geters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    express
  },
  getters
})
