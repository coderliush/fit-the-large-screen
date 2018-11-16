<template>
  <div class="wrapper">
    <head></head>
    <progress-bar></progress-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import Head from './component/Head'
import ProgressBar from './component/ProgressBar'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    Head,
    ProgressBar
  }
}
</script>

<style scoped lang="stylus">
  .wrapper 
    margin 2% 10%
</style>






