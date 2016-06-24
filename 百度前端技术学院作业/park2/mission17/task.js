/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    //
     var chart= document.getElementById('aqi-chart-wrap');
     chart.innerHTML="";
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var data ={};
    var cityarr=[];
    var placedata ={};
    var eachplacedata =[];
    var eachplacetime =[];
    var eachplacetimetitle=[];
    switch(time){
        case "day":
       var data =chartData.day;//每日的所有城市的数据
       break;
        case "week":
        var data = chartData.week;
        break;
        case "month":
        var data = chartData.month;
        break
      }
      cityarr = Object.getOwnPropertyNames(data);
      placedata = data[city]; //当地的当时的全部数据；
      console.log(placedata)
        for (var key in placedata){
          eachplacedata.push(placedata[key]);//每天的数据数组
        }
        if (placedata) {
         eachplacetime.push(Object.getOwnPropertyNames(placedata));  
        }
        for(var i = 0 ;i <eachplacedata.length ; i++){
           var pillar = document.createElement("li");
           pillar.style.float ="left";
           pillar.style.height=eachplacedata[i]+"px";
           pillar.style.position ="absolute";
           pillar.style.display="block";
           pillar.style.bottom = 0;
           switch(time){
            case "day":
              pillar.style.width="10px";
              pillar.style.left = (i*13)+"px";
              pillar.title=eachplacetime[0][i]+'质量为'+eachplacedata[i];
              break;
            case "week":
              pillar.style.width="60px";
              pillar.style.left = (i*90)+"px";
              pillar.title=eachplacetime[0][i]+'平均质量为'+eachplacedata[i];
              break;
            case "month":
              pillar.style.width="100px";
              pillar.style.left = (i*170+350)+"px";
              pillar.title=eachplacetime[0][i]+'平均质量为'+eachplacedata[i];
              break;
           }
            if (eachplacedata[i]>400) {
              pillar.style.backgroundColor="#8B636C";
            }else if(eachplacedata[i]>300 && eachplacedata[i]<400){
              pillar.style.backgroundColor="#8B2323";
            }else if (eachplacedata[i]<300 && eachplacedata[i]>200) {
              pillar.style.backgroundColor="#8B008B";
            }else if (eachplacedata[i]<200 && eachplacedata[i]>100) {
              pillar.style.backgroundColor="#8A2BE2";
            }else{
              pillar.style.backgroundColor="#87CEFA";
            }
           chart.appendChild(pillar);
        }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange() {
  // 确定是否选项发生了变化 
  if (event.target.value != pageState.nowGraTime) {
    pageState.nowGraTime=event.target.value;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var selectlist = document.getElementById('city-select');
  var index = selectlist.selectedIndex;
  if (selectlist[index].value != pageState.nowSelectCity) {
    // 设置对应数据
    pageState.nowSelectCity=selectlist[index].value;    
  }
    renderChart();

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var rad = document.getElementsByName('gra-time');
    for (var i = rad.length - 1; i >= 0; i--) {
      rad[i].onclick=function () {
        graTimeChange();
      };
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */


function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city = Object.getOwnPropertyNames(aqiSourceData);
  var selectlist = document.getElementById('city-select');

 var innercity = city.map(function (item) {
    return "<option>" + item +"</option>"
 });
 selectlist.innerHTML = innercity.join("")


  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selectlist.onchange=function () {
    citySelectChange();
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
        var week={},day={},month={};
      for( city in aqiSourceData) {
        var tampcity = aqiSourceData[city];
        var date = Object.getOwnPropertyNames(tampcity);
        var monthindex =  parseInt(date[0].slice(5,7));
        var eachmonthvalue=0;
        var eachweekvalue=0;
        var monthvaluearr={};
        var weekvaluearr={};
        var j =0;
        var weekint=1;
        for(var i = 0 ; i<date.length ; i++){
         eachmonthvalue+=tampcity[date[i]];
         eachweekvalue+=tampcity[date[i]];
         j++;
         if (parseInt(date[i].slice(5,7)) != monthindex || i ==date.length-1) {
            var monthname = monthindex+"月";
            monthvaluearr[monthname] =Math.round(eachmonthvalue/j);
            monthindex++;
            eachmonthvalue=0;
            j = 0;
         }
         if (i % 7 ==6) {
            var weekname = "第"+weekint+"周";
            weekvaluearr[weekname] = Math.round(eachweekvalue/7);
            weekint++;
            eachweekvalue=0;
         }
        }
        month[city]=monthvaluearr;
        week[city]=weekvaluearr;
      }
        //装数据的容器
        chartData.week = week;
        chartData.month = month;
        chartData.day = aqiSourceData;
        renderChart();
 }

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload=function(){init()};
