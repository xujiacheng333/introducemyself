window.onload=function(){
	btn();
}

var Data = []; //放置生成的随机数;
var ranData=[];
//渲染图表
function renderchart(index) {
	var chartbox = document.getElementById('chartbox');
	chartbox.innerHTML = "";
	for(var i = 0 ; i<60 ;i++){
		var pillar = document.createElement("div");
		if (i==index) {
			//动画 高
			animateheight(pillar,Data[i]);
		}else{
			//固定高
			pillar.style.height= Data[i]+"px";
		}
		pillar.style.width="10px";
		pillar.style.backgroundColor="#CD5555";
		pillar.style.position="absolute";
		pillar.style.bottom = 0;
		pillar.style.left= (15*i)+"px";
		pillar.title=Data[i];
		pillar.index=i;
		chartbox.appendChild(pillar);
		pillar.onclick=function () {
			Data.splice(this.index,1);
			renderchart();
		}
		pillar.onmouseover=function () {
			this.style.backgroundColor="#FFD700";
		}
		pillar.onmouseout=function () {
			this.style.backgroundColor="#CD5555";
		}
	}

}
//初始化渲染图表
function firrenderchart() {
	var chartbox = document.getElementById('chartbox');
	chartbox.innerHTML = "";
	for(var i = 0 ; i<60 ;i++){
		var pillar = document.createElement("div");
		pillar.style.width="10px";
		pillar.style.backgroundColor="#CD5555";
		pillar.style.position="absolute";
		pillar.style.bottom = 0;
		pillar.style.left= (15*i)+"px";
		pillar.title=Data[i];
		pillar.index=i;
		//固定高
		// pillar.style.height= Data[i]+"px";
		//动画 高
		animateheight(pillar,Data[i]);
		chartbox.appendChild(pillar);
		pillar.onclick=function () {
			Data.splice(this.index,1);
			renderchart();
		}
		pillar.onmouseover=function () {
			this.style.backgroundColor="#FFD700";
		}
		pillar.onmouseout=function () {
			this.style.backgroundColor="#CD5555";
		}
	}

}
//动画高
function animateheight(odiv,height) {
	if (height){
	var timer = setInterval(function () {
		if (odiv.offsetHeight == height) {
			clearInterval(timer);
		}else{
			odiv.style.height =odiv.offsetHeight+1+"px";
		}
	},10)
	}
}

//生成随机数
function randomnum() {
	for(var i = 0 ; i<50 ; i++){
	var rannum = Math.round(Math.random()*100);
	ranData[i]=rannum;
	}
}
//排序
var k=true;
function sort(){
		Data.sort(function (a,b) {
			return a-b;
			k=false;
			
		})
}


//确认最后的数据;
function sureData() {
	Data=ranData;
	firrenderchart();
}
 function check(){
 	if (Data.length>=60) {
 		alert("不可超过60个元素");
 		return false;
 	}else{
	if (txt.value>100 || txt.value<10 || txt.value=="") {
		alert("请输入10-100的数字");
		txt.value="";
		return false;
	}else{
		return true;
	}
	}
 }

//按钮事件
function btn(){
	var btn1=document.getElementById('btn1');
	var btn2=document.getElementById('btn2');
	var btn3=document.getElementById('btn3');
	var btn4=document.getElementById('btn4');
	var btn5=document.getElementById('btn5');
	var btn6=document.getElementById('btn6');
	var txt =document.getElementById('txt');
	var box = document.getElementById('chartbox');
	btn1.onclick=function(){
		if(check()){
			Data.splice(0,0,txt.value);
			renderchart(0);//加入参数 除了第一个柱子额外加载
			txt.value="";
		}
	}
	btn2.onclick=function(){
		if(check()){
		Data.push(parseInt(txt.value));
		renderchart(Data.length-1);
		txt.value="";
		};	
	}
	btn3.onclick=function(){
		alert("删除的数值为"+Data[0]);
		Data.splice(0,1);
		renderchart();

	}
	btn4.onclick=function(){
		alert("删除的数值为"+Data[Data.length-1]);
		Data.splice(-1,1);
		renderchart();

	}
	btn5.onclick=function(){
		Data.splice(0,Data.length); 
		randomnum();
		sureData();
	}
	btn6.onclick=function(){
		sort();
		firrenderchart();
	}
}