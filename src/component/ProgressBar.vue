<template>
  <div class="progress">
    <div class="title">
      <p>设备装填-【全国/运营管理本部】</p>
      <div class="roll">
        <img src="../common/img/icon/notice.png" alt="">
          告警区域：当下XX设备/发生【数量】【状态】/【滚动】
      </div>
    </div>
    <div class="item-group">
      <img src="../common/img/border-left.png" alt="">
      <div class="item-wrapper">
        <div class="item" v-for="(item, index) in itemArr" :key="index">
          <div class="sub">
            <img :src="item.url" alt="">
            <p>{{item.name}}</p>
          </div>
          <div :class="index !== 3 ? 'border-right' : null" class="bar" v-for="(each, eachIndex) in item.data" :key="eachIndex">
            <p>{{each.name}}</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="50" :color="item.color"></el-progress>
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
      url: require('common/img/icon/online.png'),
      color: '#79C171',
      data: [{
        name: '网关',
        already: 200,
        all: 400,
      },{
        name: '网关',
        already: 200,
        all: 400,
        color: '#FB62B5'
      },{
        name: '网关',
        already: 200,
        all: 400,
        color: '#FEAA03'
      }]
    },
    {
      name: '离线设备统计',
      url: require('common/img/icon/outline.png'),
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
      url: require('common/img/icon/operation.png'),
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
      url: require('common/img/icon/wheel.png'),
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
      transform translateY(40px)
    100%
      transform translateY(-30px)

  .item-wrapper > .item
    padding 20px 0
    color #92D5FF
    .sub
      display flex
      align-items center
      font-weight bold
      img 
        width 24px
        height 24px
        margin-right 15px

  .progress
    position relative
    .title
      position relative
      left .34rem
      display flex
      font-size $font-normal
      color #fff
      overflow hidden
      .roll
        position absolute 
        right 0
        font-size $font-small
        color #BF0F27
        animation rolling 5s linear infinite
      p
        height 32px
        line-height 32px
        background #1559A0  
    .item-group
      display flex
      .item-wrapper
        flex 1
        display flex
        background url('../common/img/border.png')
        .item
          flex 1
          display flex
          flex-direction column
          font-size $font-normal
          .border-right
            padding 0 .6rem
            border-right 1px solid #055B7D
          .bar 
            flex 1
            display flex
            align-items center
            font-size $font-small
            .el-progress
              flex 1
              margin 0 15px
            .data .data-already
              color #01FAFE
        .item:nth-child(1)
          .border-right
            padding-left 0     
        .item:nth-child(2), .item:nth-child(3)
          .sub
            padding-left .6rem
        .item:nth-child(4)
          padding-left .6rem
            


</style>  

