<template>
  <div class="progress">
    <div class="title">
      <img src="../common/img/title-left.png" alt="">
      <p>设备装填-【全国/运营管理本部】</p>
      <div class="roll">
        <img src="../common/img/icon/notice.png" alt="">
          告警区域：当下XX设备/发生【数量】【状态】/【滚动】
      </div>
      <img src="../common/img/title-right.png" alt="">
    </div>
    <div class="count-group">
      <img src="../common/img/border-left.png" alt="">
        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/online.png" alt="">
            <p>在线设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.onlinenums}}</span>
              <span class="data-all">/{{cmbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.onlinenums}}</span>
              <span class="data-all">/{{meterbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.onlinenums}}</span>
              <span class="data-all">/{{lock.totalnums}}</span>
            </p>
          </div>
        </div>

        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/outline.png" alt="">
            <p>离线设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.offlinenums}}</span>
              <span class="data-all">/{{cmbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.offlinenums}}</span>
              <span class="data-all">/{{meterbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.offlinenums}}</span>
              <span class="data-all">/{{lock.totalnums}}</span>
            </p>
          </div>
        </div>

        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/operation.png" alt="">
            <p>维修设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{cmboxRepaired.repairenums}}</span>
              <span class="data-all">/{{cmboxRepaired.totals}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{meterboxRepaired.repairenums}}</span>
              <span class="data-all">/{{meterboxRepaired.totals}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{lockRepaired.repairenums}}</span>
              <span class="data-all">/{{lockRepaired.totals}}</span>
            </p>
          </div>
        </div>

        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/wheel.png" alt="">
            <p>未安装设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.notinstallednums}}</span>
              <span class="data-all">/{{cmbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.notinstallednums}}</span>
              <span class="data-all">/{{meterbox.totalnums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.notinstallednums}}</span>
              <span class="data-all">/{{lock.totalnums}}</span>
            </p>
          </div>
        </div>
      <img src="../common/img/border-right.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">  
export default {
  name: "progressbar",   
  data() {
    return {
      cmbox: {},
      meterbox: {},
      lock: {},
      cmboxRepaired: {},
      meterboxRepaired: {},
      lockRepaired: {},
    }
  },
  components: {},
  mounted() {
    this.init({id: 0, type: 1})  
  },
  methods: {
    flush() {
      console.log("progress flush")
      // this.init()
    },
    init(param) {
      const cmbox = this.$http.post('/dmp/api/Cmbox/Count', param)
      const meterbox = this.$http.post('/dmp/api/Meterbox/Count', param)
      const lock = this.$http.post('/dmp/api/Lock/Count', param)
      const cmboxRepaired = this.$http.post('/dmp/api/Cmbox/RepairedCount', param)
      const meterboxRepaired = this.$http.post('/dmp/api/Meterbox/RepairedCount', param)
      const lockRepaired = this.$http.post('/dmp/api/Lock/RepairedCount', param)
      this.cmbox = cmbox[0]
      this.meterbox = meterbox[0]
      this.lock = lock[0]
      this.cmboxRepaired = cmboxRepaired[0]
      this.meterboxRepaired = meterboxRepaired[0]
      this.lockRepaired = lockRepaired[0]
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/ui'
@import '~common/stylus/variable'
  @keyframes rolling 
    0% 
      transform translateY(40px)
    100%
      transform translateY(-30px)

  .progress
    position relative
    .title
      position relative
      left 22px
      display flex
      font-size $font-normal
      color #fff
      overflow hidden
      .roll
        position absolute 
        right 0
        font-size $font-small
        color #BF0F27
        animation rolling 5s linear infinite
      p
        height 32px
        line-height 32px
        background #1559A0  
    .count-group
      display flex
      .item
        flex 1
        display flex
        flex-direction column
        padding 34px 0
        font-size $font-normal
        background url('../common/img/border.png')
        .sub
          display flex
          img 
            margin-right 14px
        .bar 
          flex 1
          display flex
          align-items center
          padding-right 20px
          border-right 2px solid #064168
          font-size $font-small
          .label
            width 28px
          .el-progress
            flex 1
            margin 0 15px
          .data .data-already
            color #01FAFE 
      .item:nth-of-type(2)
        padding-left 20px
        padding-right 20px
      .item:nth-of-type(4)
        padding-left 20px
        padding-right 20px
        .bar
          border none
      


</style>  
