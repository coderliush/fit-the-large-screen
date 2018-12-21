<template>
  <div class="progress">
    <div class="title">
      <img src="../common/img/title-left.png" alt="">
      <p>
        <img src="../common/img/icon/bulb.png" alt="">
        设备装填-【全国/运营管理本部】</p>
      <marquee direction=up Height=40 Loop=-1 Scrollamount=1 class="roll-wrapper">
        <div class="roll" v-for="(item, index) in warn" :key="index">
          <img src="../common/img/icon/notice.png" alt="">
          <span>{{item}}</span>
        </div >
      </marquee>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.onlineNumspercent" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.onlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.onlineNumspercent" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.onlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.onlineNumspercent" color="#80C268"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.onlineNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
            </p>
          </div>
        </div>

        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/outline.png" alt="">
            <p class="font-weight">离线设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.offlineNumspercent" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.offlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.offlineNumspercent" color="#FF65B9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.offlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.offlineNumspercent" color="#FF65B9"></el-progress>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.repaireNumspercent" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.repaireNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.repaireNumspercent" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.repaireNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.repaireNumspercent" color="#FDAE0B"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.repaireNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.notInstalledNumspercent" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.notInstalledNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.notInstalledNumspercent" color="#20A9F9"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.notInstalledNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.notInstalledNumspercent" color="#20A9F9"></el-progress>
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
      warn: {},
    }
  },
  components: {},
  async mounted() {
    this.warn = await this.$http.post('dmp/api/CurrentWarning/GetList')
  },
  methods: {
    flush({cmbox, meterbox, lock}) {
      this.cmbox = cmbox
      this.meterbox = meterbox
      this.lock = lock
    },
  },
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
    color $color-active
    .title
      position relative
      left 22px
      display flex
      font-size $font-normal
      color #fff
      overflow hidden
      .roll-wrapper
        position absolute 
        right 22px
        .roll
          display flex
          justify-content flex-end
          font-size $font-small
          color #BF0F27
          margin 30px 0
          img 
            margin-right 4px
      p
        display flex
        align-items center
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
          align-items center
          img 
            margin-right 14px
          p
            font-weight bold
        .bar 
          flex 1
          display flex
          align-items center
          border-right 2px solid #064168
          font-size $font-small
          p:nth-of-type(2)
            min-width 100px
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
