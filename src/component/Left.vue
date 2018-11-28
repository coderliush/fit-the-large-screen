<template>
  <div class="wrapper">
    <div class="item">
      <div class="title">
        <div class="left">
          <img src="../common/img/title-left.png" alt="">
          <p>
            <img src="../common/img/icon/wifi.png" alt="">
            <span>【全国】网关情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">网关总量</span>
          <span class="font-color">123,456,789</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <cirque class="item" :type="1"></cirque>
          <cirque class="item" :type="2"></cirque>
          <cirque class="item" :type="3"></cirque>
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
            <span>【全国】智能电表设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">网关总量</span>
          <span class="font-color">123,456,789</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <cirque class="item" :type="4"></cirque>
          <cirque class="item" :type="5"></cirque>
          <cirque class="item" :type="6"></cirque>
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
            <span>【全国】智能门锁设备情况</span>
          </p>
          <img src="../common/img/title-right.png" alt="">
        </div>
        <div class="right">
          <span class="font-small">网关总量</span>
          <span class="font-color">123,456,789</span>
        </div>
      </div>
      <div class="container">
        <img src="../common/img/border-left.png" alt="">
        <div class="cirque-wrapper">
          <cirque class="item" :type="7"></cirque>
          <cirque class="item" :type="8"></cirque>
          <cirque class="item" :type="9"></cirque>
        </div>
        <img src="../common/img/border-right.png" alt="">
      </div>
    </div>

    
  </div>

</template>

<script type="text/ecmascript-6">
import Cirque from 'component/Cirque'
export default {
  name: '',
  data() {
    return {}
  },
  components: {
    Cirque
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
      left .34rem
      .left
        display flex
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
        .font-color
          color $color-active
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


