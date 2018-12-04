import axios from "axios"
export default function init() {
  let prevData = {}
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
  //绘制全国地图
  axios.get("/map/china.json").then(res => {
    const d = [],
          data = res.data
    for (var i = 0; i < data.features.length; i++) {
      d.push({
        name: data.features[i].properties.name
      })
    }
    prevData = {     // 上级数据
      name: 'china',
      data: d
    }
    this.$store.dispatch('PREV_DATA', prevData)
    //注册地图
    echarts.registerMap("china", data)
    //绘制地图
    renderMap("china", d, true)
  })
  //地图点击事件
  chart.on("click", function(params) {
    if (params.name in provinces) {
      //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
      axios.get(`/map/province/${provinces[params.name]}.json`).then(res => {
        const d = [], data = res.data
        echarts.registerMap(params.name, data)
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name
          })
        }
        // this.prevData = {            // 上级数据
        //   name: params.name,
        //   data: d
        // }
        renderMap(params.name, d, false)
      })
    } else if (params.seriesName in provinces) {
      //如果是直辖市不下钻
      if (special.indexOf(params.seriesName) >= 0) {
        return
      } else {
        //显示县级地图
        axios.get(`/map/city/${cityMap[params.name]}.json`).then(res => {
          const d = [], data = res.data
          echarts.registerMap(params.name, data)
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name
            })
          }
          renderMap(params.name, d, false)
        })
      }
    } else {
      // renderMap("china", mapdata)
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
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 1000,
    // 显示覆盖物
    geo: {
      map: "china",
      roam: false,
      // true, 点击省份，中国地图会一直显示
      show: false
    }
  };
  function renderMap(map, data, showScatter) {
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
            show: false,      // 是否显示省市区名字
            textStyle: {
              color: "#00FDF9",
              fontSize: 13
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#0DE1E3",
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
            areaColor: "#195A84"
          }
        },
        data: data
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [
          {
            name: "上海",
            value: [121.48, 31.22]
          }
        ],
        symbolSize: 10,
        rippleEffect: {
          //涟漪特效相关配置
          scale: 6,
          brushType: "stroke" //'stroke','fill'
        },
        symbolRotate: 35,
        //  显示覆盖物名字
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#ddb926"
          }
        }
      }
    ];
    if (showScatter) {
      option.series[1].symbolSize = 10
    } else {
      option.series[0].label.normal.show = true             // 市级显示名字
      option.series[1].symbolSize = 0                       // 省级不显示覆盖物
    }
    console.log('option.serie', option.series)
    //渲染地图
    chart.setOption(option)
  }
}