<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <div class="container">
      <!-- <time-select></time-select> -->
      <progress-bar ref="progress"></progress-bar>
      <div class="layout">
        <left class="left" ref="left"/>
        <right class="right" @nodechange="nodechange" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import QkHeader from 'component/Header'
import TimeSelect from 'component/TimeSelect'
import ProgressBar from 'component/ProgressBar'
import Left from 'component/Left'
import Right from 'component/Right'

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods:{
    async nodechange(nodedata){
      var httpresults = await this.$http.awaitTasks([
        // 网关
        this.$http.post('dmp/api/Cell/Count', nodedata),//总数
        this.$http.post('dmp/api/Cmbox/Count', nodedata),//已安装数量
        this.$http.post('dmp/api/Cmbox/CountOffline', nodedata),//离线数量

        // 电表
        // this.$http.post('dmp/api/cell/Count', nodedata),//总数
        // this.$http.post('dmp/api/Meterbox/Count', nodedata),//已安装数量
        // this.$http.post('dmp/api/Meterbox/CountOffline', nodedata),//离线数量

        // 锁
        // this.$http.post('dmp/api/cell/Count', nodedata),//总数
        // this.$http.post('dmp/api/lock/Count', nodedata),//已安装数量
        // this.$http.post('dmp/api/lock/CountOffline', nodedata),//离线数量

        // 维修
        // this.$http.post('dmp/api/cell/Count', nodedata),//总数                        
        // this.$http.post('dmp/api/lock/Count', nodedata),//已安装数量
        // this.$http.post('dmp/api/lock/CountOffline', nodedata),//离线数量
      ])

      console.log('httpresults', httpresults)
      let cmbox = {
        total: httpresults[0],                     // 总数
        noset: httpresults[0] - httpresults[1],    // 未安装
        offline: httpresults[2],                   // 离线
        online: httpresults[1] - httpresults[2]    // 在线
      }

      // let meterbox = {
      //   total: httpresults[3],                    
      //   noset: httpresults[3] - httpresults[4],  
      //   offline: httpresults[5],                   
      //   online: total - offline         
      // }
      let meterbox = {
        total: 600,
        noset: 10,
        offline: 60,
        online: 70
      }

      // let lock = {
      //   total: httpresults[6],                    
      //   noset: httpresults[6] - httpresults[7],   
      //   offline: httpresults[8],                   
      //   onlin: total - offline            
      // }
      let lock = {
        total: 300,
        noset: 40,
        offline: 30,
        online: 70
      }

      // let repaire = {
      //   total: httpresults[6],                    
      //   noset: httpresults[6] - httpresults[7],   
      //   offline: httpresults[8],                   
      //   online: total - offline  
      // }
      let repaire = {
        total: 800,                    
        noset: 400,   
        offline: 20,                   
        online: 40  
      }
      cmbox = this.computedPercent(cmbox) 
      meterbox = this.computedPercent(meterbox) 
      lock = this.computedPercent(lock) 
      repaire = this.computedPercent(repaire) 
  

      this.$refs.progress.flush({cmbox, meterbox, lock})
      this.$refs.left.flush({cmbox, meterbox, lock})
    },
    computedPercent(obj) {
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
  },
  components: {
    TimeSelect,
    QkHeader,
    ProgressBar,
    Left,
    Right,
  }
}
</script>

<style scoped lang="stylus">
    .container
      margin-bottom 100px
      padding 0 2rem
      .layout
        display flex
        margin-top 2%
        .left, .right
          flex 1
</style>






