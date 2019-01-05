<template>
  <div class="wrapper">
    <div class="item">
      <div class="title">
        <div class="left">
          <p>
            <img src="../common/img/icon/wifi.png" alt="">
            <span>【运营管理本部】网关情况</span>
          </p>
        </div>
        <div class="right">
          <span class="font-small">网关总量</span>
          <span class="num">{{cmbox.totalNums|splitNum}}</span>
          <span class="font-small ml-20">实际维修</span>
          <span class="num">{{cmbox.repaireNums}}</span>
        </div>
      </div>
      <div class="container">
        <img class="border" src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :cmbox="cmbox"></state-cirque>
          <repair-cirque class="item" :cmbox="cmbox"></repair-cirque>
          <brand-cirque class="item" :brand="cmbox.brands"></brand-cirque>
        </div>
        <img class="border" src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item" style="margin: 20px 0">
      <div class="title">
        <div class="left">
          <p>
            <img src="../common/img/icon/electric.png" alt="">
            <span>【运营管理本部】智能电表设备情况</span>
          </p>
        </div>
        <div class="right">
          <span class="font-small">电表总量</span>
          <span class="num">{{meterbox.totalNums|splitNum}}</span>
          <span class="font-small ml-20">实际维修</span>
          <span class="num">{{meterbox.repaireNums}}</span>
        </div>
      </div>
      <div class="container">
        <img class="border" src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :meterbox="meterbox"></state-cirque>
          <repair-cirque  class="item" :meterbox="meterbox"></repair-cirque>
          <brand-cirque class="item" :brand="meterbox.brands"></brand-cirque>
        </div>
        <img class="border" src="../common/img/border-right.png" alt="">
      </div>
    </div>

    <div class="item">
      <div class="title">
        <div class="left">
          <p>
            <img src="../common/img/icon/lock.png" alt="">
            <span>【运营管理本部】智能门锁设备情况</span>
          </p>
        </div>
        <div class="right">
          <span class="font-small">锁总量</span>
          <span class="num">{{lock.totalNums|splitNum}}</span>
          <span class="font-small ml-20">实际维修</span>
          <span class="num">{{lock.repaireNums}}</span>
        </div>
      </div>
      <div class="container">
        <img class="border" src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <state-cirque class="item" :lock="lock"></state-cirque>
          <repair-cirque class="item" :lock="lock"></repair-cirque>
          <brand-cirque class="item" :brand="lock.brands"></brand-cirque>
        </div>
        <img class="border" src="../common/img/border-right.png" alt="">
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
    }
  },
  filters: {
    splitNum(num) {
      if(num) return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      else return '暂无'
    },
    fixTwo(num) {
      if(num) return num.toFixed(1);
    }
  },
  components: {
    StateCirque,
    RepairCirque,
    BrandCirque,
  },
  methods: {
    flush(obj) {
      this.cmbox = obj.cmbox
      this.meterbox = obj.meterbox
      this.lock = obj.lock
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
      position relative
      display flex
      margin-left 24px
      line-height 32px
      background url('../common/img/title-border.png') no-repeat
      .left
        display flex
        p
          display flex
          align-items center
          padding-right .6rem
          margin-left 36px
          color #fff
      .right
        position absolute
        left 440px
        display flex
        align-items center
        .font-small
          display inline-block
          margin 0 .2rem
          font-size $font-small
        .ml-20
          margin-left 20px
        .num
          font-size 22px
          color $number-active
    .container
      display flex
      justify-content center
      .border 
        height 215px
      .cirque-wrapper
        flex 1
        display flex
        border-top 1px solid #3C8AB6
        border-bottom 1px solid #3C8AB6
        .item
          width 33%
        .tooltip
          display flex
          align-items center
          justify-content center
</style>


