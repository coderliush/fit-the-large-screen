<template>
  <div class="wrapper">
    <div v-if="type === 1">
      <div class="img-wrapper"><img :src="vpic" alt=""></div>
    </div>
    <div v-if="type === 2">
      <div :class="cpic ? 'cell-wrapper' : null" class="img-wrapper"><img :src="cpic ? cpic : null" alt=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    vpic: {
      default: '',
      type: Array
    },
    cpic :{
      default: '',
      type: String
    },
    type: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      isCell: false
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
      .cell-wrapper
        background rgba(49, 116, 208, 0.5)
        img 
          opacity .6
</style>

