<template>
  <div ref="cirque"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    cmbox: {
      type: Object
    },
    meterbox: {
      type: Object
    },
    lock: {
      type: Object
    },
  },
  data() {
    return {}
  },
  watch: {
    cmbox() {
      this.init(this.cmbox)
    },
    meterbox() {
      this.init(this.meterbox)
    },
    lock() {
      this.init(this.lock)
    },
  },
  components: {},
  mounted() {
  
  },
  methods: {
    init(obj) {
      // 引入echarts
      const echarts = require("echarts")
      const chart = echarts.init(this.$refs.cirque)
      var color = ["#FFB10C", "#335B96"]
      var data = [
        {
          name: "维修率",
          value: obj.repaireNumspercent,
        },
        {
          name: '未维修率',
          value: 100 - obj.repaireNumspercent,
          tooltip: {
            show: false,
            formatter: ''
          }
        }
      ];

      // 指定图表的配置项和数据
      var option = {
        // 图例
        legend: [
          {
            selectedMode: true, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
            top: "10%",
            left: "center",
            textStyle: {
              // 图例的公用文本样式。
              fontSize: 14,
              color: "#fff"
            },
            data: ["1", "2", "3", "4"]
          }
        ],
        // 提示框
        tooltip: {
          show: true, // 是否显示提示框
          formatter: "维修率：{c}%" // 提示框显示内容,此处{b}表示各数据项名称，此项配置为默认显示项，{c}表示数据项的值，默认不显示，({d}%)表示数据项项占比，默认不显示。
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                // image: require("../common/img/icon/bulb.png"),
                width: 20,
                height: 20
              },
              left: "center",
              top: "center"
            },
            {
              type: "text",
              style: {
                text: "",
                width: 20,
                height: 20
              },
              left: "center",
              top: "center"
            }
          ]
        },

        // graphic 是原生图形元素组件。可以支持的图形元素包括：image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: require("../common/img/icon/repair.png"),
                width: 60,
                height: 50
              },
              left: "center",
              top: "center"
            },
            {
              type: "text",
              style: {
                text: "",
                width: 20,
                height: 20
              },
              left: "center",
              top: "center"
            }
          ]
        },

        // 系列列表
        series: [
          {
            name: "圆环图系列名称", // 系列名称
            type: "pie", // 系列类型
            center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
            radius: ["40%", "60%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
            color: color, // 圆环图的颜色
            label: {
              // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
              normal: {
                fontSize: 16,
                show: true, // 是否显示标签[ default: false ]
                position: "outside", // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                formatter: function (obj) {
                  if (obj.value > 30 && obj.value < 70) {
                    return `${obj.name}:\n${obj.value}%`
                  }
                  return  `${obj.name}:${obj.value}%`
                }
              }
            },
            labelLine: {
              // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
              normal: {
                show: true, // 是否显示视觉引导线。
                length: 6, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
                length2: 6, // 视觉引导项第二段的长度。
                lineStyle: {
                  // 视觉引导线的样式
                  //color: '#000',
                  //width: 1
                }
              }
            },
            data: data // 系列中的数据内容数组。
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表
      chart.setOption(option);
    }
  }
};
</script>

<style scoped lang="stylus">
</style>   

