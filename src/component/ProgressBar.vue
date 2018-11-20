<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in itemArr" :key="index">
      <p>{{item.name}}</p>
      <div class="bar" v-for="(each, eachIndex) in item.data" :key="eachIndex">
        <p>{{each.name}}</p>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="80" :color="item.color"></el-progress>
        <p class="data">
          <span class="data-already">{{each.already}}</span>
          <span class="data-all font-">/{{each.all}}</span>
        </p>
      </div>
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
      name: '在线设备统计',
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
      name: '在线设备统计',
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
      name: '在线设备统计',
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

<style scoped lang="stylus">
@import '~common/stylus/ui'
@import '~common/stylus/variable'

  .wrapper
    display flex
    color $font-active
    border 1px solid #3E527C
    .item
      flex 1
      padding 2%
      font-size $font-normal
      .bar 
        display flex
        margin 8% 0
        font-size $font-small
        .el-progress
          flex 1
          margin 0 3%
          text-align center
        .data .data-already
          color #469EAF
        

</style>  

