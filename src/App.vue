<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <div class="container">
      <time-select></time-select>
      <progress-bar ref="progress"></progress-bar>
      <div class="layout">
        <left class="left" ref="left"/>
        <right class="right" @nodechange="nodechange" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import QkHeader from 'component/Header'
import TimeSelect from 'component/TimeSelect'
import ProgressBar from 'component/ProgressBar'
import Left from 'component/Left'
import Right from 'component/Right'

export default {
  name: 'app',
  data() {
    return {
      
    }
  },
  methods:{
    async nodechange(nodedata){
      console.log(nodedata);
      this.$refs.progress.flush();//图表刷新
      this.$refs.left.flush();//图表刷新
    }
  },
  components: {
    TimeSelect,
    QkHeader,
    ProgressBar,
    Left,
    Right,
  }
}
</script>

<style scoped lang="stylus">
    .container
      margin-bottom 100px
      padding 0 2rem
      .layout
        display flex
        margin-top 2%
        .left, .right
          flex 1
</style>






