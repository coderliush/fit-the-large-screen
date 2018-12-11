<template>
  <div class="wrapper">
    <div class="item" style="margin: .6rem 0">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/wifi.png" alt="">
            <span>【运营管理本部】网关情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">网关总量</span>
          <span class="num">{{cmbox.totalNums}}</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :cmboxPercent="cmboxPercent"></state-cirque>
          <repair-cirque class="item" :cmboxRepairedPercent="repairedPercent.cmboxRepairedPercent"></repair-cirque>
          <brand-cirque class="item" :cmboxBrandPercent="cmboxBrandPercent"></brand-cirque>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item" style="margin: .6rem 0">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/wifi.png" alt="">
            <span>【运营管理本部】智能电表设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">电表总量</span>
          <span class="num">{{meterbox.totalNums}}</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :meterboxPercent="meterboxPercent"></state-cirque>
          <repair-cirque class="item" :meterboxRepairedPercent="repairedPercent.meterboxRepairedPercent"></repair-cirque>
          <brand-cirque class="item" :meterBrandPercent="meterBrandPercent"></brand-cirque>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/wifi.png" alt="">
            <span>【运营管理本部】智能门锁设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">锁总量</span>
          <span class="num">{{lock.totalNums}}</span>
          <span class="font-small">单元门锁/房间锁</span>
          <span class="num">1:10</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :lockPercent="lockPercent"></state-cirque>
          <repair-cirque class="item"></repair-cirque>
          <brand-cirque class="item" :lockBrandPercent="lockBrandPercent"></brand-cirque>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import StateCirque from 'component/StateCirque'
import RepairCirque from 'component/RepairCirque'
import BrandCirque from 'component/BrandCirque'
export default {
  name: '',
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
      repairedPercent: {},


      cmboxBrandPercent: {},
      meterBrandPercent: {},
      lockBrandPercent: {},
    }
  },
  components: {
    StateCirque,
    RepairCirque,
    BrandCirque
  },
  methods: {
    flush({cmbox, meterbox, lock, cmboxRepaired, meterboxRepaired, cmboxPercent, meterboxPercent, lockPercent, repairedPercent}, param) {
      this.cmbox = cmbox
      this.meterbox = meterbox
      this.lock = lock
      this.cmboxRepaired = cmboxRepaired
      this.meterboxRepaired = meterboxRepaired
      this.cmboxPercent = cmboxPercent
      this.meterboxPercent = meterboxPercent
      this.lockPercent = lockPercent
      this.repairedPercent = repairedPercent

      this.init(param)
    },
    async init(param) {
      const results = await this.$http.awaitTasks([
        this.$http.post('/dmp/api/Cmbox/BrandCount', param),
        this.$http.post('/dmp/api/Meterbox/BrandCount', param),
        // this.$http.post('/dmp/api/Lock/BrandCount', param),
      ])
      
      this.computedPercent(results)
    },
    computedPercent(data) {
      let that = this
      data.forEach((item, index) => {
        for (let k in item) {
          if (item[k] === 0) { item[k] === 0 } else { item[k] = Number((item[k] / item.totalNums*100).toFixed(1)) }
        }
        if (index === 0) {
          that.cmboxBrandPercent = item
        } else if (index === 1) {
          that.meterBrandPercent = item
        } else {
          that.lockBrandPercent = item
        }
      })
      console.log('this.cmboxBrandPercent ', this.cmboxBrandPercent )
    }
  },
  mounted() {
    const param = { id: 0, type: 2}
    this.init(param)
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
  .wrapper 
    display flex
    flex-direction column
    margin-right .3rem
    .title
      display flex
      position relative
      left 22px
      .left
        display flex
        margin-right 15px
        p
          display flex
          align-items center
          padding-right .6rem
          color #fff
          background #165AA2
      .right
        display flex
        align-items center
        .font-small
          display inline-block
          margin 0 .2rem
          font-size $font-small
        .num
          position relative 
          top -4px
          font-size 22px
          color $number-active
    .container
      display flex
      justify-content center
      .cirque-wrapper
        flex 1
        display flex
        background url('../common/img/border.png')
        .item
          width 33%
</style>


