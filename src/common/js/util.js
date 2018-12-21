export function splitNum(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export function computedPercent(list) {
  list.forEach(item => {
    // 如果是数组，计算品牌百分比
    if (Object.prototype.toString.call(item.brands) === '[object Array]') {
      computedBrandPercent(item.brands)
    }
    for (let k in item) {
      if (k !== 'totalNums') {
        // percent范围：0-100，传的值大于总数，或者小于0，赋值阻止报错。
        if (item[k] >= item['totalNums']) {
          item[k + 'percent'] = 100
        } else if (item[k] <= 0) {
          item[k + 'percent'] = 0
        } else {
          item[k + 'percent'] = Number((item[k] / item['totalNums'] * 100).toFixed(1))
        }
      }
    }
  })
  return list
}

function computedBrandPercent(list) {
  let total = list.reduce((prev, next) => {
    return prev + next.nums
  }, 0)
  list.forEach(item => {
    if (item.nums === 0) {
      item.percent = 0
    } else {
      item.percent = Number((item.nums/total*100).toFixed(1))
    }
  })
}
