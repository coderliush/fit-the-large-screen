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
          <span class="num">{{cmbox.totalNums|splitNum}}</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :cmbox="cmbox"></state-cirque>
          <repair-cirque class="item" :cmbox="cmbox"></repair-cirque>
          <brand-cirque class="item" v-show="cmboxData" :brand="cmbox.brands"></brand-cirque>
          <p class="item tooltip" v-show="!cmboxData">暂无数据</p>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item" style="margin: 24px 0">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/electric.png" alt="">
            <span>【运营管理本部】智能电表设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">电表总量</span>
          <span class="num">{{meterbox.totalNums|splitNum}}</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :meterbox="meterbox"></state-cirque>
          <repair-cirque class="item" :meterbox="meterbox"></repair-cirque>
          <brand-cirque class="item" v-show="meterboxData" :brand="meterbox.brands"></brand-cirque>
          <p class="item tooltip" v-show="!meterboxData">暂无数据</p>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/lock.png" alt="">
            <span>【运营管理本部】智能门锁设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">锁总量</span>
          <span class="num">{{lock.totalNums|splitNum}}</span>
          <span class="font-small">单元门锁/房间锁</span>
          <span class="num">1:{{lock.scale}}</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :lock="lock"></state-cirque>
          <repair-cirque class="item" :lock="lock"></repair-cirque>
          <brand-cirque class="item" :brand="lock.brands"></brand-cirque>
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
      cmboxData: true,
      meterboxData: true,
      lockData: true,
    }
  },
  filters: {
    splitNum(num) {
      if(num) return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      else return '暂无'
    }
  },
  components: {
    StateCirque,
    RepairCirque,
    BrandCirque
  },
  methods: {
    flush(obj) {
      this.cmbox = obj.cmbox
      this.meterbox = obj.meterbox
      this.lock = obj.lock
      for (let k in obj) {
        if (obj[k].brands.length === 0) {
          this[k + 'Data'] = false
        } else {
          this[k + 'Data'] = true
        }
      }
    },
  },
  mounted() {
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
          width 300px
        .tooltip
          display flex
          align-items center
          justify-content center
</style>


