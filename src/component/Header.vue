<template>
  <div class="header">
    <div class="title">青客物联网监控面板v1.0.0.0</div>
    <div class="roll">
      <img src="../common/img/icon/notice.png" alt="">
        告警区域：当下XX设备/发生【数量】【状态】/【滚动】</div>
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
  .header
    position relative
    display flex
    justify-content center
    background url('../common/img/header.png') 
    background-size 100% 100%
    padding .3rem
    margin-bottom .8rem
    color $color-active
    overflow hidden
    .title 
      font-size $font-big 
      font-weight bold
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(217, 242, 251, 1)), to(rgba(144, 215, 235, 1)))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
    .roll
      position absolute 
      right 0
      font-size $font-small
      color #BF0F27
      animation rolling 5s linear infinite
  
  @keyframes rolling 
    0% 
      transform translateY(.4rem)
    
    100%
      transform translateY(-.5rem)
  

</style>  


