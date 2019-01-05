<template>
  <div class="progress">
    <div class="title">
      <p>
        <img src="../common/img/icon/bulb.png" alt="">
        【运营管理本部】设备状态</p>
      <marquee direction=up Height=40 Loop=-1 Scrollamount=1 class="roll-wrapper">
        <div class="roll" v-for="(item, index) in warnList" :key="index">
          <div v-for="(each, key) in item" :key="key"> 
            <div class="each" v-for="(value, type) in each" :key="type">
              <img src="../common/img/icon/notice.png" alt="">
              当下{{key}}/发生【{{value}}】【{{type}}】
            </div>
          </div>
        </div >
      </marquee>
    </div>
    <div class="count-group">
      <img class="border-img" src="../common/img/border-left.png" alt="">
        <div class="item">
          <div class="sub">
            <img src="../common/img/icon/online.png" alt="">
            <p>在线设备统计</p>
          </div>
          <div class="bar">
            <p>网关</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.onlineNumspercent" color="#80c269"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.onlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.onlineNumspercent" color="#80c269"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.onlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.onlineNumspercent" color="#80c269"></el-progress>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.offlineNumspercent" color="#E55EAB"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.offlineNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.offlineNumspercent" color="#E55EAB"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.offlineNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.offlineNumspercent" color="#E55EAB"></el-progress>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="cmbox.notInstalledNumspercent" color="#21a9fa"></el-progress>
            <p class="data">
              <span class="data-already">{{cmbox.notInstalledNums}}</span>
              <span class="data-all">/{{cmbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p>电表</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="meterbox.notInstalledNumspercent" color="#21a9fa"></el-progress>
            <p class="data">
              <span class="data-already">{{meterbox.notInstalledNums}}</span>
              <span class="data-all">/{{meterbox.totalNums}}</span>
            </p>
          </div>
          <div class="bar">
            <p class="label">锁</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="lock.notInstalledNumspercent" color="#21a9fa"></el-progress>
            <p class="data">
              <span class="data-already">{{lock.notInstalledNums}}</span>
              <span class="data-all">/{{lock.totalNums}}</span>
            </p>
          </div>
        </div>
      <img class="border-img" src="../common/img/border-right.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">  
import elProgress from 'component/elProgress'
export default {
  name: "progressbar",   
  data() {
    return {
      cmbox: {},
      meterbox: {},
      lock: {},
      warnList: [],
    }
  },
  components: {
    elProgress
  },
  async mounted() {
    this.warn = await this.$http.post('dmp/api/CurrentWarning/GetList')
  },
  methods: {
    flush({cmbox, meterbox, lock, warnPercent}) {
      let obj = {cmbox, meterbox, lock}
      this.cmbox = obj.cmbox
      this.meterbox = obj.meterbox
      this.lock = obj.lock

      const map = {
        cmbox: '智能网关',
        meterbox: '智能电表',
        lock: '智能锁'
      }

      this.warnList.length = 0
      for (let k in obj) {
        const type = {}
        if (obj[k].onlineNumspercent > warnPercent) {
          type['在线'] = obj[k]['onlineNums']
        }
        if (obj[k].offlineNumspercent > warnPercent) {
          type['离线'] = obj[k]['offlineNums']
        } 
        if (obj[k].repaireNumspercent > warnPercent) {
          type['维修'] = obj[k]['repaireNums']
        }
        if (obj[k].notInstalledNumspercent > warnPercent) {
          type['未安装'] = obj[k]['notInstalledNums']
        }

        this.warnList.push({[map[k]]: type})
      }
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
    .text
      position absolute
      top -21px
      left 53px
      font-size 15px
    .title
      position relative
      left 19px
      display flex
      font-size $font-normal
      color #fff
      overflow hidden
      background url('../common/img/title-border.png') no-repeat
      .roll-wrapper
        position absolute 
        right 22px
        .roll .each
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
        margin-left 36px
    .count-group
      display flex
      .border-img
        height 180px
      .item
        flex 1
        display flex
        flex-direction column
        padding 18px 0
        font-size $font-normal
        border-top 1px solid #3C8AB6
        border-bottom 1px solid #3C8AB6
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
            padding-right 20px
            text-align right
          .label
            width 32px
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
