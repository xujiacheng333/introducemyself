/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	 var city = document.getElementById('aqi-city-input').value;
 	 var num = document.getElementById('aqi-value-input').value;
 	 if (isNaN(city) == false || city == "") {
 	 	alert("城市名称错误或空")
 	 }else if(isNaN(num) == true || num == ""){
 	 	alert("空气质量指数错误或空")
 	 }else{
 	 	return [city,num]
 	 }
 	 
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(data) {
	var table = document.getElementById('aqi-table');
	var newtr = document.createElement("tr");
	var newtd1 = document.createElement("td");
	var newtd2 = document.createElement("td");
	var newtd3 = document.createElement("td");
	var newbtn = document.createElement("button");
	newtd1.innerHTML = data[0];
	newtd2.innerHTML = data[1];
	newbtn.innerHTML = "删除";
	table.appendChild(newtr);
	newtr.appendChild(newtd1);
	newtr.appendChild(newtd2);
	newtr.appendChild(newtd3);
	newtd3.appendChild(newbtn);
	newbtn.onclick=function () {
		table.removeChild(newtr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  var Data = addAqiData();
  renderAqiList(Data);
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById('add-btn');
  btn.onclick = function () {
  	addBtnHandle();
  }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

window.onload = function(){init();}