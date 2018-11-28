<template>
  <div class="map">
    <div class="title">
      <div class="part1">
        <img src="../common/img/map-bg.png" alt="">
        <p>运营</p>
        <img src="../common/img/map-bg.png" alt="">
      </div>
      <div class="part2">
        <img src="../common/img/title-left.png" alt="">
        <p>行政区切换</p>
        <img src="../common/img/title-right.png" alt="">
      </div>
    </div>

    <div class="main">
      <img src="../common/img/map-left.png" alt="">
      <div id="map" style="width: 100%;"></div>
      <img src="../common/img/map-right.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"
import cityMap from '../../public/js/citymap.js'
export default {
  name: "",
  data() {
    return {}
  },
  components: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const echarts = require("echarts")
      //地图容器
      var chart = echarts.init(document.getElementById("map"))
      //34个省、市、自治区的名字拼音映射数组
      var provinces = {
        //23个省
        台湾: "taiwan",
        河北: "hebei",
        山西: "shanxi",
        辽宁: "liaoning",
        吉林: "jilin",
        黑龙江: "heilongjiang",
        江苏: "jiangsu",
        浙江: "zhejiang",
        安徽: "anhui",
        福建: "fujian",
        江西: "jiangxi",
        山东: "shandong",
        河南: "henan",
        湖北: "hubei",
        湖南: "hunan",
        广东: "guangdong",
        海南: "hainan",
        四川: "sichuan",
        贵州: "guizhou",
        云南: "yunnan",
        陕西: "shanxi1",
        甘肃: "gansu",
        青海: "qinghai",
        //5个自治区
        新疆: "xinjiang",
        广西: "guangxi",
        内蒙古: "neimenggu",
        宁夏: "ningxia",
        西藏: "xizang",
        //4个直辖市
        北京: "beijing",
        天津: "tianjin",
        上海: "shanghai",
        重庆: "chongqing",
        //2个特别行政区
        香港: "xianggang",
        澳门: "aomen"
      };

      //直辖市和特别行政区-只有二级地图，没有三级地图
      var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"]
      var mapdata = []
      //绘制全国地图
      axios.get("http://localhost:8080/map/china.json").then(res => {
        const d = [],
              data = res.data

        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name
          })
        }
        mapdata = d
        //注册地图
        echarts.registerMap("china", data)
        //绘制地图
        renderMap("china", d)
      })

      //地图点击事件
      chart.on("click", function(params) {
        if (params.name in provinces) {
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          axios.get(`http://localhost:8080/map/province/${provinces[params.name]}.json`).then(res => {
            const d = [], data = res.data
            echarts.registerMap(params.name, data)
            for (var i = 0; i < data.features.length; i++) {
              d.push({
                name: data.features[i].properties.name
              })
            }
            renderMap(params.name, d)
          })
        } else if (params.seriesName in provinces) {
          //如果是【直辖市/特别行政区】只有二级下钻
          if (special.indexOf(params.seriesName) >= 0) {
            renderMap("china", mapdata)
          } else {
            //显示县级地图
            axios.get(`http://localhost:8080/map/city/${cityMap[params.name]}.json`).then(res => {
              const d = [], data = res.data
              echarts.registerMap(params.name, data)
              for (var i = 0; i < data.features.length; i++) {
                d.push({
                  name: data.features[i].properties.name
                })
              }
              renderMap(params.name, d)
            })
          }
        } else {
          renderMap("china", mapdata)
        }
      })

      //初始化绘制全国地图配置
      var option = {
        // 背景色
        // backgroundColor: "#000",
        title: {
          text: "",
          subtext: "",
          link: "",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          },
          subtextStyle: {
            color: "#ccc",
            fontSize: 0,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            normal: {
              color: "#fff"
            }
          }
        },
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 1000
      };
      function renderMap(map, data) {
        option.title.subtext = map
        option.series = [
          {
            name: map,
            type: "map",
            mapType: map,
            roam: false,
            nameMap: {
              china: "中国"
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#999",
                  fontSize: 13
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#2C6B8E",
                borderColor: "dodgerblue"
              },
              emphasis: {
                areaColor: "darkorange"
              }
            },
            data: data
          }
        ];
        //渲染地图
        chart.setOption(option)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .title
    display flex
    .part1, .part2
      display flex
    .part1 
      position relative
      left .4rem
      > p
        display flex
        align-items center
        color #050230
        background #00FFFB
      > img:nth-of-type(2) 
        transform rotate(180deg)
    .part2
      position relative
      right .06rem
      > p
        display flex
        align-items center
        color #459EFF
        background  #1559A0
  
  .main
    display flex
    #map
      background url('../common/img/map-point.png')
</style>
