import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import common from './modules/common'
export default createStore({
  getters,
  modules: {
    common,
    app,
    settings
  }
})
