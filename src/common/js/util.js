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
        if (item[k] === 0) {
          item[k + 'percent'] = 0
        } else if (item[k] === item['totalNums']) {
          item[k + 'percent'] = 100
        }  else {
          item[k + 'percent'] = (item[k] / item['totalNums'] * 100).toFixed(2)
        }

        item['notInstalledNumspercent'] = (100 - item['onlineNumspercent'] - item['offlineNumspercent']).toFixed(2)
        if (item['notInstalledNumspercent'] === '0.00') {
          item['notInstalledNumspercent'] = 0
        }
      }
    }
  })
  return list
}

function computedBrandPercent(list) {
  let sum = 0
  let total = list.reduce((prev, next) => {
    return prev + next.nums
  }, 0)
  list.forEach((item, index, arr) => {
    if (index !== arr.length -1) {
      if (item.nums === 0) {
        item.percent = 0
      } else if (item.nums === total) {
        item.percent = 100
      } else {
        item.percent = ((item.nums/total * 100).toFixed(2))
      }
      sum += Number(item.percent)
    }
  })
  list[list.length - 1]['percent'] = (100 - sum).toFixed(2)
  if (list[list.length - 1]['percent'] === '0.00') {
    list[list.length - 1]['percent'] = 0
  }
}
