(function newcontrol() {
	var n = 0;
	var creatship = document.getElementById('creatship');
	creatship.onclick=function () {
		var control = document.getElementById('control');
		var newship = document.createElement('div');
		control.appendChild(newship);
		var span=document.createElement('span');
	 	var btn1=document.createElement('input');
	 	var btn2=document.createElement('input');
	 	span.innerHTML="对第"+(n+1)+"部飞船下达命令:";
	 	btn1.type="button";
	 	btn2.type="button";
	 	btn1.value="开始运动";
	 	btn2.value="停止运动";
	 	newship.appendChild(span);
	 	newship.appendChild(btn1);
	 	newship.appendChild(btn2);
	 	addrect(0,100+n*50,0.5);
	 	n++;
	}
})()
	
