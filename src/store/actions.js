import * as types from './mutation-types'

const actions = {
  prevData({commit}, prevData) {
    commit(types.PREV_DATA, prevData)
  }
} 

export default actions