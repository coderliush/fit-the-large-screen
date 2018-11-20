<template>
  <div class="wrapper">
    <qk-header></qk-header>
    <progress-bar></progress-bar>
    <div>
      <left />
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import QkHeader from 'component/Header'
import ProgressBar from 'component/ProgressBar'
import Left from 'component/Left'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    QkHeader,
    ProgressBar,
    Left
  }
}
</script>

<style scoped lang="stylus">
    .wrapper
      margin 2% 10%
</style>






