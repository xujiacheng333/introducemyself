
			//textarea侧栏数字行数
			var order = document.getElementById('order');
			order.onkeyup=function() {
			var count  =  order.value.split(/\n/g).length;
			var rowcount = document.getElementById("rowcount");
			//删除所有子元素
			while(rowcount.hasChildNodes()) 
			   {
			       rowcount.removeChild(rowcount.firstChild);
			   }
			for(var i = 0 ;i<count ; i++){
				var div = document.createElement("div");
				div.innerHTML =  i+1;
				rowcount.appendChild(div);
				rowcount.scrollTop=(div.offsetTop - rowcount.firstChild.offsetTop)-130;
				if (order.value.split(/\n/g)[i].length == 0) {
					div.style.height="20px";
				}else{
					div.style.height=20*(Math.floor(order.value.split(/\n/g)[i].length/20-0.001)+1)+"px";
				}
			}
			}