<template>
  <div class="map">
    <div class="title">
      <div class="tab1" @click="tab1" :class="isActive ? 'active' : null"><p>运营</p></div>
      <div class="tab2" @click="tab2" :class="!isActive ? 'active' : null"><p>行政区</p></div>
    </div>
    <div class="main">
      <img class="border-img map-left" src="../common/img/map-left.png" alt>
      <div class="container">
        <div class="select-wrapper">
          <div class="select1" v-show="isActive">
            <el-select
              v-for="(orgs,index) in orgselesctoptions"
              :key="index"
              v-model="orgselescts[index]"
              @change="SelectChange(index,orgselescts[index])"
            >
              <el-option
                v-for="(org,j) in orgs"
                :key="j"
                :label="org.name"
                :value="org.id"
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

          <div class="select2" v-show="!isActive">
            <el-select
              v-for="(districts,index) in districtselesctoptions"
              :key="index"
              v-model="districtselescts[index]"
              @change="SelectChange(index,districtselescts[index])"
            >
              <el-option
                v-for="(district,j) in districts"
                :key="j"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
          </div>

        </div>
        <div class="header-wrapper"> 
          <p class="header">{{cityname}}</p>
        </div>
        <div class="body" id="bodymap">
          <div id="map" v-show="!showtype"></div>
          <div id="mappic" v-show="!showtype"></div>
          <RegionDetail :type="showtype" :vname="vname" :vpic="vpic" :cpic="cpic" v-show="showtype"></RegionDetail>
        </div>
        <div class="count">
          <p><span>公寓总数：</span><span class="number-active">{{cellcount|splitNum}}</span></p>
          <p><span>设备总数：</span><span class="number-active">{{deviceCount|splitNum}}</span></p>
        </div>
        <div class="footer">
          <div class="item" v-for="(item, index) in mapArr" :key="index">
            <img :src="item.url" alt>
            <div>
              <p>{{item.name}}</p>
              <p class="number-active">{{item.num|splitNum}}</p>
            </div>
          </div>
        </div>
      </div>
      <img class="border-img map-right" src="../common/img/map-right.png" alt>
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
  filters:{
    splitNum(num){
      if(num===null) return '暂无';
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
  data() {
    return {
      isActive: true,
      mapArr: [
        {
          name: '开门次数',
          url: require("common/img/icon/mark1.png"),
          num: 0
        },
        {
          name: '充电次数',
          url: require("common/img/icon/mark2.png"),
          num: 0
        },
        {
          name: '充电度数',
          url: require("common/img/icon/mark3.png"),
          num: null
        },
        {
          name: '用电度数',
          url: require("common/img/icon/mark4.png"),
          num: null
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
      deviceCount:null,//设备总数
      vname:null,//小区名称
      vpics:null,//小区图片数组
      vpic:null,//数组第一张
      cpic:null//单元图片
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
   
    // document.getElementById("#map").omo = e =>{
    //    var mouseoverEvent = new Event('mouseover');
    //    this.myChart.dispatchEvent(myEvent);
    // }
    // document.getElementById("#map").onmouseover = e =>{
    //    var mouseoverEvent = new Event('mouseover');
    //    this.myChart.dispatchEvent(myEvent);
    // }
    //this.SelectChange(0,0);
    // setTimeout(() => this.init(), 300);
  },
  methods: {
    //选择五级架构
    tab1() {
      this.isActive = true;
      var index = 0;
      var selected =0 ;
      if(this.orgselescts.length){
        index = this.orgselescts.length -1;
        selected = this.orgselescts[index];
      }
      this.SelectChange(index,selected);
    },
    //选择行政区
    tab2() {
      this.isActive = false;
      var index = 0;
      var selected =0 ;
      if(this.districtselescts.length){
        index = this.districtselescts.length -1;
        selected = this.districtselescts[index];
      }
      this.SelectChange(index,selected);
    },
    //获取地图显示数据(行政区)
    async getdatalist(id,isleaf,path){
      var getvillage = null,villages = null;
      if(isleaf)  getvillage = this.$http.get(`/dmp/api/Map/QueryVillage/${id}`);
      const httpresult = await this.$http.post('/dmp/api/Map/MapPointCount',{id:id,isleaf:isleaf,path:path});
      this.mapArr[0].num = httpresult.openCount;
      this.mapArr[1].num = httpresult.chargeCount;
      const datalist = httpresult.cell;
      //const datalist2 = httpresult.device;
      if(isleaf) villages = await getvillage;
      for(var i =0;i<datalist.length;i++){
        var node = datalist[i];

        //var node2 = datalist2.find(item=>item.id==node.id);
        //if(node2) node.deviceCount = node2.count;
        //else node.count = 0;
        node.cellCount = node.count;
        
        var find =null;
        if(isleaf){
          find = villages.find(item=>item.id===node.id);
        }
        else {
          find = this.districts.find(item=>item.id===node.id);
          if(find.name=='上海市') {
            find = this.districts.find(item=>item.name=='上海市'&&item.parrentid!==0);
            if(find) node.id = find.id;
          }
          else if(find.name=='北京市') {
            find = this.districts.find(item=>item.name=='北京市'&&item.parrentid!==0);
            if(find) node.id = find.id;
          }
        }
        if(find){
          node.name = find.name;
          node.lng = find.lng;
          node.lat = find.lat;
        }
      }
      var showlist = datalist.filter(d=>d.cellCount);
      this.cellcount = showlist.reduce((p,c)=>{
        return p+c.cellCount;
      },0);
      // this.deviceCount = showlist.reduce((p,c)=>{
      //   return p+c.deviceCount;
      // },0);
      return showlist;
    },
    //获取地图显示数据(五级架构)
    async getorgdatalist(id,isleaf,path){
      var getvillage = null,villages = null;
      if(isleaf)  getvillage = this.$http.get(`/dmp/api/Org/QueryVillage/${id}`);
      const httpresult = await this.$http.post('/dmp/api/Org/MapPointCount',{id:id,isleaf:isleaf,path:path});
      this.mapArr[0].num = httpresult.openCount;
      this.mapArr[1].num = httpresult.chargeCount;
      const datalist = httpresult.cell;
      //const datalist2 = httpresult.device;
      if(isleaf) villages = await getvillage;
      for(var i =0;i<datalist.length;i++){
        var node = datalist[i];

        // var node2 = datalist2.find(item=>item.id==node.id);
        // if(node2) node.deviceCount = node2.count;
        // else node.count = 0;
        node.cellCount = node.count;

        var find =null;
        if(isleaf){
          find = villages.find(item=>item.id===node.id);
        }
        else {
          find = this.orgs.find(item=>item.id===node.id);
        }
        if(find){
          node.name = find.name;
          node.lng = find.lng;
          node.lat = find.lat;
        }
      }
      var showlist = datalist.filter(d=>d.cellCount);
      this.cellcount = showlist.reduce((p,c)=>{
        return p+c.cellCount;
      },0);
      // this.deviceCount = showlist.reduce((p,c)=>{
      //   return p+c.deviceCount;
      // },0);
      return showlist;
    },
    //下拉选择事件
    async SelectChange(index, id) {
      if(index&&!id){
        if(this.isActive) this.$emit('nodechange',{id:this.orgselescts[index-1],type:1});
        else this.$emit('nodechange',{id:this.districtselescts[index-1],type:2});
      }
      else this.$emit('nodechange',{id:id,type:this.isActive?1:2});

      this.showtype=0;//显示地图
      this.villageselect = null;//清除小区选择
      this.cellselect = null;//清除单元选择
      this.celloptions = null;//清除单元选择
      if (!this.isActive) {//行政区域
        this.districtselescts.length = index + 1;
        this.districtselesctoptions.length = index + 1;
        //const getdatalist = this.$http.post('/dmp/api/Map/CellCount',{id:0,isleaf:false});
        if(id==0){
          this.villageoptions = null;//小区选择清除
          if(index!=0){
            var node = this.districts.find(item=>item.id==this.districtselescts[index-1]);
            var datalist = await this.getdatalist(this.districtselescts[index-1],false,node.path);
            this.districtselescts[index]=0;
            this.districtselesctoptions[index]=[{id:0,name:'全部'}, ...datalist];
            this.InitMap(node.name,datalist,node);//刷新地图
          }
          else{
            var datalist = await this.getdatalist(0,false);
            this.districtselescts.length = 0;
            this.districtselesctoptions.length = 0;
            this.districtselescts.push(0);
            this.districtselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
            this.InitMap("中国",datalist,null);//刷新地图
          }
          return;
        }
        var node = this.districts.find(item=>item.id==id);
        var datalist = await this.getdatalist(node.id,node.isleaf,node.path);
        if (!node.isleaf){ 
          this.villageoptions = null;//小区选择清除
          this.districtselescts.push(0);
          this.districtselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
        }
        else{
          this.villageoptions = [{id:0,name:'全部'}, ...datalist];
          this.villageselect = 0;
        }
        this.InitMap(node.name,datalist,node);//刷新地图
      } else {
        this.orgselescts.length = index + 1;
        this.orgselesctoptions.length = index + 1;
        if(id==0){
          this.villageoptions = null;//小区选择清除
          if(index!=0){
            var node = this.orgs.find(item=>item.id==this.orgselescts[index-1]);
            var datalist = await this.getorgdatalist(this.orgselescts[index-1],false,node.path);
            this.orgselescts[index]=0;
            this.orgselesctoptions[index]=[{id:0,name:'全部'}, ...datalist];
            this.InitMap(node.name,datalist,node);//刷新地图
          }
          else{
            var rootnode = this.orgs.find(item=>item.parrentid==0);
            var datalist = await this.getorgdatalist(rootnode.id,false,rootnode.path);
            this.orgselescts.length = 0;
            this.orgselesctoptions.length = 0;
            this.orgselescts.push(0);
            this.orgselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
            this.InitMap("中国",datalist,null);//刷新地图
          }
          return;
        }
        var node = this.orgs.find(item=>item.id==id);
        var datalist = await this.getorgdatalist(node.id,node.isleaf,node.path);
        if (!node.isleaf){ 
          this.villageoptions = null;//小区选择清除
          this.orgselescts.push(0);
          this.orgselesctoptions.push([{id:0,name:'全部'}, ...datalist]);
        }
        else{
          this.villageoptions = [{id:0,name:'全部'}, ...datalist];
          this.villageselect = 0;
        }
        this.InitMap(node.name,datalist,node);//刷新地图
      }
    },
    async SelectVillage(id){
       this.cellselect = null;//清除单元选择
        if(id==0){//选择全部
          //this.$emit('nodechange',{id:this.orgselescts[this.orgselescts.length-1],type:1});//更新图表
          this.showtype = 0;
          //this.celloptions = null;//清除单元选择
          this.SelectChange(this.orgselescts.length-1,this.orgselescts[this.orgselescts.length-1]);
        }
        else{
          this.$emit('nodechange',{id:id,type:3});//更新图表
          this.showtype = 1;
          var village = this.villageoptions.find(v=>v.id==id);
          this.cityname = village.name;
          const httpresults = await this.$http.awaitTasks([
            this.$http.get(`/dmp/api/Cell/QueryCell/${id}`),
            this.$http.get(`/dmp/api/GetImage/GetVillage?id=${id}`)//1938 ${id}
          ])
          const celloptions = httpresults[0];
          this.celloptions = [{id:0,address:'全部'}, ...celloptions];//单元选择赋值
          this.cellselect = 0;
          this.vpics = httpresults[1].pics;
          // 小区图片只取一张;
          this.vpic = this.vpics.splice(0, 1)[0]
          this.mapArr[0].num = httpresults[1].openCount;
          this.mapArr[1].num = httpresults[1].chargeCount;
          this.cellcount = httpresults[1].cellCount;
          // this.deviceCount = httpresults[1].deviceCount;
        }
    },
    async SelectCell(id){
       if(id==0){//选择全部
          //this.$emit('nodechange',{id:this.villageselect[this.villageselect.length-1],type:1});//更新图表
          this.showtype=1;
          this.SelectVillage(this.villageselect);
        }
        else{
          this.$emit('nodechange',{id:id,type:4});//更新图表
          var cell = this.celloptions.find(v=>v.id==id);
          this.cityname = cell.address;
          this.showtype=2;
          const httpresult = await this.$http.get(`/dmp/api/GetImage/GetCuc?id=${id}`);//28147 ${id}
          this.cpic = httpresult.pic;
          this.mapArr[0].num = httpresult.openCount;
          this.mapArr[1].num = httpresult.chargeCount;
          this.cellcount = httpresult.cellCount;
          // this.deviceCount = httpresult.deviceCount;
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

      var chartmap = this.myChart;
      var canvas = null;
      var eventtrigger = (e,ename)=>{
      if(!canvas){
        var canvass = document.getElementById("bodymap").querySelectorAll("canvas");
        if(canvass.length) canvas = canvass[canvass.length-1];
        else return;
      } 
       var ev = document.createEvent('MouseEvents');
       ev.initMouseEvent(ename,true,true,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget,e.offsetX,e.offsetY);
       canvas.dispatchEvent(ev);
      }
      document.getElementById("mappic").onmouseover = e =>{
        console.log('eee', e)
        eventtrigger(e,'mouseover');
      };
      document.getElementById("mappic").onmousemove = e =>{
        eventtrigger(e,'mousemove');
      };
      document.getElementById("mappic").onmouseout = e =>{
        eventtrigger(e,'mouseout');
      };
    },
    async InitMap(cityname,datalist,node) {
      var type = 0;
      if(this.villageoptions) type=3;
      else if(this.isActive) type=1;
      else type=2;
      var cachepointdata={};
      var curshowid=0;
      var queryDeviceCount = (id)=>{
        console.log('id', id)
        curshowid=id;
        if(!cachepointdata[id]) cachepointdata[id]=this.$http.post('dmp/api/Map/DeviceCount',{type:type,id:id});
        return cachepointdata[id];
      }

      this.cityname = cityname;
      if(this.isActive&&cityname==="中国") this.cityname = this.orgs.find(item=>item.parrentid==0).name;

      var points = null;
      if(!this.isActive||cityname==="中国"){//是否需要获取边界数据抠图
        if(!this.isActive&&cityname!=="中国"){
          var nameall=null;
          for(var j=0;j<this.districtselescts.length;j++){
            var curname = this.districtselesctoptions[j].find(o=>o.id==this.districtselescts[j]).name;
            if(curname.indexOf('市')!=-1) nameall=curname;
            else if(nameall&&curname!='全部'){
              nameall = nameall + curname;
            }
          }
          if(nameall) cityname = nameall;
        }
        if (!this.CityData[cityname]&&this.CityData[cityname]!==null){
          this.CityData[cityname] = this.GetData(cityname,node);
        }
        points = await this.CityData[cityname]; //获取城市边界遮挡数据
      }

      // const pcenter = this.CityCenter[cityname]; //地图显示区域中心
      let view = this.getZoom(cityname,datalist);
      this.$zoom = view.zoom;
      this.$center = view.center;
      if(cityname==="中国") this.$center =this.CityCenter[cityname];

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
          trigger: "item",
          padding: 0,
          textStyle: {
            fontSize: 18
          }
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
                  color: "#053858"
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
                fontSize: 20,
                formatter: "{b}",
                position: "right",
                show: this.villageoptions ? false:true
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
              position: 'top',
              formatter:(params)=>{
                // console.log(params);
                var node = params.value[2];
                if(node.deviceCount) return `<div class="tooltip-wrapper">${node.name}<br />公寓总数:${node.cellCount}<br />设备总数:${node.deviceCount}</div>`;
                queryDeviceCount(node.id).then(deciveCount=>{
                  node.deviceCount = deciveCount
                  if(curshowid==node.id) mapdiv.firstElementChild.innerHTML=`<div class="tooltip-wrapper">${node.name}<br />公寓总数:${node.cellCount}<br />设备总数:${deciveCount}</div>`
                });
                // return `${node.name}<br />公寓总数:${node.cellCount}`;//<br />公寓总数:${node.cellCount}<br />设备总数:${node.deviceCount}
                return `<div class="tooltip-wrapper">${node.name}<br />公寓总数:${node.cellCount}</div>`;
              }
            },
            zlevel: 1
          }
        ]
      };

      if (this.curlay) this.bMap.removeOverlay(this.curlay); //删除当前图层
      if (this.curlayline) this.bMap.removeOverlay(this.curlayline); //删除当前虚线
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

      if((!this.isActive||cityname==="中国")&&points){
        this.curlay = new BMap.Polygon(points, {
          strokeColor: "none",
          fillColor: "rgba(0, 0, 0, 0.5)",
          // fillColor: "#053858",
          fillOpacity: 1,
          strokeOpacity: 0.5
        }); //建立多边形覆盖物
        this.curlayline = new BMap.Polyline( this.CityBoundaryData[cityname], {strokeColor:"blue", strokeWeight:2, strokeOpacity:1,strokeStyle:'dashed'});   //创建折线
        this.bMap.addOverlay(this.curlay); //添加覆盖物"#053858"
        if(cityname!=="中国")
          this.bMap.addOverlay(this.curlayline); //添加覆盖物"#053858"
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
        var result = this.bMap.getViewport(points);
        if(points.length==2) result.zoom-=1;
        return result;
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

<style lang="stylus">
@import '~common/stylus/variable.styl';
.number-active {
  color: $number-active;
  font-weight: bold;
}

.tooltip-wrapper {
  position: relative;
  width: 150px;
  height: 80px;
  padding: 6px 0 6px 10px;
  border-radius: 3px;
  background: #1C9AA8;
}

.tooltip-wrapper:before {
  content: '';
  position: absolute;  
  bottom: -6px;
  left: 70px;
  width: 3px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #1C9AA8;
}

.title {
  display: flex;
  .tab1.active {
    color: #fff;
    background: url('../common/img/tab1-active.png') no-repeat
  }
  .tab2.active {
    color: #fff;
    background: url('../common/img/tab2-active.png') no-repeat
  }

  .tab1 {
    width: 138px;
    display: flex;
    position: relative;
    left: 26px;
    align-items: center;
    cursor: pointer;
    background: url('../common/img/tab1.png') no-repeat
    p {
      padding: 10px 0 6px 47px
    }
  }

  .tab2 {
    position: relative;
    left: -7px;
    width:350px;
    cursor: pointer;
    background: url('../common/img/tab2.png') no-repeat;
    p {
      margin-top: 9px;
      text-align: center;
    }
  }
}

.main {
  display: flex;
  position: relative;
  .border-img {
    height 744px;
  }
  .container {
    position: relative;
    flex: 1;
    border-top: 1px solid #2F93C1;
    border-bottom: 1px solid #2F93C1;
    height: 742px;
    .select-wrapper {
      margin: 6px 0;
      .el-select {
        width: 137px;
        margin: 0 4px;
      }
      .el-select:nth-of-type(1) {
        margin-left: 0;
      }
      .el-select:nth-of-type(6) {
        margin-right: 0;
      }
    }
    .header {
      position: absolute;
      z-index: 99;
      top: 54px;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
    }
    .body {
        width: 880px;
        height: 750px;
        //background: url('../common/img/mapBg.png') no-repeat;  
        background-size: 100% 82%;
        position: relative;
        top: 4px;
        #map {
            width: 948px;
            height: 861px;  //完整地图的高度
            transform: scale(0.927, 0.7);
            position: relative;
            z-index: -1;
            top: -119px;
            left: -34px;
        }
        #mappic {
            width: 880px;
            height: 750px;  //完整地图的高度
            position: relative;
            background: url('../common/img/mapBg.png') no-repeat; 
            background-size: 100% 82%;
            top: -861px;
        }
      .community {
        display: flex;
        img {
          width: 400px;
        }
      }
    }
    .count {
      position: absolute;
      z-index: 999;
      bottom: 160px;
      left: 52px;
      height: 0;
      p {
        margin-bottom: 10px;
        span:nth-of-type(2) {
          color: $number-active
          font-weight: bold;
        }
      }  
    }
  }

  .footer {
    display: flex;
    position: relative;
    top: -114px;
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
          margin-bottom: 4px;
        }
        p:nth-child(2) {
          color: $color-active;
        }
      }
    }
  }
}
</style>

