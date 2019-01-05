<template>
  <div class="header">
    <div class="title">青客物联网监控面板</div>
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
    padding 28px
    color $color-active
    letter-spacing 2px
    .title 
      position relative
      top -10px
      font-size $font-big 
      font-weight bold
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(217, 242, 251, 1)), to(rgba(144, 215, 235, 1)))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent

</style>  
