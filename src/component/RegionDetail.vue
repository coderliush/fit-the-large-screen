<template>
  <div class="wrapper">
    <div v-if="type === 1">
      <div class="img-wrapper"><img :src="propVpic" alt=""></div>
    </div>
    <div v-if="type === 2">
      <div :class="propCpic ? 'cell-wrapper' : null" class="img-wrapper"><img :src="propCpic ? propCpic : null" alt=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    vpic: {
      default: '',
      type: String
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
  watch: {
    vpic() {
      this.propVpic = this.vpic
    },
    cpic() {
      this.propCpic = this.cpic
    },
    type() {
      if (this.type === 1) {
        this.propCpic = ''
      } else {
        this.propVpic = ''
      }
    },
  },
  data() {
    return {
      propVpic: '',
      propCpic: '',
    }
  },
  components: {},
  mounted() { 

  },
}
</script>

<style scoped lang="stylus">
    .wrapper
      width 877px
      height 750px 
      margin 0 auto
      position relative
      top -2px
      left -1px
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

