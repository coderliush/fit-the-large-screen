<template>
  <div class="wrapper">
    <el-select v-model="value" placeholder="年">
      <el-option
        v-for="item in year"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value" placeholder="月">
      <el-option
        v-for="item in month"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value" placeholder="周">
      <el-option
        v-for="item in week"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value" placeholder="日">
      <el-option
        v-for="item in day"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data() {
    return {
      value:null,
      year: [{
        value: '2018',
        label: '2018年'
        }, {
        value: '2019',
        label: '2019年'
        }, {
        value: '2020',
        label: '2020年'
      }],
      month: [],
      week: [{
        value: '1',
        label: '第一周'
      },{
        value: '2',
        label: '第二周'
      },{
        value: '3',
        label: '第三周'
      },{
        value: '4',
        label: '第四周'
      }],
      day: [{
        value: '1',
        label: '周一'
      },{
        value: '2',
        label: '周二'
      },{
        value: '3',
        label: '周三'
      },{
        value: '4',
        label: '周四'
      },{
        value: '5',
        label: '周五'
      },{
        value: '6',
        label: '周六'
      },{
        value: '7',
        label: '周日'
      }]
    }
  },
  components: {},
  mounted() {
    for (let i=1; i<13; i++) {
      this.month.push({
        value: i,
        label: `${i}月`
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .wrapper
    margin-bottom 24px
</style>
