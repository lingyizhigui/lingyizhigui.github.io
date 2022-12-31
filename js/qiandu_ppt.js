"use strict";
//设置
var auto = true;
//幻灯片放映相关
var main = document.getElementsByClassName("main");
var dot = document.getElementsByClassName("dot");
var n = 0;
var lastn = n;
var autoplay = setTimeout(function(){
		if(auto == true){next();}
	},5000);
function next(){
	if(n == 6){n = 0}
	else{n++}
	changeimg();
}
function last(){
	if(n == 0){n = 6}
	else{n--}
	changeimg();
}
function changeimg(){
	main[lastn].style.display = "none";
	dot[lastn].style = ""
	main[n].style.display = "block";
	dot[n].style.borderColor = "#333333"
	lastn = n;
	clearTimeout(autoplay);
	autoplay = setTimeout(function(){
		if(auto == true){next();}
	},5000)
}
function set(t){
	n = t;
	changeimg();
}
//图片异步预加载
window.onload = function(){
	let imgUrl = [
		'https://imgsrc.baidu.com/xbai/gq/item/c2cec3fdfc03924583f5e7cbc294a4c27c1e25b5.jpg',
		'https://imgsrc.baidu.com/xbai/gq/item/4a36acaf2edda3cc8018bae444e93901203f9272.jpg',
		'https://imgsrc.baidu.com/xbai/gq/item/4ec2d5628535e5ddf76fa31b33c6a7efcf1b62b6.jpg',
		'https://imgsrc.baidu.com/xbai/gq/item/08f790529822720ecb75e43e3ecb0a46f31fabbf.jpg',
		'https://imgsrc.baidu.com/xbai/gq/item/b8014a90f603738d27f20ae6f61bb051f919ecbe.jpg',
		'https://imgsrc.baidu.com/xbai/gq/item/6159252dd42a2834ef1930cf1eb5c9ea14cebfb3.jpg',
	];
	let imgs = [];
	let preload = document.getElementById("preload");
	for(var i in imgUrl){
		imgs[i] = document.createElement("div");
		imgs[i].style.backgroundImage = "url('"+ imgUrl[i] +"')";
		preload.appendChild(imgs[i]);
	}
}
if(n == 114514){set();last();}//DW别报错