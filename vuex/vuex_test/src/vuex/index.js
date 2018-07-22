import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'product'

export default new Vuex.Store({
  getters,
  actions,
  state,
  mutations,
  stric: debug,
  plugins: debug ? [createLogger()] : []
})