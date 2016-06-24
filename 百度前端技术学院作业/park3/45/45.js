(function (window,undefined) {
	function Barrel(){
		return new Barrel.prototype.init();
	}

	//在Barrel的prototype下写
	Barrel.prototype={
		init:function (param){
			this.loadNumber= 50;
			this.baseURL = "http://placehold.it/";
			this.minHeight = 200;
			this.sourceImages = [];
			this.draw();
			
		},
		//画图片
		draw:function(){
			this.getImages();
			this.renderRows(this.calcRow());
		},
		getImages:function(){
			var i ,
				width,
				height;
			for ( i = 0; i <this.loadNumber ; i++){
				width = Math.floor(Math.random()*300+300);
				height = Math.floor(Math.random()*30 +300);
				this.sourceImages.push({
					width : width,
					height:height,
					url : this.baseURL + width + "x" + height + "/" + this.randomColor() +"/fff",
					ratio:width /height
				})
			}
		},
		randomColor:function () {
			var rand = Math.floor(Math.random()*0xffffff).toString(16);
			if (rand.length === 6) {
				return rand;
			}else{
				return "000000" ;
			}
		},
		renderRows:function(rows){
			var rowDOM,
				boxDOM,
				oimg,
				i,
				j;

			for(i = 0 ; i <rows.length ; i++){
				console.log(rows[i])
				rowDOM = document.createElement("div");//装整行的
				for( j = rows[i].start ; j<rows[i].end ; j++){
					boxDOM = document.createElement("div");//装单个的
					boxDOM.style.float = "left";
					boxDOM.className = "boxDOMs";
					oimg = document.createElement('img');
					oimg.style.height = rows[i].totalH + "px";
					oimg.src = this.sourceImages[j].url;
					boxDOM.appendChild(oimg);
					rowDOM.appendChild(boxDOM)
				}
				rowDOM.className = "rowDOMs";
				rowDOM.style.height = rows[i].totalH+"px";
				rowDOM.style.width = (window.innerWidth-20) +"px"
				var container = document.getElementById("container");
				container.appendChild(rowDOM);
			}
		},
		calcRow:function(){
			//通过计算的到rows数组，里面包括该行的高和 开始到结束的index
			var startIndex =0,
				endIndex = 0,
				rowHeight = 0,
				width = 0,
				height = this.minHeight,
				rows = [],
				totalW = 0 ,
				totalH = 0,
				i,
				clientW = this.clientW,
				enlargeratio = 0;
				ratio = 0 ;
			for( i =0 ; i<this.sourceImages.length ; i++){
				width =  this.sourceImages[i].ratio * height;
				this.sourceImages[i].width = width ;
				this.sourceImages[i].height = height;
				totalW += width;
				

				if (totalW > (window.innerWidth-20)) {
					totalW -= width;
					ratio = totalW / height;
					totalH =  (window.innerWidth-20) /ratio;
					enlargeratio = totalH / height;
					endIndex = i ;
					rows.push({
						start : startIndex,
						end : endIndex ,
						totalH : totalH,
						enlargeratio : enlargeratio
					})
					startIndex = i+1 ;
					totalW =0;
				}
			}
			console.log(rows);
			return rows;
		}


	}

	  Barrel.prototype.init.prototype = Barrel.prototype;
    window.Barrel = Barrel;
})(window,undefined)