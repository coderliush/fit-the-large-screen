export function computedPercent(obj) {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    return Number((obj[0] / obj[1]*100).toFixed(1))
  }

  let _obj = {}
  for (let k in obj) {
    if (k !== 'total') {
      if (obj[k] === 0) {
        _obj[k + 'Percent'] = 0
      } else {
        _obj[k + 'Percent'] = Number((obj[k] / obj['total']*100).toFixed(1))
      }
    }
  }
  return {...obj, ..._obj}
}