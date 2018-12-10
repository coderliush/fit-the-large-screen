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
      cmboxPercent: {},
      meterboxPercent: {},
      lockPercent: {},
      repairedPercent: {}
    }
  },
  methods:{
    async nodechange(nodedata){
      const param = {id: nodedata, type: 2}
      const cmbox = await this.$http.post('/dmp/api/Cmbox/Count', param)
      const meterbox = await this.$http.post('/dmp/api/Meterbox/Count', param)
      const lock = await this.$http.post('/dmp/api/Lock/Count', param)
      const cmboxRepaired = await this.$http.post('/dmp/api/Cmbox/RepairedCount', param)
      const meterboxRepaired = await this.$http.post('/dmp/api/Meterbox/RepairedCount', param)
      // const lockRepaired = await this.$http.post('/dmp/api/Lock/RepairedCount', param)

      this.computedPercent('cmboxPercent', cmbox)
      this.computedPercent('meterboxPercent', meterbox)
      this.computedPercent('lockPercent', lock)
      this.computedPercent('cmboxRepaired', lock)
      this.computedPercent('meterboxRepaired', lock)

      this.$refs.progress.flush({cmbox, meterbox, lock, cmboxRepaired, meterboxRepaired, cmboxPercent: this.cmboxPercent, meterboxPercent: this.meterboxPercent, lockPercent: this.lockPercent, repairedPercent: this.repairedPercent});
      this.$refs.left.flush({cmbox, meterbox, lock, cmboxPercent: this.cmboxPercent, meterboxPercent: this.meterboxPercent, lockPercent: this.lockPercent});
    },
    computedPercent(type, obj) {
      for (let k in obj) {
        if (type === 'cmboxPercent') { 
          if (obj[k] === 0) {
            this.cmboxPercent[k] = 0
          } else {
            this.cmboxPercent[k] = Number((obj[k] / obj.totalNums*100).toFixed(1)) 
          }
        }
        if (type === 'meterboxPercent') { 
          if (obj[k] === 0) {
            this.meterboxPercent[k] = 0
          } else {
            this.meterboxPercent[k] = Number((obj[k] / obj.totalNums*100).toFixed(1)) 
          }
        }
        if (type === 'lockPercent') { 
          if (obj[k] === 0) {
            this.lockPercent[k] = 0
          } else {
            this.lockPercent[k] = Number((obj[k] / obj.totalNums*100).toFixed(1)) 
          }
        }
        if (type === 'cmboxRepaired') {
          if (obj[repairedNums] === 0) {
            this.repairedPercent[cmboxRepaired] = 0 
          } else {
            this.repairedPercent[cmboxRepaired] = Number((obj[repairedNums] / obj.totalNums*100).toFixed(1)) 
          }
        }
        if (type === 'meterboxRepaired') {
          if (obj[repairedNums] === 0) {
            this.repairedPercent[meterboxRepaired] = 0 
          } else {
            this.repairedPercent[meterboxRepaired] = Number((obj[repairedNums] / obj.totalNums*100).toFixed(1)) 
          }
        }
      }
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






