var timer;
var data;
function transver(type) {
var root = document.getElementById('root');
 	cleancolor(data);
	data=[];
 	clearInterval(timer);
	switch(type){
		case "pre_":
		data.push(root);
		pre_transver(root.children,data);
		break;
		case "in_":
		in_transver(root,data);
		break;
		case "bef_":
		bef_transver(root.children,data);
		data.push(root);
		break;
	}
	changeColor(data);
}

function pre_transver(ele,data){
	for(var i = 0 ;i<ele.length ;i++){
		data.push(ele[i]);
		pre_transver(ele[i].children,data);
	}
}
function in_transver(ele,data) {
	if(ele){
		in_transver(ele.firstElementChild,data);
		data.push(ele);
		in_transver(ele.lastElementChild,data);
	}
}
function bef_transver(ele,data) {
	for(var i = 0 ;i<ele.length ; i++){
		bef_transver(ele[i].children,data);
		data.push(ele[i]);
	}
}
function changeColor(data) {
	clearInterval(timer);
	var time = document.getElementById('time').value;
	var i = 0 ;
	var length = data.length;
	data[i++].style.backgroundColor="red";
	timer = setInterval(function () {
		if (i<length) {
			data[i-1].style.backgroundColor="#fff";
			data[i++].style.backgroundColor="red";

		}else{
			clearInterval(timer);
			data[i-1].style.backgroundColor="#fff";
		}
	},time?time:500)
}
function cleancolor(data) {
	if (data) {
		for (var i = data.length - 1; i >= 0; i--) {
			data[i].style.backgroundColor="#fff";
		}
	}

}