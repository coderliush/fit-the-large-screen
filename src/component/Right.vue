<template>
  <div class="map">
    <div class="title">
      <div class="part1">
        <img src="../common/img/map-bg.png" alt>
        <p>运营</p>
        <img src="../common/img/map-bg.png" alt>
      </div>
      <div class="part2">
        <img src="../common/img/title-left.png" alt>
        <p>行政区切换</p>
        <img src="../common/img/title-right.png" alt>
      </div>
    </div>

    <div class="main">
      <img src="../common/img/map-left.png" alt>
      <img class="back" src="../common/img/icon/back.png" alt="">
      <div id="map" style="width: 100%;"></div>
      <div class="footer">
        <div class="item" v-for="(item, index) in mapArr" :key="index">
          <img :src="item.url" alt="">
          <div>
            <p>门禁数据</p>
            <p>{{item.num}}</p>
          </div>
        </div>
      </div>
      <img src="../common/img/map-right.png" alt>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import cityMap from "../../public/js/citymap.js";
export default {
  name: "",

  data() {
    return {
      mapArr: [{
        url: require('common/img/icon/mark1.png'),
        num: '132.456.79'
      },{
        url: require('common/img/icon/mark2.png'),
        num: '132.456.79'
      },{
        url: require('common/img/icon/mark3.png'),
        num: '132.456.79'
      },{
        url: require('common/img/icon/mark4.png'),
        num: '132.456.79'
      }]
    }
  },
  components: {},
  mounted() {
    setTimeout(() => this.init())
  },
  methods: {
    init() {
      this.dimensions = null; //缓存计算的缩放级别
      this.myChart = null; //echart控件
      this.bMap = null; //当前百度地图控件
      this.curlay = null; //当前图层
      this.curLevel = 1; //当前显示级别
      this.curCityName = null; //当前显示城市的名称
      this.lastCityNames = []; //

      this.CityZoom = { 上海市: 10, 中国: 5 };
      this.CityData = {}; //城市遮挡数据
      this.CityBoundaryData = {}; //城市边界数据
      this.CitySW = {}; //西南
      this.CityNE = {}; //东北
      this.CityCenter = {}; //中心
      const mapdiv = document.getElementById("map");
      var w = mapdiv.clientWidth || mapdiv.offsetWidth;
      var h = mapdiv.clientHeight || mapdiv.offsetHeight;
      this.dimensions = this.mark(w, h);

      this.myChart = echarts.init(mapdiv);
      this.curLevel = 1;
      this.myChart.on("click", params => {
        const e = params.event.event;
        e.stopPropagation();
        e.preventDefault();
        this.curLevel++;
        //this.bMap.clearOverlays();

        this.lastCityNames.push(this.curCityName);
        this.curCityName = params.data.name;
        this.InitMap(this.curCityName);
      });
      this.curCityName = "中国";
      this.InitMap(this.curCityName);
    },
    async InitMap(cityname) {
      if (this.curlay) this.bMap.removeOverlay(this.curlay); //删除当前图层
      if (!this.CityData[cityname])
        this.CityData[cityname] = this.GetData(cityname);

      var data = [
        { name: "上海市", value: 60000 },
        { name: "江苏省", value: 30000 },
        { name: "浙江省", value: 10000 },
        { name: "北京市", value: 1000 },

        { name: "湖北省", value: 10000 }
      ];
      if (cityname != "中国") {
        data = [
          { name: "苏州市", value: 6000 },
          { name: "南京市", value: 6000 }
        ];
      }

      const needawaits = [];
      for (let i = 0; i < data.length; i++) {
        const cname = data[i].name;
        if (!this.CityData[cname]) {
          this.CityData[cname] = this.GetData(cname);
          needawaits.push(this.CityData[cname]);
        }
      }
      for (let i = 0; i < needawaits.length; i++) {
        await needawaits[i];
      }

      const points = await this.CityData[cityname]; //获取城市边界遮挡数据
      const pcenter = this.CityCenter[cityname]; //地图显示区域中心
      let zoom = this.getZoom(cityname);

      var option = {
        // backgroundColor: '#404a59',
        title: {
          // text: `${cityname}青客公寓分布图`,
          //subtext: 'data from qk365.com',
          //sublink: 'http://www.pm25.in',
          top: "20",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [pcenter.lng, pcenter.lat],
          zoom: zoom,
          enableMapClick: false,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#080E3E"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            // data: this.convertData(data.sort(function (a, b) {
            //     return b.value - a.value;
            // }).slice(0, 10)),
            data: this.convertData(data),
            symbolSize: function(val) {
              return 10;
            },
            //showEffectOn: 'emphasis',
            rippleEffect: {
              //涟漪特效相关配置
              scale: 6,
              brushType: "stroke" //'stroke','fill'
            },
            //hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ddb926",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      this.myChart.clear();
      this.myChart.setOption(option);

      var ecModel = this.myChart["_model"];

      let map;
      ecModel.eachComponent("bmap", function(bmapModel) {
        map = bmapModel.__bmap; //由echart实例获取百度地图的实例
        map.disableDoubleClickZoom(); //去掉双击放大事件
        map.disablePinchToZoom();
        //map.disableScrollWheelZoom();
      });
      this.bMap = map;

      this.curlay = new BMap.Polygon(points, {
        strokeColor: "none",
        fillColor: "#080E3E",
        fillOpacity: 1,
        strokeOpacity: 0.5
      }); //建立多边形覆盖物
      this.bMap.addOverlay(this.curlay); //添加覆盖物"#080E3E"

      if (cityname === "中国") {
        this.bMap.disableScrollWheelZoom();
        this.bMap.disableDragging();
        this.bMap.setMinZoom(5);
      } else {
        this.bMap.enableScrollWheelZoom();
        this.bMap.enableDragging();
        this.bMap.setMinZoom(zoom);
        //this.bMap.setZoom(this.getZoom(cityname))
      }
    },
    back() {
      if (!this.lastCityNames.length) return;
      const lastCity = this.lastCityNames.pop();
      this.curCityName = lastCity;
      this.InitMap(lastCity);
    },
    //获取城市数据
    GetData(cityname) {
      return new Promise((resolve, reject) => {
        const bdary = new BMap.Boundary();
        bdary.get(cityname, rs => {
          resolve(this.getrect(rs, cityname));
        });
      });
    },
    //获取遮布数据并缓存 原有边界数据，以及计算中心，显示范围
    getrect(rs, cityname) {
      const blist = rs.boundaries;

      const pcentor = new BMap.Point(0, 0);
      const pNE = new BMap.Point(180, 90); //东北角
      const pNW = new BMap.Point(-180, 90); //西北角
      const pSW = new BMap.Point(-180, -90); //西南角
      const pSE = new BMap.Point(180, -90); //东南角

      //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
      var pArray = [];
      pArray.push(pcentor);
      pArray.push(pNW);
      pArray.push(pSW);
      pArray.push(pSE);
      pArray.push(pNE);
      pArray.push(pNW);
      pArray.push(pcentor);

      var boundary = [];
      //循环添加各闭合区域
      let minx = 180,
        miny = 90,
        maxx = 0,
        maxy = 0;
      for (var i = 0; i < blist.length; i++) {
        const ply = new BMap.Polygon(blist[i]);

        //将点增加到视野范围内
        let points = ply.getPath();
        if (
          points[0].lat != points[points.length - 1].lat ||
          points[0].lng != points[points.length - 1].lng
        ) {
          points = [...points, points[0]];
        }

        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
        if (points.length > 200) {
          pArray.push(...points, pArray[0]);
          boundary.push(...points);
          //计算
          const bounds = ply.getBounds();
          const ne = bounds.getNorthEast();
          if (ne.lng > maxx) maxx = ne.lng;
          if (ne.lat > maxy) maxy = ne.lat;
          const sw = bounds.getSouthWest();
          if (sw.lng < minx) minx = sw.lng;
          if (sw.lat < miny) miny = sw.lat;
        }
      }

      minx--;
      maxx++;
      miny--;
      maxy++;
      pcentor.lng = (minx + maxx) / 2;
      pcentor.lat = (miny + maxy) / 2;

      this.CitySW[cityname] = new BMap.Point(minx, miny);
      this.CityNE[cityname] = new BMap.Point(maxx, maxy);
      this.CityBoundaryData[cityname] = boundary;
      if (cityname == "中国") {
        this.CityCenter[cityname] = new BMap.Point(104.114129, 37.550339); //中国中心
      } else {
        this.CityCenter[cityname] = pcentor;
      }
      return pArray;
    },
    //根据经纬极值计算绽放级别。
    getZoom(cityname) {
      if (!this.bMap) return 5;
      if (cityname === "中国") return 5;
      var zoom = [
        5,
        10,
        20,
        50,
        100,
        200,
        500,
        1000,
        2000,
        5000,
        10000,
        20000,
        25000,
        50000,
        100000,
        200000,
        500000,
        1000000,
        2000000
      ]; //级别21到3。
      var pointA = this.CityNE[cityname]; // 创建点坐标A
      var pointB = new BMap.Point(this.CitySW[cityname].lng, pointA.lat); // 创建点坐标B
      var pointC = new BMap.Point(pointA.lng, this.CitySW[cityname].lat); // 创建点坐标C

      var distancew = this.bMap.getDistance(pointA, pointB); ///this.dimensionscalew;  //获取两点距离,保留小数点后两位
      var distanceh = this.bMap.getDistance(pointA, pointC); ///this.dimensionscaleh;  //获取两点距离,保留小数点后两位
      // let distance = distancew;
      // if (distanceh < distancew) distance = distanceh;

      // for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
      //     if (zoom[i] - distance > 0) {
      //         const resultzoom = 21 - i;
      //         return resultzoom;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
      //     }
      // };
      for (var i = 0, zoomLen = this.dimensions.length; i < zoomLen; i++) {
        if (
          distancew < this.dimensions[i].maxw &&
          distanceh < this.dimensions[i].maxh
        ) {
          const resultzoom = 18 - i;
          return resultzoom; //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
      }
      // for(var i = 18;i>0;i--){
      //     const pxevery = Math.pow(2, (18 - i));//把地图级别带进去，就能得出各个级别下1px对应多少米。
      //     if(pxevery*this.width>distancew && pxevery*this.height>distanceh){
      //         return i;
      //     }
      // }
    },

    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        const p = this.CityCenter[data[i].name];
        var geoCoord = [p.lng, p.lat];
        // var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    mark(w, h) {
      var data = [
        18,
        17,
        16,
        15,
        14,
        13,
        12,
        11,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ]; //18到3
      return data.map(i => {
        const pxevery = Math.pow(2, 18 - i);
        return { maxw: w * pxevery, maxh: h * pxevery };
      });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable.styl'
.title 
  display flex

  .part1, .part2 
    display flex

  .part1 
    position relative
    left 0.4rem

    > p 
      display flex
      align-items center
      color #050230
      background #00FFFB

    > img:nth-of-type(2) 
      transform rotate(180deg)

  .part2 
    position relative
    right 0.06rem
    > p 
      display flex
      align-items: center
      color #459EFF
      background #1559A0

.main 
  display flex
  position relative
  .back
    position absolute
    z-index 99
    width .3rem
    height .3rem
    top .6rem
    right .6rem
    padding .1rem
    background #1F4169
    cursor pointer
  #map 
    padding .1rem 0
    background: url('../common/img/map-point.png')
  .footer
    display flex
    position absolute 
    left 0
    right 0
    bottom .2rem
    .item
      flex 1
      display flex
      justify-content center
      img
        width .5rem
        height .5rem
        margin-right .1rem
      div
        display flex
        flex-direction column
        justify-content center
        p:nth-child(1)
          font-size $font-small
          margin-bottom .05rem
        p:nth-child(2)
          color $color-active

</style>

