import Vue from 'vue'
import Vuex from 'vuex'

import GreenStore from './modules/green-invoice'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default new Vuex.Store({
  modules: {
    GreenStore
  }
})
