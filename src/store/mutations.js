import * as types from './mutation-types'
const mutations = {
  [types.PREV_DATA](state, prevData) {
    state.prevData = prevData
  },
  [types.CHINA_DATA](state, chinaData) {
    state.chinaData = chinaData
  },
  [types.BACK_TO_CHINA](state, backToChina) {
    state.backToChina = backToChina
  },
}

export default mutations

