<template>
  <div>
    <div class="title">
      <p>2018年11月28日</p>
      <p>门禁数据 峰值：19:00 - 45</p>
    </div>
    <div id="main" style="width: 600px;height:400px;">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var chart = echarts.init(document.getElementById('main'))
      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
              normal: {
                color: "green",
                width: 4
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "yellow",
                color: "blue"
              }
            }
          }
        ]
      }
      chart.setOption(option)
    }
  }
};
</script>

<style scoped lang="stylus">
</style>
