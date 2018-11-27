<template>
  <div class="progress">
    <div class="roll">
      <img src="../common/img/icon/notice.png" alt="">
        告警区域：当下XX设备/发生【数量】【状态】/【滚动】
    </div>
    <div class="title">
      <img src="../common/img/title-left.png" alt="">
      <p>
        <img src="../common/img/icon/bulb.png" alt="">
        <span>设备装填-【全国/运营管理本部】</span>
      </p>
      <img src="../common/img/title-right.png" alt="">
    </div>
    <div class="item-group">
      <img src="../common/img/border-left.png" alt="">
      <div class="bar-wrapper">
        <div class="item" v-for="(item, index) in itemArr" :key="index">
          <div class="sub">
            <img :src="item.url" alt="">
            <p>{{item.name}}</p>
          </div>
          <div :class="index !== 3 ? 'border-right' : null" class="bar" v-for="(each, eachIndex) in item.data" :key="eachIndex">
            <p>{{each.name}}</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="80" :color="item.color"></el-progress>
            <p class="data">
              <span class="data-already">{{each.already}}</span>
              <span class="data-all">/{{each.all}}</span>
            </p>
          </div>
        </div>
      </div>
      <img src="../common/img/border-right.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">  
export default {
  name: "progressbar",   
  data() {
    return {
      itemArr: [], 
    };
  },
  components: {},
  mounted() {
    this.itemArr = [
      {
      name: '在线设备统计',
      url: '../common/img/icon/inline.png',
      color: '#79C171',
      data: [{
        name: '网关',
        already: 200,
        all: 400,
      },{
        name: '网关',
        url: '../common/img/icon/outline.png',
        already: 200,
        all: 400,
        color: '#FB62B5'
      },{
        name: '网关',
        url: '../common/img/icon/operation.png',
        already: 200,
        all: 400,
        color: '#FEAA03'
      }]
    },
    {
      name: '离线设备统计',
      url: '../common/img/icon/wheel.png',
      color: '#FB62B5',
      data: [{
        name: '网关',
        already: 200,
        all: 400,
      },{
        name: '网关',
        already: 200,
        all: 400
      },{
        name: '网关',
        already: 200,
        all: 400
      }]
    },{
      name: '维修设备统计',
      color: '#FDAC07',
      data: [{
        name: '网关',
        already: 200,
        all: 400
      },{
        name: '网关',
        already: 200,
        all: 400
      },{
        name: '网关',
        already: 200,
        all: 400
      }]
    },
    {
      name: '未安装设备统计',
      color: '#18ADF5',
      data: [{
        name: '网关',
        already: 200,
        all: 400
      },{
        name: '网关',
        already: 200,
        all: 400
      },{
        name: '网关',
        already: 200,
        all: 400
      }]
    }
    ]
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/ui'
@import '~common/stylus/variable'
  @keyframes rolling 
    0% 
      transform translateY(.4rem)
    100%
      transform translateY(-.5rem)

  .border-right
    border-right 1px solid #055B7D

  .progress
    position relative
    overflow hidden
    .roll
      position absolute 
      right 0
      font-size $font-small
      color #BF0F27
      animation rolling 5s linear infinite
    .title
      position relative
      left .34rem
      display flex
      font-size $font-normal
      color #fff
      p
        background #165AA2
    .item-group
      display flex
      .bar-wrapper
        flex 1
        display flex
        background url('../common/img/border.png')
        .item
          flex 1
          font-size $font-normal
          .bar 
            display flex
            align-items center
            font-size $font-small
            .el-progress
              flex 1
            .data .data-already
              color #469EAF
        

</style>  

