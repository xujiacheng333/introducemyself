var grid = document.getElementById('movegrid')
var rotdeg = 0;
var dec = "up";

function go() {
	if (dec =="up") {
	     if (grid.offsetTop>32) {
	    	 grid.style.top =grid.offsetTop-30 +"px";
	     }else{
	     	grid.style.top = "32px";
	     }
	    }else if (dec =="left") {
	    	console.log(grid.offsetLeft)
	    	if (grid.offsetLeft>32) {
	    		grid.style.left =grid.offsetLeft-30 +"px";
	    	}else{
	     	grid.style.left = "32px";
	     }
	    }else if (dec =="right"){
	    	if (grid.offsetLeft<302) {
	    		grid.style.left =grid.offsetLeft+30 +"px";
	    	}else{
	     	grid.style.left = "302px";
	     }
	    }else if (dec == "down"){
	    	if (grid.offsetTop<302) {
	    		grid.style.top =grid.offsetTop+30 +"px";
	    	}else{
	     	grid.style.top = "302px";
	     }
	    }

}



function left() {
	rotdeg-=90;
	grid.style.transform="rotate("+ rotdeg+"deg)";
	if (dec == "up") {
		dec = "left";
	}else if (dec == "left") {
		dec = "down";
	}else if (dec == "down"){
		dec = "right";
	}else if (dec == "right") {
		dec = "up";
	}
}
function right() {
	rotdeg+=90;
	grid.style.transform="rotate("+ rotdeg+"deg)";
	if (dec == "up") {
		dec = "right";
	}else if (dec == "left") {
		dec = "up";
	}else if (dec == "down"){
		dec = "left";
	}else if (dec == "right") {
		dec = "down";
	}
}
function TRALEF() {
	grid.style.left =grid.offsetLeft-30 +"px";
}
function TRATOP() {
	 grid.style.top =grid.offsetTop-30 +"px";
}
function TRARIG() {
	grid.style.left =grid.offsetLeft+30 +"px";
}
function TRABOT() {
	grid.style.left =grid.offsetTop+30 +"px";
}
function MOVLEF() {
	grid.style.left =grid.offsetLeft-30 +"px";
	grid.style.transform="rotate(-90deg)";
	dec = "left";
}
function MOVTOP() {
	grid.style.top =grid.offsetTop-30 +"px";
	grid.style.transform="rotate(0deg)";
	dec = "up";
}
function MOVRIG() {
	grid.style.left =grid.offsetLeft+30 +"px";
	grid.style.transform="rotate(90deg)";
	dec = "right";
}
function MOVBOT() {
	grid.style.top =grid.offsetTop+30 +"px";
	grid.style.transform="rotate(180deg)";
	dec = "down";
}
function noway() {
	
}


function doit(){
	//获取每一行的信息
	var order = document.getElementById('order');
	var orders = order.value.split(/\n/);
	var rows = orders.length; //一共存在多少行
	// var n = 0 ; //当前行
	orders[0];//代表第一行的数据
	var deltime = 0;
	for(var n = 0; n<rows ; n++){
		//已完成第n行的延迟执行
			var a = checkorder( orders[n] );//第一行得到的方法和下一行的延迟时间也是这一行执行的次数 times and way
			delay(checkorder( orders[n] ).way,checkorder( orders[n] ).times,deltime)//不延迟执行第一行
			console.log(deltime)
			deltime += parseInt(checkorder( orders[n] ).times);
	}
}

//分析一行的数据，返回需用的函数
function checkorder(oneorder) {
	// if (/go/i.test(oneorder)) {
	// 	var times=oneorder.match(/\d/)?oneorder.match(/\d/)[0]:1;
	// 	return {'way':go,times};
	// }
	console.log(action("go",oneorder))
	if (action("go",oneorder).bool) {
		var times =action("go",oneorder).times
		return {'way':go ,times}
	}
	else if (action("left",oneorder).bool) {
		var times =action("left",oneorder).times
		return {'way':left ,times}
	}
	else if (action("right",oneorder).bool) {
		var times =action("right",oneorder).times
		return {'way':right ,times}
	}
	else if (action("TRA LEF",oneorder).bool) {
		var times =action("TRA LEF",oneorder).times
		return {'way':TRALEF ,times}
	}
	else if (action("TRA RIG",oneorder).bool) {
		var times =action("TRA RIG",oneorder).times
		return {'way':TRARIG ,times}
	}
	else if (action("TRA TOP",oneorder).bool) {
		var times =action("TRA TOP",oneorder).times
		return {'way':TRATOP ,times}
	}
	else if (action("TRA BOT",oneorder).bool) {
		var times =action("TRA BOT",oneorder).times
		return {'way':TRABOT ,times}
	}
	else if (action("MOV LEF",oneorder).bool) {
		var times =action("MOV LEF",oneorder).times
		return {'way':MOVLEF ,times}
	}
	else if (action("MOV RIG",oneorder).bool) {
		var times =action("MOV RIG",oneorder).times
		return {'way':MOVRIG ,times}
	}
	else if (action("MOV TOP",oneorder).bool) {
		var times =action("MOV TOP",oneorder).times
		return {'way':MOVTOP ,times}
	}
	else if (action("MOV BOT",oneorder).bool) {
		var times =action("MOV BOT",oneorder).times
		return {'way':MOVBOT ,times}
	}
	else{
		return {'way':noway ,'times':0}
	}
	//加入更多动作
}
//判断动作函数
function action(a,oneorder){
	var act = RegExp("^\\s*("+a+")\\s*\\d?\\b","i")
	var times = 1;
	if (act.test(oneorder)) {
		times=oneorder.match(/\d/)?oneorder.match(/\d/)[0]:1
	}
	return {'bool':act.test(oneorder),times};
}

//延迟执行函数
function delay(way , times ,delaytime) {
	var delayit = setTimeout(function () {
		way()
		times--;
		//若次数大于0 即1以上 继续执行
		if (times>0) {
			delay(way,times,1)
		}
	},delaytime*500)
}