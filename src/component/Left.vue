<template>
  <div class="wrapper">
    <div class="row">
      <p>【全国】智能网关设备情况</p>
      <div>网关总量123,456,789</div>
      <div>维修问题456,789</div>
    </div>
    <div class="pic">
      <cirque class="item" :type="1"></cirque>
      <cirque class="item" :type="2"></cirque>
      <cirque class="item" :type="3"></cirque>
    </div>
  </div>

  
</template>

<script type="text/ecmascript-6">
import Cirque from 'component/Cirque'
export default {
  name: '',
  data() {
    return {}
  },
  components: {
    Cirque
  }
}
</script>

<style scoped lang="stylus">
  .wrapper 
    display flex
    flex-direction column
    .row
      display flex
    .pic
      display flex
      justify-content center
      border 1px solid #39497B
      .item
        width 33%
        height 30vh
</style>


