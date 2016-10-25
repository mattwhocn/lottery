$(function (){
	var rotateTimeOut = function (){
		$('#rotate').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;

	var rotateFn = function (awards, angles, txt){
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){
				/*alert(txt);*/
				swal({title: "获得"+txt+"红包",imageUrl: "img/gx.png" });
				
				
				bRotate = !bRotate;
			}
		})
	};
	
	//键盘的enter事件执行的函数
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==32){ //enter 键
			$('showSweetAlert').css("display","none");
			$('sweet-overlay').css("display","none");
			if(bRotate)return;
		}
	};
	
	$('.pointer').click(function (){
		//在点击事件里面，先随机出一个数字，根据随机的数字执行case分支，并显示相应的中奖金额
		if(bRotate)return;//如果已经旋转过了就不在执行这个函数
		var item = rnd(1,8);

		switch (item) {
			case 1:
				//var angle = [26, 88, 137, 185, 235, 287, 337];
				rotateFn(1, 30, '1元');
				break;
			case 2:
				//var angle = [88, 137, 185, 235, 287];
				rotateFn(2, 70, '2元');
				break;
			case 3:
				//var angle = [137, 185, 235, 287];
				rotateFn(3, 110, '3元');
				break;
			case 4:
				//var angle = [137, 185, 235, 287];
				rotateFn(4, 170, '4元');
				break;
			case 5:
				//var angle = [185, 235, 287];
				rotateFn(5, 190, '5元');
				break;
			case 6:
				//var angle = [137, 185, 235, 287];
				rotateFn(6, 250, '6元');
				break;
			case 7:
				//var angle = [137, 185, 235, 287];
				rotateFn(7, 280, '7元');
				break;
			case 8:
				//var angle = [185, 235, 287];
				rotateFn(8, 345, '8元');
				break;
		}
		console.log(item);
	});
});

//随机数函数
function rnd(n, m){
	return Math.floor(Math.random()*(m-n+1)+n)
}