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
      cmboxPercent: {},
      meterboxPercent: {},
      lockPercent: {},
      repairedPercent: {}
    }
  },
  methods:{
    async nodechange(nodedata){
      console.log(nodedata);
      var cmboxResults = this.$http.awaitTasks([
        this.$http.post('dmp/api/Cell/Count', nodedata),//网关总数
        this.$http.post('dmp/api/Cmbox/Count', nodedata),//已安装数量
        this.$http.post('dmp/api/Cmbox/CountOffline', nodedata),//离线数量

        this.$http.post('dmp/api/cell/Count', nodedata),//电表总数
        this.$http.post('dmp/api/Meterbox/Count', nodedata),//已安装数量
        this.$http.post('dmp/api/Meterbox/CountOffline', nodedata),//离线数量

        this.$http.post('dmp/api/cell/Count', nodedata),//锁总数
        this.$http.post('dmp/api/lock/Count', nodedata),//已安装数量
        this.$http.post('dmp/api/lock/CountOffline', nodedata),//离线数量

        this.$http.post('dmp/api/cell/Count', nodedata),//电表总数                             ----------------维修-------------
        this.$http.post('dmp/api/lock/Count', nodedata),//已安装数量
        this.$http.post('dmp/api/lock/CountOffline', nodedata),//离线数量
      ])

      console.log('httpresults', httpresults)
      const cmbox = {
        totalCmbox: httpresults[0],                     // 总数
        nosetCmbox: httpresults[0] - httpresults[1],    // 未安装
        offlineCmbox: httpresults[2],                   // 离线
        onlineCmbox: totalCmbox - offlineCmbox          // 在线
      }

      // const meterbox = {
      //   totalMeter: httpresults[3],                    
      //   nosetMeter: httpresults[3] - httpresults[4],  
      //   offlineMeter: httpresults[5],                   
      //   onlineMeter: totalMeter - offlineMeter         
      // }
      const meterbox = {
        totalMeter: 600,
        nosetMeter: 10,
        offlineMeter: 60,
        onlineMeter: 70
      }

      // const lock = {
      //   totalLock: httpresults[6],                    
      //   nosetLock: httpresults[6] - httpresults[7],   
      //   offlineLock: httpresults[8],                   
      //   onlineLock: totalLock - offlineLock            
      // }
      const lock = {
        totalLock: 300,
        nosetLock: 40,
        offlineLock: 30,
        onlineLock: 70
      }
  

      this.$refs.progress.flush({cmbox, meterbox, lock})
      // this.$refs.left.flush({cmbox, meterbox, lock, cmboxRepaired, meterboxRepaired, cmboxPercent: this.cmboxPercent, meterboxPercent: this.meterboxPercent, lockPercent: this.lockPercent, repairedPercent: this.repairedPercent}, param);
    },
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






