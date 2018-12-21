<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <div class="container">
      <!-- <time-select></time-select> -->
      <progress-bar ref="progress"></progress-bar>
      <div class="layout">
        <left class="left" ref="left"/>
        <right class="right" ref="right" @nodechange="nodechange" />
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
import {computedPercent} from 'common/js/util'

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods:{
    async nodechange(nodedata){
      var httpresults = await this.$http.awaitTasks([
        this.$http.post('dmp/api/Cmbox/Status', nodedata),
        this.$http.post('dmp/api/Meterbox/Status', nodedata),
        this.$http.post('dmp/api/Lock/Status', nodedata),
      ])
      computedPercent(httpresults)
      let data = {
        cmbox: httpresults[0],
        meterbox: httpresults[1],
        lock: httpresults[2]
      }
      this.$refs.right.deviceCount = httpresults[0].onlineNums+ httpresults[1].onlineNums+httpresults[2].onlineNums
      +httpresults[0].offlineNums+ httpresults[1].offlineNums+httpresults[2].offlineNums;
      this.$refs.progress.flush(data)
      this.$refs.left.flush(data)
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
      padding 0 2rem
      .layout
        display flex
        margin-top 20px
        .left, .right
          flex 1
</style>






