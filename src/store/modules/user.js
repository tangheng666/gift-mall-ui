import {
  getUserInfo,
  loginByUsername,
  logout,
  registerByUsername,
  updateInfo
} from '@/api/user'
import {
  getToken,
  removeToken,
  setToken
} from '@/utils/auth'

const user = {
  state: {
    usrid: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    qq: '',
    wechat: '',
    wealth: 0,
    role: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_USRID: (state, usrid) => {
      state.usrid = usrid
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_QQ: (state, qq) => {
      state.qq = qq
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_WECHAT: (state, wechat) => {
      state.wechat = wechat
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_WEALTH: (state, wealth) => {
      state.wealth = wealth
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          if (data.returnCode !== '0000') {
            resolve(data)
          } else {
            const resData = data.data
            if (resData.usrRole === 'MEMBER') {
              commit('SET_TOKEN', resData.token)
              commit('SET_USRID', resData.usrid)
              commit('SET_ROLE', resData.usrRole)
              setToken(resData.token)
            }
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    RegisterByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        registerByUsername(userInfo.mobile, userInfo.password, userInfo.code, userInfo.qq, userInfo.wechat).then(response => {
          const data = response.data
          if (data.returnCode !== '0000') {
            resolve(data)
          } else {
            commit('SET_TOKEN', data.data.token)
            commit('SET_USRID', data.data.usrid)
            commit('SET_ROLE', data.data.usrRole)
            setToken(data.data.token)
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data.data
          commit('SET_NAME', data.mobile)
          commit('SET_WEALTH', data.wealth)
          commit('SET_QQ', data.qq)
          commit('SET_WECHAT', data.wechat)
          commit('SET_USRID', data.usrid)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    UpdateInfo({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        updateInfo(data.qq, data.wechat, state.token).then((res) => {
          const data = res.data
          if (data.returnCode !== '0000') {
            resolve(data)
          } else {
            commit('SET_QQ', updateInfo.qq)
            commit('SET_WECHAT', updateInfo.wechat)
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLE', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
