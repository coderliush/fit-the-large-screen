import * as types from './mutation-types'

const actions = {
  chinaData({commit}, chinaData) {
    commit(types.CHINA_DATA, chinaData)
  },
  prevData({commit}, prevData) {
    commit(types.PREV_DATA, prevData)
  },
  backToChina({commit}, flag) {
    commit(types.BACK_TO_CHINA, flag)
  }
} 

export default actions