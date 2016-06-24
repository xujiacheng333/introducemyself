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
}
function MOVTOP() {
	grid.style.top =grid.offsetTop-30 +"px";
	grid.style.transform="rotate(0deg)";
}
function MOVRIG() {
	grid.style.left =grid.offsetLeft+30 +"px";
	grid.style.transform="rotate(90deg)";
}
function MOVBOT() {
	grid.style.top =grid.offsetTop+30 +"px";
	grid.style.transform="rotate(180deg)";
}

function doit() {
	var order = document.getElementById('order');
	console.log(order.value)
	if (order.value == "TRA LEF") {
		TRALEF()
	}else if (order.value == "TRA TOP") {
		TRATOP()
	}else if (order.value == "TRA RIG"){
		TRARIG()
	}else if (order.value == "TRA BOT"){
		TRABOT()
	}else if (order.value == "MOV LEF"){
		MOVLEF()
	}else if (order.value == "MOV TOP"){
		MOVTOP()
	}else if (order.value == "MOV RIG"){
		MOVRIG()
	}else if (order.value == "MOV BOT"){
		MOVBOT()
	}
}