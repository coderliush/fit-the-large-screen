<template>
  <div class="map">
    <div class="title">
      <div
        class="part1"
        @click="onClick1"
        :class="active1 ? 'active' : null"
      >
        <div class="skew">
          <p>运营</p>
        </div>
      </div>
      <div
        class="part2"
        @click="onClick2"
        :class="active2 ? 'active' : null"
      >
        <p>行政区切换</p>
      </div>
    </div>

    <div class="main">
      <img
        src="../common/img/map-left.png"
        alt=""
      >
      <img
        class="back"
        src="../common/img/icon/back.png"
        alt=""
        @click="back"
      >
      <div
        id="map"
        style="width: 100%;"
      ></div>
      <div class="footer">
        <div
          class="item"
          v-for="(item, index) in mapArr"
          :key="index"
        >
          <img
            :src="item.url"
            alt=""
          >
          <div>
            <p>门禁数据</p>
            <p>{{item.num}}</p>
          </div>
        </div>
      </div>
      <img
        src="../common/img/map-right.png"
        alt=""
      >
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "",
  computed: {
    ...mapGetters(["prevData"])
  },
  data() {
    return {
      active1: true,
      active2: false,
      isDistrict: false,
      mapArr: [
        {
          url: require("common/img/icon/mark1.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark2.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark3.png"),
          num: "132.456.79"
        },
        {
          url: require("common/img/icon/mark4.png"),
          num: "132.456.79"
        }
      ]
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    onClick1() {
      this.active1 = true;
      this.active2 = false;
    },
    onClick2() {
      this.active1 = false;
      this.active2 = true;
      this.isDistrict = true;
    },
    renderMap(option, map, data, showScatter) {
      const echarts = require("echarts");
      var chart = echarts.init(document.getElementById("map"));
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
              show: false, // 是否显示省市区名字
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
        option.series[1].symbolSize = 10;
      } else {
        option.series[0].label.normal.show = true; // 市级显示名字
        option.series[1].symbolSize = 0; // 省级不显示覆盖物
      }
      //渲染地图
      chart.setOption(option);
    },
    back() {
      let option = {
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
      this.renderMap(option, this.prevData.name, this.prevData.data);
    },
    init() {
      const echarts = require("echarts");
      var chart = echarts.init(document.getElementById("map"));
      let prevData = {};
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
      var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
      //初始化绘制全国地图配置
      let option = {
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
      //绘制全国地图
      axios.get("/map/china.json").then(res => {
        const d = [],
          data = res.data;
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name
          });
        }
        prevData = {
          name: "china",
          data: d
        };
        this.$store.dispatch("prevData", prevData);
        //注册地图
        echarts.registerMap("china", data);
        //绘制地图
        this.renderMap(option, "china", d, true);
      });
      //地图点击事件
      chart.on("click", function(params) {
        if (params.name in provinces) {
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          axios
            .get(`/map/province/${provinces[params.name]}.json`)
            .then(res => {
              const d = [],
                data = res.data;
              echarts.registerMap(params.name, data);
              for (var i = 0; i < data.features.length; i++) {
                d.push({
                  name: data.features[i].properties.name
                });
              }
              // this.prevData = {            // 上级数据
              //   name: params.name,
              //   data: d
              // }
              this.renderMap(option, params.name, d, false);
            });
        } else if (params.seriesName in provinces) {
          //如果是直辖市不下钻
          if (special.indexOf(params.seriesName) >= 0) {
            return;
          } else {
            //显示县级地图
            axios.get(`/map/city/${cityMap[params.name]}.json`).then(res => {
              const d = [],
                data = res.data;
              echarts.registerMap(params.name, data);
              for (var i = 0; i < data.features.length; i++) {
                d.push({
                  name: data.features[i].properties.name
                });
              }
              this.renderMap(option, params.name, d, false);
            });
          }
        } else {
          // renderMap("china", mapdata)
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.title {
  display: flex;
  position: relative;
  left: 0.64rem;

  .active {
    color: #050230 !important;
    background: #00FFFB !important;
  }

  .part1, .part2 {
    display: flex;
    cursor: pointer;
    color: #3E96F7;
    background: #1559A0;
    cursor: pointer;
  }

  .part1 {
    transform: skew(-45deg);
    padding: 0.1rem 0.4rem;

    .skew {
      transform: skew(45deg);

      > p {
        display: flex;
        align-items: center;
      }

      > img:nth-of-type(2) {
        transform: rotate(180deg);
      }
    }
  }

  .part2 {
    padding: 0.1rem 1.4rem;

    color #459EFF {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background: #58a;
        transform: perspective(0.5em) rotateX(5deg);
        transform-origin: bottom left;
      }
    }

    > p {
      display: flex;
      align-items: center;
    }
  }
}

.main {
  display: flex;
  position: relative;

  .back {
    position: absolute;
    z-index: 99;
    width: 0.3rem;
    height: 0.3rem;
    top: 0.6rem;
    right: 0.6rem;
    padding: 0.1rem;
    background: #1F4169;
    cursor: pointer;
  }

  #map {
    padding: 0.1rem 0;
    background: url('../common/img/map-point.png');
  }

  .footer {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.2rem;

    .item {
      flex: 1;
      display: flex;
      justify-content: center;

      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.1rem;
      }

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          font-size: $font-small;
          margin-bottom: 0.05rem;
        }

        p:nth-child(2) {
          color: $color-active;
        }
      }
    }
  }
}
</style>
