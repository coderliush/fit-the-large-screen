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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmboxPercent.onlineNums" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.onlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterboxPercent.onlineNums" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.onlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lockPercent.onlineNums" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.onlineNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmboxPercent.offlineNums" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.offlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterboxPercent.offlineNums" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.offlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lockPercent.offlineNums" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.offlineNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="repairedPercent.cmboxRepaired" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{cmboxRepaired.repairedNums}}</span>
              <span class="data-all">/{{cmboxRepaired.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="repairedPercent.meterboxRepaired" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{meterboxRepaired.repairedNums}}</span>
              <span class="data-all">/{{meterboxRepaired.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="30" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{lockRepaired.repairedNums}}</span>
              <span class="data-all">/{{lockRepaired.totalNums}}</span>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmboxPercent.notInstalledNums" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.notInstalledNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterboxPercent.notInstalledNums" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.notInstalledNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lockPercent.notInstalledNums" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.notInstalledNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
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
      lockRepaired: {
        repairedNums: 20,
        totalNums: 40
      },
      cmboxPercent: {},
      meterboxPercent: {},
      lockPercent: {},
      repairedPercent: {}
    }
  },
  components: {},
  mounted() {

  },
  methods: {
    flush({cmbox, meterbox, lock, cmboxRepaired, meterboxRepaired, cmboxPercent, meterboxPercent, lockPercent, repairedPercent}) {
      this.cmbox = cmbox
      console.log('cmbox', cmbox)
      this.meterbox = meterbox
      this.lock = lock
      this.cmboxRepaired = cmboxRepaired
      this.meterboxRepaired = meterboxRepaired
      this.cmboxPercent = cmboxPercent
      this.meterboxPercent = meterboxPercent
      this.lockPercent = lockPercent
      this.repairedPercent = repairedPercent
    },
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
