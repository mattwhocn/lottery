var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;//屏幕的宽高

var particle;//粒子
var particles = []; //新建存放小图片对象的数组
var camera;
var scene;
var starSnow = 1;
var renderer;

function bg_init() {
	//新建一个容器存放canvas标签
	$('body').append($('<div class="canvasContainer"></div>'));

	camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.add(camera);
		
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	var particleImage = new Image();//小图片对象
	particleImage.src = 'img/snow.png'; 
	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );

	for (var i = 0; i < 260; i++) {
		particle = new Particle3D( material);
		particle.position.x = Math.random() * 2000-1000;
		particle.position.z = Math.random() * 2000-1000;
		particle.position.y = Math.random() * 2000-1000;
		particle.scale.x = particle.scale.y = 0.5;
		scene.add( particle );
		particles.push(particle); 
	}
	$('.canvasContainer').append( renderer.domElement );
	//三个touch事件实现滑动背景是让雪花飘动
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	document.addEventListener( 'touchend', onDocumentTouchEnd, false );
	
	setInterval( loop, 1000 / 40 );
}


var touchStartX;
var touchFlag = 0;//储存当前是否滑动的状态;
var touchSensitive = 80;//检测滑动的灵敏度;

function onDocumentTouchStart( event ) {
	if ( event.touches.length == 1 ) {
//		event.preventDefault();//取消默认关联动作;这个地方要是取消默认事件的话，点击事件的默认事件也会被取消
		touchStartX = 0;
		touchStartX = event.touches[ 0 ].pageX ;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		var direction = event.touches[ 0 ].pageX - touchStartX;
		if (Math.abs(direction) > touchSensitive) {
			if (direction>0) {touchFlag = 1;}
			else if (direction<0) {touchFlag = -1;};
		}	
	}
}

function onDocumentTouchEnd (event) {
	// if ( event.touches.length == 0 ) {
	// 	event.preventDefault();
	// 	touchEndX = event.touches[ 0 ].pageX ;
	// 	touchEndY = event.touches[ 0 ].pageY ;
	// }这里存在问题
	var direction = event.changedTouches[ 0 ].pageX - touchStartX;
	changeAndBack(touchFlag);
}

function changeAndBack (touchFlag) {
	var speedX = 20*touchFlag;
	touchFlag = 0;
	for (var i = 0; i < particles.length; i++) {
		particles[i].velocity=new THREE.Vector3(speedX,-10,0);
	}
	var timeOut = setTimeout(";", 800);
	clearTimeout(timeOut);

	var clearI = setInterval(function () {
		if (touchFlag) {
			clearInterval(clearI);
			return;
		};
		speedX*=0.8;
		if (Math.abs(speedX)<=1.5) {
			speedX=0;
			clearInterval(clearI);
		};
		for (var i = 0; i < particles.length; i++) {
			particles[i].velocity=new THREE.Vector3(speedX,-10,0);
		}
	},100);
}

//定时器的函数，每次循环执行这个函数
function loop() {
	for(var i = 0; i<particles.length; i++){
		var particle = particles[i]; 
		particle.updatePhysics(); 
		with(particle.position)
		{
			if((y<-1000)&&starSnow) {y+=2000;}
			if(x>1000) x-=2000; 
			else if(x<-1000) x+=2000;
			if(z>1000) z-=2000; 
			else if(z<-1000) z+=2000;
		}			
	}
	camera.lookAt(scene.position); 
	renderer.render( scene, camera );
}