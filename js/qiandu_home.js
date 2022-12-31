//var user = localStorage.getItem("qianduuser");
if(localStorage.getItem("qianduimgs") == null){
	localStorage.setItem("qianduimgs","[]");
}
var imgs = JSON.parse(localStorage.getItem("qianduimgs"));
function storage(){
	localStorage.setItem("qianduimgs",JSON.stringify(imgs));
}
var screen = document.getElementById("allimg");
function printimg(){
	screen.innerHTML = "";
	for(let i = 0;i < imgs.length;i++){
		if(imgs[i] == null){continue}
		let div = document.createElement("div");
		div.className = "div";
		div.onclick = function(){printurl(i);};//笔记：声明i时使用let，不然所有i都等于imgs.length
		let img = document.createElement("div");
		img.className = "img";
		let description = document.createElement("strong");
		description.innerHTML = imgs[i][0];
		img.style.backgroundImage = "url('"+ imgs[i][1] +"')";
		//开始添加
		div.appendChild(img);
		div.appendChild(description);
		screen.appendChild(div);
	}
	let n =document.getElementsByClassName("div");
	if(n.length == 0){
		screen.innerHTML = "<span style='color:white;font-size:150%;'>这里空空如也，去<a href='upload.html' style='color:#9292ff'>上传</a>点什么吧</span>";
	}
}
function printurl(n){
	document.getElementById("print").style.display = "block";
	document.getElementById("printdes").innerHTML = imgs[n][0];
	document.getElementById("printurl").value = imgs[n][1];
	let button = document.getElementsByClassName("printbutton");
	button[0].onclick = function(){fullscreem(n)};
	button[1].onclick = function(){delimg(n)};
	document.getElementById("printcopy")
}
function delimg(n){
	document.getElementById("print").style.display = "none";
	imgs[n] = null;
	storage();
	location.reload();
}
function shoudong(n){
	let des = document.getElementById("shoudongdes");
	let url = document.getElementById("shoudongurl");
	if(n){
		if(des.value == ""){des.value = "未命名"}
		imgs[imgs.length] = [des.value,url.value];
		storage();
		printimg();
	}
	document.getElementById("shoudong").style.display = "none";
	des.value = "";
	url.value = "";
}
function daochu(){
	var text = "";
	var n = 0;
	for(let i = 0;i < imgs.length;i++){
		if(imgs[i] == null){continue}
		text += imgs[i][0] +": "+ imgs[i][1] +"\r\n";
		n++
	}
	document.getElementById("daochu").style.display = "block";
	let t = document.getElementById("daochutext")
	if(n == 0){t.innerHTML = "您还没有上传图片！"}
	else{t.innerHTML = text;}
}
function fullscreem(n){
	document.getElementById("print").style.display = "none";
	document.getElementById("fullimg").src = imgs[n][1];
	let screen = document.getElementById("fullscreen")
	screen.style.display = "block";
	screen.onclick = function(){screen.style.display = "none"}
}
printimg();
var background = [
	'https://imgsrc.baidu.com/xbai/gq/item/0e2442a7d933c895a3c39ebf941373f0830200b0.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/c2cec3fdfc03924583f5e7cbc294a4c27c1e25b5.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/4a36acaf2edda3cc8018bae444e93901203f9272.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/4ec2d5628535e5ddf76fa31b33c6a7efcf1b62b6.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/08f790529822720ecb75e43e3ecb0a46f31fabbf.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/b8014a90f603738d27f20ae6f61bb051f919ecbe.jpg',
	'https://imgsrc.baidu.com/xbai/gq/item/6159252dd42a2834ef1930cf1eb5c9ea14cebfb3.jpg',
];
if(imgs.length == 114514){shoudong();daochu();background;}//DW别报错