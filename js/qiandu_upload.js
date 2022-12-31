var form = document.getElementById("form");
var input = document.getElementById("imginput");
var tuoz = document.getElementById("upload");
var imgdes = "";
if(localStorage.getItem("qianduimgs") == null){
	localStorage.setItem("qianduimgs","[]");
	document.getElementById("signin").style.display = "block";
}
var imgs = JSON.parse(localStorage.getItem("qianduimgs"));
function storage(){
	localStorage.setItem("qianduimgs",JSON.stringify(imgs));
}
//图片选择相关
let img = input.files[0];
input.onchange = function(){inputchanged()}
function inputchanged(){
	let sub = document.getElementsByClassName("button")[1];
	if(input.files.length != 1){
		error("请选择且只选择一张图片");
		sub.style = "opacity: 0.5;cursor: not-allowed";
		document.getElementById("imgname").innerHTML = "";
		document.getElementById("imgsize").innerHTML = "";
	}
	else{
		img = input.files[0];
		let size = img.size / 1024;
		let imgsize = document.getElementById("imgsize");
		document.getElementById("imgname").innerHTML = img.name;
		imgdes = img.name;
		sub.style = "";sub.title = "";
		imgsize.style = "";
		if(size <= 1024){
			imgsize.innerHTML = size.toFixed(1) + "KB";
		}
		else{
			size = size / 1024;
			imgsize.innerHTML = size.toFixed(1) + "MB";
			if(size > 20){
				error("必须20MB以下");
				imgsize.style.color = "red";
			}
		}
	}
}
//拖拽上传
tuoz.addEventListener("dragover",function(e){
	e.preventDefault();
	e.stopPropagation();
})
tuoz.addEventListener("dragenter",function(e){
	e.preventDefault();
	e.stopPropagation();
})
tuoz.addEventListener("drop",function(e){
	e.preventDefault();
	e.stopPropagation();
	input.files = e.dataTransfer.files;
	inputchanged();
})
//发送请求
function submit(){
	if(input.files.length == 0){error("请先选择文件")}
	else{
		if(input.files[0].size > 20971520){error("图片大于20MB，请重新上传")}
		else{
			if(input.files[0].type.includes("image/")){finalsub()}
				else{error("请上传格式为图片的文件！后缀如.jpg.png.gif.webm等")}
		}
	}
}
function finalsub(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST","https://sp0.baidu.com/6_R1fD_bAAd3otqbppnN2DJv/Pic/upload?pid=super&app=skin",true);
//xhr.setRequestHeader("Cookie","BDUSS=l5S1ZHSFAtaDBCY1hnOGpiaENQc2MzOX4wS0V6S2RVWTlvQlQxQnFVQUhwTkJqRVFBQUFBJCQAAAAAAAAAAAEAAABzaLFatfLB6bvqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcXqWMHF6ljQX")
	//上面那条，W3C不允许在header中自定义Cookie
	xhr.withCredentials = true;//只能用这个传baidu.com的cookie
	let data = new FormData(form);
	xhr.send(data);
	let chaoshi = setTimeout(function(){error("上传超时。这个情况比较复杂，<a href='help.html#chaoshi'>了解解决方案</a>")},3000)
	xhr.onreadystatechange = function(){
		log("xhr状态"+ xhr.readyState +"连接状态"+ xhr.status)
		if (xhr.readyState==4 && xhr.status==200){
			clearTimeout(chaoshi);
			let answer = JSON.parse(xhr.responseText);
			if(answer.err_no != 0){
				if(answer.err_msg == "anonymous user"){
					document.getElementById("signin").style.display = "block";
				}
				if(answer.err_msg == "pic upload fail"){
					error("连接成功，但文件上传失败！请重试或者联系i@smallbai.gq反馈")
				}
			}
			else{
				//确认是否保存
				let url = "https://imgsrc.baidu.com/xbai/gq/" + answer.data.pic_water.slice(-49);
				document.getElementById("urldiv").style.display = "block";
				let input = document.getElementsByClassName("urlinput");
				input[0].value = imgdes;
				input[1].value = url;
			}
		}
	}
}
//添加到本地
function addurl(){
	let input = document.getElementsByClassName("urlinput");
	if(input[0].value == ""){input[0].value = "未命名"}
	imgs[imgs.length] = [input[0].value,input[1].value];
	storage();
	location.href = "home.html"
}
//报错相关
let div = document.getElementById("errordiv");
function error(e,unkown = false){
	div.style.display = "block";
	if(unkown){div.firstElementChild.innerHTML = "不好，是未知错误！";}
	else{
		div.firstElementChild.innerHTML = "Error！";
		document.getElementById("error").innerHTML = e;
	}
}
function closeerror(){
	document.getElementById("errordiv").style.display = "none";
}
/*
//顺便加上点击空白处关闭报错
window.addEventListener("click",function(){closeerror()});
function StopPropagate(h){
	h.addEventListener("click",function(e){e.stopPropagation()})
}
StopPropagate(document.getElementById("errordiv"));
StopPropagate(document.getElementsByClassName("button")[1])
*/
function log(txt){console.log(txt)}
if(imgs.length == 114514){closeerror();log();submit();addurl()}//DW别报错