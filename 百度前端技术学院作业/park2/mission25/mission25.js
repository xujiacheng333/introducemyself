var searchok=false;
//bug 没有子元素的不需要显示三角形
// 显示向右三角形的必须要把子元素隐藏起来
window.onload=function () {
	//初始化
	var root= document.getElementById('tree-area');
	var div=adddiv(root,"前端工程师","show");
	drawtree("前端工程师","技术要求","谈笑风生","招聘公司")
	 drawtree("技术要求","JavaScript","css3","HTML5");
	 drawtree("css3","css")
}
//树状图
function drawtree(root,bunch1,bunch2,bunch3,bunch4){
	//找到title的内容为root的对应父元素
	var titles= document.getElementsByClassName('title');
	for (var i = titles.length - 1; i >= 0; i--) {
		if (titles[i].innerHTML == root) {
			adddiv(titles[i].parentNode,bunch1,"hidden");
			if (bunch2) {
			adddiv(titles[i].parentNode,bunch2,"hidden");
			}
			if (bunch3) {
			adddiv(titles[i].parentNode,bunch3,"hidden");
			}
			if (bunch4) {
			adddiv(titles[i].parentNode,bunch4,"hidden");
			}
		}
	}
	
}

//添加对应的树枝
function adddiv(parentele,value,hidshow) {
	var div = document.createElement('div');
	div.style.paddingLeft="10px";
	parentele.appendChild(div);
	var a1 = document.createElement('a');
	a1.href="#";
	a1.className="arrow"
	div.appendChild(a1);
	var a2 = document.createElement('a');
	a2.href="#";
	a2.className="title";
	a2.innerHTML=value;
	div.appendChild(a2);
	var span=document.createElement("span");
	span.className="icon";
	div.appendChild(span);
	var img1 =document.createElement("img");
	img1.src="img/add.png";
	var img2 = document.createElement('img');
	img2.src="img/delete.png";
	span.appendChild(img1);
	span.appendChild(img2);
	//判断classname
	//判断三角形方向
	if (hidshow=="show") {
		div.className="show"
	}else {
		 div.className="hidden";
	}
	div.onmouseover=function () {
		event.stopPropagation();
		span.style.visibility="visible";
	}
	div.onmouseout=function () {
		event.stopPropagation();
		span.style.visibility="hidden";
	}
	a1.onclick=function () {
		//取消冒泡
		event.stopPropagation();
		console.log(this.parentNode);
		if (this.parentNode.className=="show") {
			this.parentNode.className="hidden";
		}else{
			this.parentNode.className="show";
		}
		}
	a2.onclick=function () {
		//取消冒泡
		event.stopPropagation();
		if (this.parentNode.className=="show") {
			this.parentNode.className="hidden";
		}else{
			this.parentNode.className="show";
		}
		}
	img1.onclick=function () {
		var inputdiv =document.createElement("div");
		inputdiv.style.display="inline-block";
		var inputbox = document.createElement("input");
		inputbox.type="text";
		inputbox.style.width="100px";
		inputbox.id="newdata";
		var surebtn =document.createElement("input");
		surebtn.type="button";
		surebtn.value="添加";
		var cancelbtn= document.createElement("input");
		cancelbtn.type="button";
		cancelbtn.value="取消";
		inputdiv.appendChild(inputbox);
		inputdiv.appendChild(surebtn);
		inputdiv.appendChild(cancelbtn);
		div.insertBefore(inputdiv,span)
		surebtn.onclick=function () {
			adddiv(this.parentNode.parentNode,document.getElementById('newdata').value,"hidden");
			this.parentNode.parentNode.removeChild(this.parentNode)
		}
		cancelbtn.onclick=function () {
			this.parentNode.parentNode.removeChild(this.parentNode);
		}
	}
	img2.onclick=function () {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	}
	return div;
}

function search() {
	var searchvalue = document.getElementById('searchtext').value;
	var titlevalue = document.getElementsByClassName("title");
	searchok=false;
	for (var i = titlevalue.length - 1; i >= 0; i--) {
		if (titlevalue[i].innerHTML==searchvalue) {
			titlevalue[i].style.color="red";
			searchok=true;
			showthediv(titlevalue[i])
		}
	}
	if (!searchok) {
	var showp =document.getElementById("showp");
	showp.innerHTML="没有找到对应的结果"
	}
}
function showthediv(elea) {
	// elea.parentNode.className="show";
	elea.parentNode.parentNode.className="show";
	elea.parentNode.parentNode.parentNode.className="show";
	var showp =document.getElementById("showp");
	var searchvalue = document.getElementById('searchtext').value;
	showp.innerHTML="找到    "+searchvalue+"    ";
}
function clean() {
	var titlevalue = document.getElementsByClassName("title");
	for (var i = titlevalue.length - 1; i >= 0; i--) {
		titlevalue[i].style.color="black";
	}
	var showp =document.getElementById("showp");
	showp.innerHTML="";
}