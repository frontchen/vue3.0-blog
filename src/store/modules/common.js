import { storeKey } from '/@/data/index'

// initial state
const state = {
  currentRefresh: true, // 页面是否刷新
  sysId: 1, // 系统编号
  authorities: [], // 权限列表
}

const getters = {
  mainMenu() {
    return JSON.parse(sessionStorage.getItem(storeKey.menuList))
  },
  userInfo:state=>state.userInfo
}

const actions = {
  logout({ commit }) {
    commit({ type: 'logout' })
    commit({ type: 'clearAllData' }, { root: true })
  },
  authorities({ commit }, data) {
    commit('authorities', data)
  },
  userInfo({ commit }, data) {
    console.log(['setUserInfo',data])
    commit('setUserInfo', data)
  },
  userInfoUpdate({ commit, state }, cname) {
    let userInfo = JSON.parse(JSON.stringify(state.userInfo))
    userInfo.cname = cname
    commit('setUserInfo', userInfo)
  },
  // 修改页面状态
  refresh({ commit }, data) {
    commit('refresh', data)
  },
  setInitialize({ commit }, data) {
    commit('initialize', data)
  }
}

const mutations = {
  logout: state => {
    state.authorities = []
    state.userInfo = {}
  },
  authorities: (state, data) => {
    state.authorities = data
  },

  setUserInfo(state, data) {
    state.userInfo = data
  },
  refresh(state, data) {
    state.currentRefresh = data
  },

  mainMenu(state, data) {
    // 主菜单数据
    // 嵌套对象和属性较多，暂时不需要响应式，不用存到vuex，节约资源开销
    sessionStorage.setItem(storeKey.menuList, JSON.stringify(data))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
