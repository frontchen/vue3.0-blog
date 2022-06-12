import VueCookie from 'vue-cookie'
import mw from 'mw-vue-components'
import store from '../store'
import config from '../config'
import { storeKey } from '../data'
import account from '../api/account'

const permission = {
  logout() {
    const host = mw.unit.getDomain()
    // store.dispatch('account/refresh', false)
    store.dispatch('account/logout')
    VueCookie.delete('userToken', { domain: host.domain })
    VueCookie.delete('userInfo', { domain: host.domain })
    const loginUrl = config.domainList.find(v => v.id === 0)
    window.location.href = loginUrl.path
  },
  // mes操作屏 登出
  screenLogout() {
    const host = mw.unit.getDomain()
    store.dispatch('screenAccount/logout')
    VueCookie.delete('screenUserToken', { domain: host.domain })
    VueCookie.delete('screenUserInfo', { domain: host.domain })
    const loginUrl = config.domainList.find(v => v.id === 16)
    window.location.href = loginUrl.path + '/screen/login'
  },
  // mes操作屏 检查登录和权限
  checkScreenPermission: to => {
    return new Promise((resolve, reject) => {
      // 路由标记了此页面不需要身份验证的，直接放行
      if (to.meta.auth === false) return resolve()

      const token = VueCookie.get('screenUserToken')
      const info = VueCookie.get('screenUserInfo')

      // token不存在
      if (!token) return reject()

      let userInfo = {}
      try {
        const privateKey = config.secretKey
        userInfo = mw.unit.desDecrypt(info, privateKey)
        userInfo = JSON.parse(userInfo)
      } catch (e) {
        // ...
      }
      // 用户信息不存在
      if (mw.unit.isEmptyObject(userInfo)) return reject()

      const storeUname = store.state.screenAccount.userInfo.uname
      if (storeUname !== userInfo.uname) {
        store.dispatch('screenAccount/userInfo', userInfo)
      }

      return resolve()
    })
  },
  checkPermission: () => {
    return new Promise((resolve, reject) => {
      /**
       * 入口权限过滤
       * 1、检查cookie合法性
       * 2、检查系统权限合法性
       * 3、更新系统编号、用户基本信息store
       * 4、拉取菜单权限，更新权限store
       */
      const token = VueCookie.get('userToken')
      const info = VueCookie.get('userInfo')

      let userInfo = {}
      let login_flg = false
      try {
        const privateKey = config.secretKey
        userInfo = mw.unit.desDecrypt(info, privateKey)
        userInfo = JSON.parse(userInfo)
      } catch (e) {
        // ...
      }
      // token不存在
      if (!token) login_flg = true
      // 用户信息不存在
      if (mw.unit.isEmptyObject(userInfo)) login_flg = true
      // 非正常状态用户
      if (userInfo.companyStatus !== 'examine_pass') login_flg = true
      // 系统列表不存在该系统编号
      const sysIds = userInfo.sysId || []
      // mes
      const supplySurmax = sysIds.find(v => v === 16)
      if (!supplySurmax) {
        login_flg = true
      }
      if (login_flg) {
        return reject()
      }
      const storeUname = store.state.account.userInfo.uname || ''
      if (storeUname !== userInfo.uname) {
        store.dispatch('account/userInfo', userInfo)
      }
      // 权限
      if (userInfo.adminFlag === '0') {
        return resolve()
      }
      // 只在登录时拉取一次权限列表
      // 刷新页面
      const sessionStore = window.sessionStorage.getItem(storeKey.vuexStore)
      if (sessionStore) {
        let vuexStore = JSON.parse(sessionStore)
        if (vuexStore.account.authorities.length) {
          return resolve()
        }
      }
      // 跳转路由
      const auth = store.state.account.authorities
      if (auth.length) {
        return resolve()
      }
      let params = {}

      account.accountManage.getUserAuthorityById(params).then(list => {
        const authorities = permission.getMenuList(list)
        store.dispatch('account/authorities', authorities)
        return resolve()
      }, reject)
    })
  },
  // 重置权限结构【非主账号】
  getMenuList(authList) {
    // 筛选菜单项
    let menuList = authList.filter(v => v.authorityType !== 'POINT')
    // 菜单排序
    menuList.sort((a, b) => {
      return a.sort - b.sort
    })
    // 筛选功能点
    let pointList = authList.filter(v => v.authorityType === 'POINT')
    // 功能点归类到上级菜单节点
    pointList.forEach(v => {
      let index = menuList.findIndex(val => val.authorityId === v.parentId)
      if (index !== -1) {
        let plist = menuList[index].pointList || []
        plist.push(v)
        menuList[index].pointList = plist
      }
    })
    // 重置二级菜单路由
    let authorities = menuList.map(v => {
      if (v.level === 1) {
        let subMenu = menuList.filter(val => val.parentId === v.authorityId)
        if (subMenu.length) {
          v.accessUrl = subMenu[0].accessUrl
        }
      }
      return v
    })
    return authorities
  },
  // 获取页面菜单权限列表
  getSubMenu(vm) {
    let rel = { check: false, list: [] }
    let path = vm.$route.path
    const userInfo = vm.$store.state.account.userInfo
    const authorities = vm.$store.state.account.authorities
    // 是否超级管理员
    if (userInfo.adminFlag === '0') {
      return rel
    }
    rel.check = true
    let menu = authorities.find(
      v => v.accessUrl === path && v.authorityType === 'MID_MENU'
    )
    if (!menu) {
      return rel
    }
    let subMenuList = authorities.filter(
      v => v.parentId === menu.parentId && v.authorityType === 'MID_MENU'
    )
    subMenuList = subMenuList.map(v => {
      return {
        name: v.authorityName,
        path: v.accessUrl,
        id: v.authorityId
      }
    })
    rel.list = subMenuList
    return rel
  },
  // 获取当前页面权限
  getMidmenu(path) {
    const authorities = store.state.account.authorities
    // 获取当前页对应的列表权限
    let authList = authorities.filter(v => v.accessUrl === path)
    if (!authList.length) {
      return {}
    }
    // 获取二级菜单
    let auth = authList[0]
    // 如果存在三级菜单优先读取三级菜单
    if (authList.length > 1) {
      auth = authList.find(v => v.authorityType === 'MID_MENU')
    }
    if (!auth) {
      return {}
    }
    return auth
  },
  // 获取页面按钮权限
  // name: search、add、edit、del、start_stop
  // parentPath === true，默认取父级路由的path
  // parentPath 为字符串类型，则使用指定的parentPath获取权限
  getPointRelPath: (vm, name, parentPath) => {
    let rel = { check: false, rel: '' }
    const userInfo = vm.$store.state.account.userInfo
    const authorities = vm.$store.state.account.authorities
    // 是否超级管理员
    if (userInfo.adminFlag === '0') {
      return rel
    }
    rel.check = true
    // 获取当前页路径
    let path = vm.$route.path
    // 判断 当前页是否指定了获取权限的path
    const matched = vm.$route.matched
    if (parentPath === true) {
      // 取父级路由的path
      matched.length > 1 && (path = matched[matched.length - 2].path)
    } else if (parentPath && typeof parentPath === 'string') {
      // 使用指定的parentPath获取权限
      path = parentPath
    }
    // 获取当前页对应的列表权限
    let authList = authorities.filter(v => v.accessUrl === path)
    if (!authList.length) {
      return rel
    }
    // 获取二级菜单
    let auth = authList[0]
    // 如果存在三级菜单优先读取三级菜单
    if (authList.length > 1) {
      auth = authList.find(v => v.authorityType === 'MID_MENU')
    }

    if (!auth) {
      return rel
    }
    // 获取当前页对应的按钮权限列表
    let pointList = auth.pointList || []
    // 获取当前按钮权限
    let point = pointList.find(v => v.accessUrl === name)
    if (!point) {
      return rel
    }
    // 追加操作权限标识
    rel.rel = point.authorityUrl
    return rel
  }
}

export default permission
