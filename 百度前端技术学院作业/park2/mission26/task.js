	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var rects = [];//一个移动的方形
	var timer = [];//每一个飞船有自己的定时器
	var n = 0;
		//画圈圈
	 	fillcircle(50,context)
	 	circle(100,context);
		circle(150,context);

		(function newcontrol() {
				var creatship = document.getElementById('creatship');
				creatship.onclick=function(){
					if (n>1) {
						log("飞船已有两台",false)
					}else{
					timeLay(
					function () {
						if(suc()){
						log("创建一个飞船成功",true);
						creataship();
						}else{
						log("创建一个飞船失败",false);
						}				
					}				
					)
				}

				}
		})();
	function timeLay(dom) {
		var t = setTimeout(function () {
			dom()
		},1000)
	}
	function suc() {
		var suc = Math.floor(Math.random()*10);
		if (suc<3) {
			return false;
		}else{
			return true;
		}
	}

	function log(ele,w) {
		var logbroad =document.getElementById('log');
		logbroad.scrollTop = logbroad.scrollHeight;
		var span = document.createElement('span');
		span.style.display="block";
		if (w) {
		span.innerHTML =ele;
		span.style.color="green";
		}else{
		span.innerHTML =ele;
		span.style.color="red";
		}
		logbroad.appendChild(span);
	}

	function creataship() {
		if (n<2) {
			var control = document.getElementById('control');
			var newship = document.createElement('div');
			control.appendChild(newship);
			var span=document.createElement('span');
		 	var btn1=document.createElement('input');
		 	var btn2=document.createElement('input');
		 	span.innerHTML="对第"+(n+1)+"部飞船下达命令:";
		 	btn1.type="button";
		 	btn2.type="button";
		 	btn1.index=n;
		 	btn2.index=n;
		 	btn1.value="开始运动";
		 	btn2.value="停止运动";
		 	newship.appendChild(span);
		 	newship.appendChild(btn1);
		 	newship.appendChild(btn2);
		 	addrect(n,100+n*50,0.5)
		 	btn1.onclick=function () {
		 			start(this.index);
		 	}
		 	btn2.onclick=function () {
		 			stop(this.index);
		 	}
		 	n++;
		 	for (var i = timer.length - 1; i >= 0; i--) {
		 		clearInterval(timer[i])
		 	}
		 	startmove();
		}
	}

		function start(n) {
			if (rects[n].movetrue==true) {
				log("飞船已在运行",false)
			}else{
				timeLay(
					function () {
						if (suc()) {	
								rects[n].movetrue=true;
								log("飞船开始运行",true);
						}else{
							log("飞船未能正常运行",false);
						}
					}
				)
			}
			
		}
		function stop(n) {
			if (rects[n].movetrue==false) {
				log("飞船已经停止运行");
			}else{
				timeLay(
					function () {
						if (suc()) {	
								rects[n].movetrue=false;
								log("飞船停止运行",true);
						}else{
							log("飞船未能停止运行",false);
						}
					}
				)
			}
		
		}


		function startmove() {
				for(var i = 0 ; i<rects.length ; i++){
				clearInterval(timer[i])
				timer[i] = setInterval(function () {
					context.clearRect(0,0,500,500);
					fillcircle(50,context)
					circle(100,context);
					circle(150,context);
					rectsmove(context);
				},10)
			}
		}
		
	
	





function rectsmove(context) {
	for(var i =0 ;i<rects.length;i++){
		if (rects[i].present <= 0) {
			rects[i].movetrue=false;
		}
		if (rects[i].movetrue) {
			rects[i].speed =rects[i].orispeed;
			rects[i].movetime++;
			if (rects[i].movetime%100 == 99) {
				rects[i].present-=rects[i].presentreduce;
			}
		}else{
			rects[i].speed=0;
			rects[i].stoptime++;
			if (rects[i].stoptime%100 == 99) {
				if (rects[i].present+rects[i].presentrecover>=100) {
					rects[i].present=100
				}else{
					rects[i].present+=rects[i].presentrecover;
				}
			}
		}


		rects[i].move+=rects[i].speed;
		 rects[i].x=Math.cos(Math.PI/180*rects[i].move)*rects[i].r;
		 rects[i].y=Math.sin(Math.PI/180*rects[i].move)*rects[i].r;
		context.beginPath();
		context.rect(rects[i].x+rects[i].cirx-rects[i].width/2,rects[i].ciry+rects[i].y-rects[i].height/2,rects[i].width,rects[i].height);
		context.closePath();
		context.fillStyle="#838B8B"
		context.fill();




		context.font="bold 15px sans-serif"
		context.fillStyle="#fff";
		context.fillText(rects[i].present+"%",rects[i].x+rects[i].cirx-rects[i].width/3,rects[i].ciry+rects[i].y+rects[i].height/4)
	}
}


function addrect(n,r,speed) {
		rects[n] = {
			cirx:250,
			ciry:250,
			x:0,
			y:0,
			r:r,
			speed:speed,
			orispeed:speed,
			move:0,
			width:50,
			height:25,
			present:100,
			movetrue:false,
			presentreduce:4,
			movetime:0,
			stoptime:0,
			presentrecover:3
		}
}
function fillcircle(r,context) {
	context.beginPath();
	context.arc(250,250,r,0,Math.PI*2,true);
	context.closePath();
	context.fillStyle="#8FBC8F";
	context.fill();
}

function circle(r,context) {
	context.beginPath();
	context.arc(250,250,r,0,Math.PI*2,true);
	context.closePath();
	context.strokeStyle="#698B22";
	context.stroke();
}


	
