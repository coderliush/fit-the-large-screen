<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <div class="container">
      <progress-bar></progress-bar>
      <div class="layout">
        <left class="left" />
        <right class="right" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import QkHeader from 'component/Header'
import ProgressBar from 'component/ProgressBar'
import Left from 'component/Left'
import Right from 'component/Right'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    QkHeader,
    ProgressBar,
    Left,
    Right
  }
}
</script>

<style scoped lang="stylus">
    .container
      padding 0 2rem
      .layout
        display flex
        margin-top 2%
        .left, .right
          flex 1
</style>






