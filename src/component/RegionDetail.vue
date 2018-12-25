<template>
  <div class="wrapper">
    <div class="region" v-show="type === 1">
      <div class="img-carousel">
        <el-carousel :interval="4000" indicator-position="none" :height="'520px'" :arrow="'never'">
          <el-carousel-item v-for="pic in vpics" :key="pic">
            <img :src="pic" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="unit" v-show="type === 2">
      <div class="img-wrapper"><img :src="cpic" alt=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    type: {
      default: 1,
      type: Number
    },
    vpics: {
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
  data() {
    return {
      mapArr: [
        {
          url: require("common/img/icon/mark1.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark2.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark3.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark4.png"),
          num: "132.456.79"
        }
      ],
    }
  },
  components: {},
  mounted() {
    
  },
}
</script>

<style scoped lang="stylus">
    .wrapper
      padding 50px
    .region
      .img-carousel
        display flex 
        text-align center
        img
          height 520px!important
        div
          flex 1
    .unit
      text-align center
      .title
        margin-bottom 20px
        p
          text-align center
      .img-wrapper
        background rgba(8,15,61, 0.5)
        img 
          position relative
          opacity .6
    
    .back
      text-align right
      img
        width 24px
        height 24px
        cursor pointer
        border 4px solid #1C3F65
</style>
