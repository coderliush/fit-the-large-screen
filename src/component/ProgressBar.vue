<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in itemArr" :key="index">
      <p>{{item.name}}</p>
      <div class="bar" v-for="(each, eachIndex) in item.data" :key="eachIndex">
        <p>{{each.name}}</p>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
        <p class="data">
          <span class="data-already color-active">{{each.already}}</span>
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
    },{
      name: '在线设备统计',
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
@import '../common/stylus/variable'

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
        margin 4% 0
        font-size $font-small
        .el-progress
          flex 1
          margin 0 1%
          text-align center
        

</style> 

