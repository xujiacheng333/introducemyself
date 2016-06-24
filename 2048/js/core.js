(function (document) {
	window.onload = function () {
		initial(document);
		//控制模块 crtl
		function crtl (document){
			mouse(document);
			key(document)
			touch(document)
			function mouse(document) {
				var downX = 0,
					downY = 0,
					upX = 0 ,
					upY = 0 ,
					moveX = 0 ,
					moveY = 0,
					keycode= null ;
				document.onmousedown =function () {
					downX = event.x;
					downY = event.y;
				}
				document.onmouseup =function () {
					upX = event.x;
					upY = event.y;
					moveX = upX - downX ;
					moveY = upY - downY ;
					var x_y = moveY / moveX;
					// 以y轴变化为主
					if (x_y > 5 && moveY > 0) {
						keycode = 40;
					}
					if (x_y > 5 && moveY < 0) {
						keycode = 38;
					}
					if (x_y < 0.2 && moveX > 0) {
						keycode = 39;
					}
					if (x_y < 0.2 && moveX < 0) {
						keycode = 37;
					}
					//运行计算模块
					if (keycode != null) {
						var arr = cul(keycode)
						output(arr,keycode)
						createonenum();
						rander();
					}
					
					//运行完后再次初始化
					downX = 0;
					downY = 0;
					upX = 0 ;
					upY = 0 ;
					moveX = 0 ;
					moveY = 0;
					keycode = null;
				}		
			}
			function touch(document) {
				var downX = 0,
					downY = 0,
					upX = 0 ,
					upY = 0 ,
					moveX = 0 ,
					moveY = 0,
					keycode= null ;

				document.addEventListener("touchstart",function () {
					var touch = event.targetTouches[0]
					downX = touch.pageX;
					downY = touch.pageY;
					console.log(downX,downY)
				})
				document.addEventListener("touchend",function () {
					var touch = event.changedTouches[0];
					upX = touch.pageX;
					upY = touch.pageY;
					moveX = upX - downX ;
					moveY = upY - downY ;
					var x_y = moveY / moveX;
					// 以y轴变化为主
					if (x_y > 5 && moveY > 0) {
						keycode = 40;
					}
					if (x_y > 5 && moveY < 0) {
						keycode = 38;
					}
					if (x_y < 0.2 && moveX > 0) {
						keycode = 39;
					}
					if (x_y < 0.2 && moveX < 0) {
						keycode = 37;
					}
					//运行计算模块
					if (keycode != null) {
						var arr = cul(keycode)
						output(arr,keycode)
						createonenum();
						rander();
					}
					
					//运行完后再次初始化
					downX = 0;
					downY = 0;
					upX = 0 ;
					upY = 0 ;
					moveX = 0 ;
					moveY = 0;
					keycode = null;
				})	
			}
			function key(document) {
				document.onkeyup =function () {
					var keycode = event.which;
					var arr = cul(keycode)
					output(arr,keycode)
					createonenum();
					rander();
				}
			}
		}
		//初始化模块
		function initial(document) {
			createonenum();
			createonenum();
			rander();	
			crtl(document)
		}
		//计算模块 cul 最后可得到最终的数组
		function cul(keycode) {
			return createarr(keycode)
			//生成最终数组的模块
			function createarr(keycode) {
				// 初始化数组 从td中获取得到
				var inarr = [];
				//分好的组 alterarr;
				var alterarr = {
					arr1 : [],
					arr2 : [],
					arr3 : [],
					arr4 : []
				}
				var num = document.getElementsByTagName('td');
				for(var i = 0 ; i<num.length ; i++ ){
					inarr.push(parseInt(num[i].innerHTML))
				}
				switch(keycode){
					case 37:
					case 39:

					//0123 4567 891011 11-13
					for(var j = 0 ; j<inarr.length ; j++){
						var jmo =parseInt(j / 4) ;
						switch ( jmo ){
							case 0 :
							alterarr.arr1.push(inarr[j]);
							break;
							case 1 :
							alterarr.arr2.push(inarr[j]);
							break;
							case 2 :
							alterarr.arr3.push(inarr[j]);
							break;
							case 3 :
							alterarr.arr4.push(inarr[j]);
							break;
						}			
					}
					break;
					case 38:
					case 40:
					for(var j = 0 ; j<inarr.length ; j++){
						var jmo =parseInt(j % 4) ;
						switch ( jmo ){
							case 0 :
							alterarr.arr1.push(inarr[j]);
							break;
							case 1 :
							alterarr.arr2.push(inarr[j]);
							break;
							case 2 :
							alterarr.arr3.push(inarr[j]);
							break;
							case 3 :
							alterarr.arr4.push(inarr[j]);
							break;
						}			
					}
					break;
				}
				  // compare(alterarr)可以返回对比后的数组arr
				 return replace(compare(alterarr),keycode)
			}
			//对比模块 compare
			function compare(alterarr) {

				for(key in alterarr){
					var arr = alterarr[key]
					var carrier = []
					carrier.splice(0,carrier.length);
					arr = checknull(arr)
					for (var i = 0; i <arr.length; i++) {
						if (arr[i+1]) {
							if(arr[i] == arr[i+1]){
								carrier.push(arr[i]*2);
								i++;
							}else{
								carrier.push(arr[i]);
							}
						}else{
							carrier.push(arr[i])
						}
					}
					carrier = checknull(carrier)
					alterarr[key].splice(0,alterarr[key].length);
					alterarr[key] = carrier
				}
				//测试checknull
				return alterarr;
			}
			//检查数组是否有null值 若有去掉
			function checknull (arr){
				var newarr = []
				for(var i = 0 ; i<arr.length ; i++){
					if (arr[i] !== null && !isNaN(arr[i])) {
						newarr.push(arr[i])
					}
				}
				return newarr;
			}
			//替换模块 replace 
			function replace(arr,keycode) {
				switch (keycode){
					case 37 :
					case 38 :
					for(key in arr){
						var len =arr[key].length
						if (len != 4 ) {
							var dif = 4-len	;
							for(var i = 0 ; i<dif ; i++){
								arr[key].push(null);
							}	
						}
					}
					break;
					case 39 : 
					case 40 :
					for(key in arr){
						var len =arr[key].length
						if (len != 4 ) {
							var dif = 4-len	;
							for(var i = 0 ; i<dif ; i++){
								arr[key].splice(0,0,null);
							}	
						}
					}
					break;
				}
				return arr
			}
		}
		// 渲染模块
		//一个输出模块 output 输出到相应的td
		function output(arr,keycode) {
			var tds = document.getElementsByTagName('td');
			var lastarr = []
			var lastarr2 = []  //这个为最后的到的
			for(key in arr){
				lastarr.push(arr[key])
			}
			if(keycode == 38  || keycode == 40){
				for(var i = 0 ; i<lastarr.length ; i++){
					for(var j = 0 ; j < lastarr.length; j++){
						lastarr2[i+j*4] = lastarr[i][j]
					}
				} 
			}else if(keycode == 37  || keycode == 39){
				for(var i = 0 ; i<lastarr.length ; i++){
					for(var j = 0 ; j<lastarr[i].length; j++){
						lastarr2[i*4+j] = lastarr[i][j]
					}
				}
			}
			for(var k = 0 ; k <lastarr2.length ; k++){
				if (!lastarr2[k]) {
					tds[k].innerHTML = "";
				}else{
					tds[k].innerHTML = lastarr2[k]
				}
			}
		}
		function rander() {
			var tds = document.getElementsByTagName('td');
			for (var i = tds.length - 1; i >= 0; i--) {
				// 初始化背景色
				tds[i].style.backgroundColor = "#e2f0f3";
				if (tds[i].innerHTML != "") {
					color(tds[i],tds[i].innerHTML)
				}
			}
			// 上色模块
			function color(dom,num) {
				num = parseInt(num)
				function switchcolor(num) {
					switch (num){
						case 2 :
						return "#ADFF2F";
						break;

						case 4 :
						return "#ADD8E6";
						break;

						case 8 :
						return "#9BCD9B";
						break;

						case 16 :
						return "#9932CC";
						break;

						case 32 :
						return "#8A2BE2";
						break;

						case 64 :
						return "#7A378B";
						break;

						case 128 :
						return "#CD1076";
						break;

						case 256 :
						return "#CD8500";
						break;

						case 512 :
						return "#CD2626";
						break;

						case 1024 :
						return "#050505";
						break;

						case 2048 :
						return "#EE0000";
						break;

					}
				}
				dom.style.backgroundColor = switchcolor(num)
			}
		}

		// 游戏性能模块
		//随机生成一个数字 基于空td
		function createonenum() {
			var tds = document.getElementsByTagName('td')
			var emptytd = []
			emptytd.splice(0,emptytd.length);
			for (var i = tds.length - 1; i >= 0; i--) {
				if(tds[i].innerHTML == ""){
					emptytd.push(tds[i])
				}
			}
			if(emptytd.length != 0 ){
				var randomtd = Math.floor(Math.random()*emptytd.length);
				var randomnum = Math.round(Math.random())*2+2
				emptytd[randomtd].innerHTML = randomnum;
			}else{
				if(checkend()){
					var info =document.getElementById('info')
					alert("游戏结束!") ;
				}
			}
		}
		//检测游戏结束  有bug
		function checkend() {
			var check = true;
				var tds = document.getElementsByTagName('td');
				for (var x = tds.length - 1; x >= 0; x--) {
					if (tds[x-1] != undefined) {
						if(tds[x].innerHTML === tds[x-1].innerHTML){
							check = false;
						}
					}
					if (tds[x+1] != undefined) {
						if(tds[x].innerHTML === tds[x+1].innerHTML){
							check = false;
						}
					}
					if (tds[x+4] != undefined) {
						if(tds[x].innerHTML === tds[x+4].innerHTML){
							check = false;
						}
					}
					if (tds[x-4] != undefined) {
						if(tds[x].innerHTML === tds[x-4].innerHTML){
							check = false;
						}
					}
				}
			return check;
		}







	}
})(window.document)