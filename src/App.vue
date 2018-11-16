<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <progress-bar></progress-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import QkHeader from './component/Header'
import ProgressBar from './component/ProgressBar'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    QkHeader,
    ProgressBar
  }
}
</script>

<style scoped lang="stylus">
  .wrapper 
    padding 2% 10%
    background #080F3D
</style>






