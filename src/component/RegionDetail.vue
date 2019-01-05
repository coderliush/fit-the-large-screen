<template>
  <div class="wrapper">
    <div class="img-wrapper"><img :src="pic" alt=""></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    vpic: {
      default: null,
      type: Array
    },
    vname :{
      default: null,
      type: String
    },
    cpic :{
      default: null,
      type: String
    }
  },
  watch: {
    vpic() {
      this.pic = this.vpic
    },
    cpic() {
      this.pic = this.cpic
    }
  },
  data() {
    return {
      pic: ''
    }
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="stylus">
    .wrapper
      width 885px
      height 750px 
      margin 0 auto
      position relative
      top -2px
      left -6px
      text-align center
      background url('../common/img/mapBg.png') no-repeat
      background-size: 100% 82%
      .img-wrapper
        width 600px
        height 360px
        position relative
        top 123px
        margin 0 auto
        img
          width 100%
          max-height 360px
</style>
