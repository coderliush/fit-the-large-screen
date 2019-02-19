export function splitNum(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export function computedPercent(list) {
  list.forEach((item, index) => {
    // 如果是数组，计算品牌百分比
    if (Object.prototype.toString.call(item.brands) === '[object Array]') {
      computedBrandPercent(item.brands)
    }
    
    if (index !== 2) {
      for (let k in item) {
        if (k !== 'totalNums') {
          if (item[k] === 0) {
            item[k + 'percent'] = 0
          } else if (item[k] === item['totalNums']) {
            item[k + 'percent'] = 100
          } else {
            item[k + 'percent'] = (item[k] / item['totalNums'] * 100).toFixed(2)
            if (item[k + 'percent'] === '100.00') {
              item[k + 'percent'] = '99.99'
            }
          }
        }
      }
    }
    // 锁的维修
    if (list[2].repaireNums === 0) {
      list[2].repaireNumspercent = 0
    } else if (list[2].repaireNums === list[2].totalNums) {
      list[2].repaireNumspercent = 100
    } else {
      list[2].repaireNumspercent = (list[2].repaireNums / list[2].totalNums * 100).toFixed(2)
      if (list[2].repaireNumspercent === '100.00') {
        list[2].repaireNumspercent = '99.99'
      }
    }

    //  index = 2, 锁相关
    // 1.网关在线率等于100，门锁在线率 = 网关在线率；门锁离线率 = 100% - 门锁在线率；门锁在线数量 = 门锁总数；门锁离线数量 = 总数 - 门锁在线数量
    if (list[0].onlineNumspercent === 100) {
      list[2].onlineNumspercent = 100
      list[2].onlineNums = list[2].totalNums
      list[2].offlineNums = 0
      list[2].offlineNumspercent = 0
    } else if (list[0].onlineNums === 0) {                // 2.网关数 = 0；门锁数 = 0，门锁在线率 = 0
      list[2].onlineNums = 0
      list[2].onlineNumspercent = 0
      list[2].offlineNums = list[2].totalNums
      list[2].offlineNumspercent = 100
    } else {                                            // 3. 门锁数量 = 网关数量 * 4。如果大于100%，改成100%，门锁在线数量 = 门锁总数
      list[2].onlineNums = list[0].onlineNums * 4
      if (list[2].onlineNums >= list[2].totalNums) {
        list[2].onlineNums = list[2].totalNums
        list[2].onlineNumspercent = 100
        list[2].offlineNums = 0
        list[2].offlineNumspercent = 0
      } else {
        list[2].onlineNumspercent = (list[2].onlineNums / list[2].totalNums * 100).toFixed(2)
        if (list[2].onlineNumspercent === '100.00') { list[2].onlineNumspercent = '99.99' }
        list[2].offlineNums = list[2].totalNums - list[2].onlineNums
        list[2].offlineNumspercent = (100 - list[2].onlineNumspercent).toFixed(2)
        if (list[2].offlineNumspercent === '100.00') { list[2].offlineNumspercent = '99.99' }
      }
    }
    
    // 未安装
    if (item['notInstalledNums'] === 0) {
      item['notInstalledNumspercent'] = 0
    } else if (item['notInstalledNums'] === item['totalNums']) {
      item['notInstalledNumspercent'] = 100
    } else {
      item['notInstalledNumspercent'] = (100 - item['onlineNumspercent'] - item['offlineNumspercent']).toFixed(2)
      if (item['notInstalledNumspercent'] === '100.00') {
        item['notInstalledNumspercent'] = '99.99'
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
    if (arr.length === 1) {
      item.percent = 100
    } else {
      if (index !== arr.length - 1) {
        if (item.nums === 0) {
          item.percent = 0
        } else {
          item.percent = ((item.nums / total * 100).toFixed(2))
        }
        sum += Number(item.percent)
      }
      list[list.length - 1]['percent'] = (100 - sum).toFixed(2)
      if (list[list.length - 1]['percent'] === '0.00') {
        list[list.length - 1]['percent'] = 0
      }
    }
  })
}
