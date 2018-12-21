import Vue from 'vue'
Vue.directive('split-num', {
  componentUpdated(el, binding) {
    return el.innerHTML = el.innerHTML.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
})