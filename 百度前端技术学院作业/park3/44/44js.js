//每个box 的宽度
var boxW = $(".box")[0].offsetWidth + 16;
//总宽度
var cliW = 0 ;
var mainW = 0 ;
//列数
//列的高度
var cloumns = 0 ;



var cliW = window.innerWidth;
cloumns = Math.floor(cliW/boxW);
//初始化数列cloH;
var cloH = new Array();
cloH.length = cloumns;
for(var i = 0 ; i <cloumns ; i++){
	cloH[i] = 0;
}



mainW = boxW*cloumns;


$("#main").css("width",mainW)




for(var i = 0 ; i<$(".box").length ; i++){
	$(".box")[i].style.left = (sort(cloH).minindex) * boxW +"px";
	$(".box")[i].style.top = (sort(cloH).min) +"px";
	cloH[sort(cloH).minindex] +=  $(".box")[i].offsetHeight + 10;
}

//获得数组中最小的那个数
function sort(arr){
	var minindex = null;
	var min = null;

	arr.forEach(function(value){
		if (min == null) {
			min = value;
		}
		if (value<min) {
			min = value;
		}
	})


	minindex=arr.indexOf(min)
	return {min:min,minindex:minindex}
}


var coverpic;
var coverpicbox;
$(".box").click(function () {
	$("#cover").css({
		"display":"block"
	});

	document.body.style.overflow = "hidden";
	coverpicbox= this
	 coverpic = $(this).children("img")[0]
	// $("#coverpic").append(coverpic)
	$(coverpic).css({
		"width":"500px",
		"height":"400px",
		"left":(cliW-500)/2+"px",
		"top":(window.innerHeight-400)/2+"px",
		"opacity":"1",
		"z-index":"100",
		"position":"fixed"
	})
})






$("#cover").click(function(){
	$(this).css("display","none");
	
	document.body.style.overflow='auto';
	// $(coverpicbox).append(coverpic);
	$(coverpic).css({
		"width": "182px",
		"height": "auto",
		"position":"static"
	})
})