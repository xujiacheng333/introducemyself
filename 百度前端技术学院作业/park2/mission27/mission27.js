//定义每一艘船
var ship =new Array(4);
for (var i = ship.length - 1; i >= 0; i--) {
	ship[i]={
		has:false,
		move:false,
		speed:2*Math.PI/180,
		X:0,
		R:i*50+100,
		energy:100,
		expend:8,
		recover:4,
		second:0
	}
}
$(function(){
	//一直运行的计时器
	var timer = setInterval(function(){
		draw();	
	},25)
})

//每时每刻都绘画
function  draw	() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.clearRect(0,0,1000,600);
	starpathway();
	shipmove();
}
//飞船运行的动画
function shipmove() {
	for (var i = ship.length - 1; i >= 0; i--) {
		if (ship[i].has) {
			ship[i].second++;

			if (ship[i].move) {
				if (ship[i].energy>0) {
					ship[i].X+=ship[i].speed;
					if (ship[i].second%40==39) {
						ship[i].energy=Math.floor(ship[i].energy-ship[i].expend);
					}
				}else{
					ship[i].energy=0;
					ship[i].move = false;
				}
			}else{
				if (ship[i].energy<100) {
				if (ship[i].second%40==39) {
					ship[i].energy=Math.floor(ship[i].energy+ship[i].recover);
				}
				}
			}
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		context.beginPath();
		context.rect(380+ship[i].R*Math.cos(ship[i].X),285-ship[i].R*Math.sin(ship[i].X),40,30);
		context.fillStyle="#71C671";
		context.closePath();
		context.fill();

		context.fillStyle="#fff";
		context.font='italic 18px sans-serif';
		context.fillText(ship[i].energy+'%',380+ship[i].R*Math.cos(ship[i].X),305-ship[i].R*Math.sin(ship[i].X));

		}
		
	}
}

//绘画星球和轨道
function starpathway() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.beginPath();
	context.arc(400,300,50,0,Math.PI*2,true);
	context.closePath();
	context.fillStyle="#6E8B3D";
	context.fill();

	context.beginPath();
	context.arc(400,300,100,0,Math.PI*2,true);
	context.closePath();
	context.strokeStyle="#6E8B3D";
	context.stroke();

	context.beginPath();
	context.arc(400,300,150,0,Math.PI*2,true);
	context.closePath();
	context.strokeStyle="#6E8B3D";
	context.stroke();

	context.beginPath();
	context.arc(400,300,200,0,Math.PI*2,true);
	context.closePath();
	context.strokeStyle="#6E8B3D";
	context.stroke();

	context.beginPath();
	context.arc(400,300,250,0,Math.PI*2,true);
	context.closePath();
	context.strokeStyle="#6E8B3D";
	context.stroke();
}
//添加一部新的船
for(var i = 0 ; i<ship.length ; i++){
	(function (i) {
		$(".add").eq(i).click(function(){
			if (!ship[i].has) {
				delay(function () {
					if(suc()){
						ship[i].has = true;
						$('.speed').eq(i).attr({
							'disabled':'true'
						})
						con('新建一首飞船',true);
					}else{
						con('新建一首飞船',false);
					}
				});
			}
		})
	})(i)
}
//销毁一部小船
for (var i = ship.length - 1; i >= 0; i--) {
	(function (i) {
		$(".del").eq(i).click(function(){
			if (ship[i].has) {
				delay(function () {
					if (suc()) {
						con('销毁该飞船',true);
						$('.speed').eq(i).attr('disabled',false)
						ship[i]={
							has:false,
							move:false,
							speed:2*Math.PI/180,
							X:0,
							R:i*50+100,
							energy:100,
							expend:8,
							recover:4,
							second:0
						}
					}else{
						con('销毁该飞船',false);
					}
				})
			}
		})
	})(i)
}
//开始一部小船
for (var i = ship.length - 1; i >= 0; i--) {
	(function (i) {
		$(".move").eq(i).click(function(){
			delay(function () {
				if (suc()) {
					if (ship[i].has) {
						ship[i].move = true;
						con('飞船开始运行',true);
					}
				}else{
					con('飞船开始运行',false);
				}
			})
			
		})
	})(i)
}
//停止一部小船
for (var i = ship.length - 1; i >= 0; i--) {
	(function (i) {
		$(".stop").eq(i).click(function(){
			delay(function () {
				if (suc()) {
					if (ship[i].has) {
					ship[i].move = false;
					con('飞船停止运行',true);
					}
				}else{
					con('飞船停止运行',false);
				}
			})

		})
	})(i)
}
//改变速度
for (var i = ship.length - 1; i >= 0; i--) {
	(function (i) {
		$(".speed").eq(i).change(function(){
			ship[i].speed=$(this).val()*Math.PI/180;
			ship[i].expend=$(this).val()*4;
		})
	})(i)
}
//传播成功率 与 广播平台
function suc() {
	var i = Math.random()>0.1;
	return i ;
}
function con(argument,i) {
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	var massage = $('#massage')[0];
	massage.scrollTop = massage.scrollHeight;
	if (i) {
		$('#massage').append('<p style="color:green;">于'+hours+':'+minutes+':'+seconds+'——'+argument+'成功</p>');
	}else{
		$('#massage').append('<p style="color:red;">于'+hours+':'+minutes+':'+seconds+'——'+argument+'失败</p>');
	}
}
function delay(eve) {
	var t = setTimeout(function () {
		eve();
	},1000)

}