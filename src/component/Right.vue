<template>
  <div class="map">
    <div class="title">
      <div class="tab1" @click="tab1" :class="isActive ? 'active' : null"><p>运营</p></div>
      <div class="tab2" @click="tab2" :class="!isActive ? 'active' : null"></div>
    </div>
    <div class="main">
      <img src="../common/img/map-left.png" alt>
      <div class="container">
        <div class="select-wrapper">
          <div class="select1" v-show="isActive">
            
          </div>

          <div class="select2" v-show="!isActive">
            <el-select
              v-for="(districts,index) in districtselesctoptions"
              :key="index"
              v-model="districtselescts[index]"
              @change="SelectChange(index,districtselescts[index])"
              placeholder="请选择"
            >
              <el-option
                v-for="(district,j) in districts"
                :key="j"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
            <el-select v-if="villageoptions" v-model="villageselect" @change="SelectVillage(villageselect)" >
              <el-option
                  v-for="(village,i) in villageoptions"
                  :key="i"
                  :label="village.name"
                  :value="village.id">
                </el-option>
            </el-select>
            <el-select v-if="celloptions" v-model="cellselect" @change="SelectCell(cellselect)" >
              <el-option
                  v-for="(cell,i) in celloptions"
                  :key="i"
                  :label="cell.address"
                  :value="cell.id">
                </el-option>
            </el-select>
          </div>
        </div>
        <p class="header">运营管理本部</p>
        <div class="body">
          <div id="map" v-show="!showtype"></div>
          <RegionDetail :type="showtype" v-show="showtype"></RegionDetail>
        </div>
        <div class="count">
          <p><span>公寓总数：</span><span>{{cellcount}}</span></p>
          <p><span>设备总数：</span><span>1888</span></p>
        </div>
        <div class="footer">
          <div class="item" v-for="(item, index) in mapArr" :key="index">
            <img :src="item.url" alt>
            <div>
              <p>门禁数据</p>
              <p>{{item.num}}</p>
            </div>
          </div>
        </div>
      </div>
      <img src="../common/img/map-right.png" alt>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import RegionDetail from './RegionDetail'
export default {
  name: "",
  components: {
    RegionDetail
  },
  data() {
    return {
      isActive: false,
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
      ],
      options: [{
          value: 0,
          label: '显示地图'
        }, {
          value: 1,
          label: '显示小区'
        }, {
          value: 2,
          label: '显示单元'
        }],
      showtype: 0,//显示类型 0显示地图 1显示小区 2显示单元
      cityname: "",
      orgselescts: [], //组织架构选择的值
      orgselesctoptions: [], //组织架构下拉绑定的列表
      districtselescts: [], //行政区选择的值
      districtselesctoptions: [], //行政区下拉绑定的列表
      villageselect: null,
      villageoptions: null,
      cellselect: null,
      celloptions: null,
      cellcount:null,//公寓总数
    };
  },
  async mounted() {
    const getdistrict = this.$http.get('/dmp/api/Map/Query');
    const getorg = this.$http.get('/dmp/api/Org/Query');
    this.districts = await getdistrict;
    // this.districtselesctoptions.push([{id:0,name:'全部'},...this.districts.filter(d=>{
    //   if(d.name=='上海市'){
    //     return d.parrentid!==0;
    //   }
    //   return d.parrentid===0;
    // })]);
    // this.districtselescts.push(0);
    this.orgs = await getorg;
    this.init();
    //this.SelectChange(0,0);
    // setTimeout(() => this.init(), 300);
  },
  methods: {
    tab1() {
      this.isActive = true;
    },
    tab2() {
      this.isActive = false;
    },
    //获取地图显示数据
    async getdatalist(id,isleaf){
      var getvillage = null,villages = null;
      if(isleaf)  getvillage = this.$http.get(`/dmp/api/Map/QueryVillage/${id}`);
      const datalist = await this.$http.post('/dmp/api/Map/CellCount',{id:id,isleaf:isleaf});
      if(isleaf) villages = await getvillage;
      for(var i =0;i<datalist.length;i++){
        var node = datalist[i];
        var find =null;
        if(isleaf){
          find = villages.find(item=>item.id===node.id);
        }
        else {
          find = this.districts.find(item=>item.id===node.id);
          if(find.name=='上海市') {
            find = this.districts.find(item=>item.name=='上海市'&&item.parrentid!==0);
            node.id = find.id;
          }
          else if(find.name=='北京市') {
            find = this.districts.find(item=>item.name=='北京市'&&item.parrentid!==0);
            node.id = find.id;
          }
        }
        node.name = find.name;
        node.lng = find.lng;
        node.lat = find.lat;
      }
      var showlist = datalist.filter(d=>d.cellCount);
      this.cellcount = showlist.reduce((p,c)=>{
        return p+c.cellCount;
      },0);
      return showlist;
    },
    //下拉选择事件
    async SelectChange(index, id) {
      this.$emit('nodechange',id);
      this.showtype=0;//显示地图
      this.villageselect = null;//清除小区选择
      this.cellselect = null;//清除单元选择
      this.celloptions = null;//清除单元选择
      if (!this.isActive) {//行政区域
        if( this.districtselescts.length){
          this.districtselescts.length = index + 1;
          this.districtselesctoptions.length = index + 1;
        }
        //const getdatalist = this.$http.post('/dmp/api/Map/CellCount',{id:0,isleaf:false});
        if(id==0){
          this.villageoptions =null;//小区选择清除
          if(index!=0){
            var datalist = await this.getdatalist(this.districtselescts[index-1],false);
            this.districtselesctoptions[index]=[{id:0,name:'全部'}, ...datalist];
            var node = this.districts.find(item=>item.id==this.districtselescts[index-1]);
            this.InitMap(node.name,datalist,node);//刷新地图
          }
          else{
            var datalist = await this.getdatalist(0,false);
            this.districtselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
            this.InitMap("中国",datalist,null);//刷新地图
          }
          return;
        }
        var node = this.districts.find(item=>item.id==id);
        var datalist = await this.getdatalist(node.id,node.isleaf);
        if (!node.isleaf){ 
          this.villageoptions = null;//小区选择清除
          this.districtselescts.push(0);
          this.districtselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
        }
        else{
          this.villageoptions = [{id:0,name:'全部'}, ...datalist];
        }
        this.InitMap(node.name,datalist,node);//刷新地图
      } else {
        this.orgselescts.length = index + 1;
        this.orgselesctoptions.length = index + 1;
        var node = this.districts.find(item=>item.id==id);
        if (node.isleaf) {
          //选择服务中心时 查询小区
        } else {
          const nextselects = this.orgs.filter(v => v.parrentid == node.id);
          this.orgselescts.push(0);
          this.orgselesctoptions.push([{id:0,name:'全部'}, ...nextselects]);
        }
      }
    },
    async SelectVillage(id){
       this.cellselect = null;//清除单元选择
       var village = this.villageoptions.find(item=>item.id==id);
        if(id==0){//选择全部
          this.showtype=0;
          this.celloptions = null;//清除单元选择
        }
        else{
          this.showtype=1;
          const celloptions = await this.$http.get(`/dmp/api/Cell/QueryCell/${id}`);
          this.celloptions = [{id:0,address:'全部'}, ...celloptions];//单元选择赋值
        }
    },
    async SelectCell(id){
       if(id==0){//选择全部
          this.showtype=1;
        }
        else{
          this.showtype=2;
          //const celloptions = await this.$http.get(`/dmp/api/Map/QueryCell/${id}`);
          //this.celloptions = [{id:0,address:'全部'}, ...celloptions];//单元选择赋值
        }
    },
    wait (){
      return new Promise((reslove,reject)=>{
        setTimeout(reslove,100);
      })
    },
    init() {
      // this.orgs = []; //5级架构数据数据
      // this.districts = []; //行政区数据

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

      this.myChart = echarts.init(mapdiv);
      this.curLevel = 1;
      // this.myChart.on("click", params => {
      //   const e = params.event.event;
      //   e.stopPropagation();
      //   e.preventDefault();
      //   this.curLevel++;
      //   //this.bMap.clearOverlays();

      //   this.lastCityNames.push(this.curCityName);
      //   this.curCityName = params.data.name;
      //   this.InitMap(this.curCityName);
      // });
      this.curCityName = "中国";
      //this.InitMap(this.curCityName);
      this.SelectChange(0,0);
    },
    async InitMap(cityname,datalist,node) {
      if (!this.CityData[cityname]&&!this.CityData[cityname]!==null)
        this.CityData[cityname] = this.GetData(cityname,node);
      const points = await this.CityData[cityname]; //获取城市边界遮挡数据

      // const pcenter = this.CityCenter[cityname]; //地图显示区域中心
      let view = this.getZoom(cityname,datalist);
      this.$zoom = view.zoom;
      this.$center = view.center;
      if(this.CityCenter[cityname]) this.$center =this.CityCenter[cityname];

      var serietype = 'effectScatter';
      if(this.villageoptions) serietype='scatter';
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
          center: [this.$center.lng, this.$center.lat],
          zoom: this.$zoom,
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
            // name: "Top 5",
            type: serietype,//"effectScatter",
            coordinateSystem: "bmap",
            // data: this.convertData(data.sort(function (a, b) {
            //     return b.value - a.value;
            // }).slice(0, 10)),
            data: this.convertData(datalist),
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
            tooltip: {
              trigger :'item',
              formatter: function(params){
                console.log(params);
                var node = params.value[2];
                return `${node.name}<br />公寓总数:${node.cellCount}<br />设备总数:${node.cellCount}`;
              }
            },
            zlevel: 1
          }
        ]
      };

      if (this.curlay) this.bMap.removeOverlay(this.curlay); //删除当前图层
      this.myChart.clear();
      const mapdiv = document.getElementById("map");
      for (var i = mapdiv.children.length - 2; i > -1; i--) {
        //移除上次echart生成的dom
        if (mapdiv.children[i].class != "ec-extension-bmap")
          mapdiv.removeChild(mapdiv.children[i]);
      }

      this.myChart.setOption(option); //重新设置参数
      var ecModel = this.myChart["_model"];
      let map;
      ecModel.eachComponent("bmap", function(bmapModel) {
        map = bmapModel.__bmap; //由echart实例获取百度地图的实例
        map.disableDoubleClickZoom(); //去掉双击放大事件
        map.disablePinchToZoom();
        map.disableScrollWheelZoom();
        map.disableDragging();
        map.disableInertialDragging();
      });
      this.bMap = map;

      if(points){
        this.curlay = new BMap.Polygon(points, {
          strokeColor: "none",
          fillColor: "#080E3E",
          fillOpacity: 1,
          strokeOpacity: 0.5
        }); //建立多边形覆盖物
        this.bMap.addOverlay(this.curlay); //添加覆盖物"#080E3E"
      }

      // if (cityname === "中国") {
      //   this.bMap.disableScrollWheelZoom();
      //   this.bMap.disableDragging();
      //   this.bMap.setMinZoom(5);
      // } else {
      //   this.bMap.enableScrollWheelZoom();
      //   this.bMap.enableDragging();
      //   this.bMap.setMinZoom(zoom);
      //   //this.bMap.setZoom(this.getZoom(cityname))
      // }
    },
    back() {
      if (!this.lastCityNames.length) return;
      const lastCity = this.lastCityNames.pop();
      this.curCityName = lastCity;
      this.InitMap(lastCity);
    },
    //获取城市数据
    GetData(cityname,node) {
      return new Promise((resolve, reject) => {
        const bdary = new BMap.Boundary();
        bdary.get(cityname, rs => {
          resolve(this.getrect(rs, cityname,node));
        });
      });
    },
    //获取遮布数据并缓存 原有边界数据，以及计算中心，显示范围
    getrect(rs, cityname,node) {
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
        if (points.length > 200 || blist.length === 1) {
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
      if(blist.length){
        this.CitySW[cityname] = new BMap.Point(minx, miny);
        this.CityNE[cityname] = new BMap.Point(maxx, maxy);
        this.CityBoundaryData[cityname] = boundary;
      }
      else{
        this.CitySW[cityname] = null;
        this.CityNE[cityname] = null;
        this.CityBoundaryData[cityname] = null;
      }
      
      if (cityname == "中国") {
        pcentor.lng = 104.114129;
        pcentor.lat = 20.550339;
        this.CityCenter[cityname] = new BMap.Point(104.114129, 37.550339); //中国中心
      } else {
        // this.CityCenter[cityname] = pcentor;
        this.CityCenter[cityname] = new BMap.Point(node.lng, node.lat);
      }
      return pArray;
    },
    //根据经纬极值计算绽放级别。
    getZoom(cityname,datalist) {
      if (!this.bMap) return {center:new BMap.Point(104.114129, 37.550339),zoom:5};
      if (cityname === "中国") return {center:new BMap.Point(104.114129, 37.550339), zoom:5};
      if(this.CityBoundaryData[cityname]){//有边界数据 按边界数计算
        return this.bMap.getViewport(this.CityBoundaryData[cityname]);
      }
      else{//没有边界数据 按展示的点计算
        var points = datalist.map(p => new BMap.Point(p.lng, p.lat));
        return this.bMap.getViewport(points);
      }
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = [data[i].lng, data[i].lat];
        // const p = this.CityCenter[data[i].name];
        // var geoCoord = [p.lng, p.lat];
        // var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i])
          });
        }
      }
      return res;
    },
    //选择 行政区(true)，组织架构(false)
    SelectTab(isdistrict) {
      this.$isdistrict = isdistrict;
    },
    
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable.styl';

.title {
  display: flex;
  position: relative;
  left: 40px;
  .tab1.active {
    color: #050230 !important;
    background: #00FFFB !important;
  }
  .tab2.active {
    color: #050230 !important;
    background: #fff !important;
    border-bottom:30px solid #00FFFB!important;
  }


  .tab1 {
    display: flex;
    align-items: center;
    position: relative;
    z-index:999;
    padding: 0 20px;
    transform: skew(-45deg)
    color: #459EFF;
    background: #1559A0;
    cursor: pointer;
    > p {
      transform: skew(45deg);
    }
  }

  .tab2 {
    position: relative;
    left: -14px;
    width:100px;
    height:0;
    border-bottom:30px solid #1559A0;
    border-left:30px solid transparent;
    border-top-right-radius: 6px;
    cursor: pointer;
    &::before {
      content: "行政区切换";
			position: absolute;
			top: 8px;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background: red;
    }
  }
}

.main {
  display: flex;
  position: relative;
  .container {
    flex: 1;
    border-top: 1px solid #2F93C1;
    border-bottom: 1px solid #2F93C1;
    .select-wrapper {
      margin: 10px;
      .el-select {
        width: 100px;
        margin: 10px 10px;
      }
    }
    .header {
      text-align: center;
      margin: 10px 0;
    }
    .body {
        width: 800px;
        height: 600px;
        border: 10px solid #1F406A;
      #map {
        width: 800px;
        height: 600px;
      }
      .community {
        display: flex;
        img {
          width: 400px;
        }
      }
    }
    .count {
      position: relative;
      top: -78px;
      left: 40px;
      p {
        margin-bottom: 10px;
        span:nth-of-type(2) {
          color: $color-active
        }
      }  
    }
  }

  .footer {
    display: flex;
    margin: 20px 0;
    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      img {
        margin-right: 10px;
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

