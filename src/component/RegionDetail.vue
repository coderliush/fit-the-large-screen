<template>
  <div class="wrapper">
    <div class="region" v-show="type === 1">
      <div class="back"><img src="../common/img/icon/back.png" alt=""></div>
      <div class="container">
        <img src="../common/img/header.png" alt="">
        <div>
          <p v-for="(item, index) in mapArr" :key="index">{{index + 1}}.{{item.num}}</p>
        </div>
      </div>
      <p>（上海市徐汇区东航小区南村）</p>
    </div>
    <div class="unit" v-show="type === 2">
      <div class="title">
        <p>南村平面图</p>
        <div class="back"><img src="../common/img/icon/back.png" alt=""></div>
      </div>
      <img src="../common/img/header.png" alt="">
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
      padding 20px
    .region
      .container
        display flex 
        text-align center
        img
          width 400px
          height 400px 
        p 
          margin 10px 0
        div
          flex 1
          text-align center
    .unit
      text-align center
      .title
        p
          text-align center
      > img
          width 400px
          height 400px

    
    .back
      text-align right
      img
        width 24px
        height 24px
        cursor pointer
        border 4px solid #1C3F65
</style>
