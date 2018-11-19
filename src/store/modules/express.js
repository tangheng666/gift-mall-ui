import {
  expressFee
} from '@/api/common'

const express = {
  state: {
    express: {}
  },

  mutations: {
    SET_EXPRESS: (state, express) => {
      state.express = express
    }
  },
  actions: {
    // 获取物流价格
    expressFee({
      commit
    }) {
      return new Promise((resolve, reject) => {
        expressFee().then(response => {
          const data = response.data
          if (data.returnCode !== '0000') {
            resolve(data)
          } else {
            const resData = data.data
            commit('SET_EXPRESS', resData)
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default express
