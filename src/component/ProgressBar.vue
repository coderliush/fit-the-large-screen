<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in itemArr" :key="index">
      <p>{{item.name}}</p>
      <div class="bar" v-for="(each, eachIndex) in item.data" :key="eachIndex">
        <p>{{each.name}}</p>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
        <p class="data">
          <span class="data-already">{{each.already}}</span>
          <span class="data-all">/{{each.all}}</span>
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
    this.itemArr = [{
      name: '在线设备统计',
      data: [{
        name: '网关',
        already: 200,
        all: 400
      }]
    }]
  }
};
</script>

<style scoped lang="stylus">
  .el-progress-bar__inner 
    text-align center

  .wrapper
    display flex
    .item
      flex 1
      padding 2%
      .bar 
        display flex

</style>

