import * as types from './mutation-types'
console.log('types', types.PREV_DATA)
const mutations = {
  [types.PREV_DATA](state, prevData) {
    state.prevData = prevData
  }
}

export default mutations

