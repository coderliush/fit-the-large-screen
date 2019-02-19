<template>
  <div class="wrapper" ref="wrapper">
    <qk-header></qk-header>
    <div class="container">
      <!-- <time-select></time-select> -->
      <progress-bar ref="progress" :update="update"></progress-bar>
      <div class="layout">
        <left class="left" ref="left"/>
        <right class="right" ref="right" @nodechange="nodechange" />
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
import {computedPercent} from 'common/js/util'

export default {
  name: 'app',
  data() {
    return {
      update: false
    }
  },
  mounted(){
    setInterval(()=>{
      if(this.cachenode) this.nodechange(this.cachenode,true);
      },5000);
    // setInterval(()=>{
    //   if(this.cachenode) this.Flush(this.cachenode);
    //   },5000);
    this.getconfig = this.$http.get('dmp/api/Config');
    this.getconfig.then(config=>{
      this.config = config;
    });

    this.setRap();
    // document.body.style.overflowY = 'hidden';
    // document.body.scrollTop(0);
    window.onresize = ()=> {
      this.setRap()
    }
  },
  destroyed(){
    window.onresize=null;
    // document.body.style.overflowY = 'auto';
  },
  methods:{
    setRap(){
      var wrapper = this.$refs.wrapper;
      var rap = document.body.clientWidth / 1903 || 1
      var raph = document.body.clientHeight / 1080 || 1
      wrapper.style.transformOrigin = '0 0'
      wrapper.style.transform = 'scale(' + rap + ',' + raph + ') translateZ(0)'
      wrapper.style.width = '1903px'
      wrapper.style.height = '1080px'
    },
    async nodechange(nodedata,isInterval){
      if(!isInterval) this.cachenode = nodedata;//缓存当前节点
      this.Flush(nodedata,isInterval);
      var httpresults = await this.$http.awaitTasks([
        this.$http.post('dmp/api/Cmbox/Status', nodedata),
        this.$http.post('dmp/api/Meterbox/Status', nodedata),
        this.$http.post('dmp/api/Lock/Status', nodedata),
      ])
      computedPercent(httpresults);
      if(!this.config) await this.getconfig;
      let data = {
        cmbox: httpresults[0],
        meterbox: httpresults[1],
        lock: httpresults[2],
        warnPercent: this.config.warnPercent * 100
      }
      // if(this.cachedata){
      //   if(JSON.stringify(this.cachedata)==JSON.stringify(this.data)) return;
      // }
      this.cachedata = data;
      this.$refs.right.deviceCount = httpresults[0].onlineNums+ httpresults[1].onlineNums+httpresults[2].onlineNums
      +httpresults[0].offlineNums+ httpresults[1].offlineNums+httpresults[2].offlineNums;
      this.$refs.progress.flush(data)
      this.$refs.left.flush(data)
    },
    async Flush(nodedata,isInterval){
      var httpresult = await this.$http.post('dmp/api/Map/TotalCount', nodedata);
      if(this.cachenode!=nodedata) return;//节点改变
      if(this.$refs.right.getNum(0)!=httpresult.lockRecord||this.$refs.right.getNum(1)!=httpresult.chargeCount){
        if(isInterval) this.update = !this.update;
      }
      this.$refs.right.setTabNum(0,httpresult.lockRecord);
      this.$refs.right.setTabNum(1,httpresult.chargeCount);
      // this.$refs.right.mapArr[0].num= httpresult.lockRecord;
      // this.$refs.right.mapArr[1].num= httpresult.chargeCount;
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
      padding 0 20px
      margin-top -20px
      .layout
        display flex
        margin-top 10px
        .left
          width 900px
        .right
          flex 1
</style>






