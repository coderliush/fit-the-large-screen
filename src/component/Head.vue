<template>
  <div class="wrapper">
    <div class="title">青客物联网监控面板V1.0.0</div>
    <div class="roll">警告，区域设备</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Roll',
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="stylus">
@import '../common/stylus/variable'
  .wrapper
    display flex
    color $color-active
    .title
      margin 0 auto
      font-size $font-big
    .roll
      color #BF0F27
      animation rolling 5s linear infinite
  
  @keyframes rolling 
    0% 
      transform translateY(-20px)
    
    100%
      transform translateY(20px)
  

</style>  


