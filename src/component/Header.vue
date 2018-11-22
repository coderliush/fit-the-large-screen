<template>
  <div class="wrapper">
    <div class="title">青客物联网监控面板v1.0.0.0</div>
    <div class="roll-wrapper">
      <div class="roll">
        <img src="../common/img/icon/notice.png" alt="">
        告警区域：当下XX设备/发生【数量】【状态】/【滚动】</div>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'QKheader',
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="stylus">
@import '../common/stylus/variable'
  .wrapper
    position relative
    display flex
    justify-content center
    height 1rem
    line-height 1rem
    color $color-active
    overflow hidden
    .title 
      font-size $font-big
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 128, 0, 1)), to(rgba(51, 51, 51, 1)))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
    .roll-wrapper
      padding 0.32rem
      .roll
        position absolute 
        right 0
        font-size $font-small
        color #BF0F27
        animation rolling 5s linear infinite
  
  @keyframes rolling 
    0% 
      transform translateY(.6rem)
    
    100%
      transform translateY(-.6rem)
  

</style>  


