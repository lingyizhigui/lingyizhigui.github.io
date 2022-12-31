		"use strict"
alert("已推出全新版本！仅为留念")
/*
var a = document.getElementById("imginput")
var form = document.getElementById("form");
form.onsubmit = function(e){
	e.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open("POST","https://sp0.baidu.com/6_R1fD_bAAd3otqbppnN2DJv/Pic/upload?pid=super&app=skin",true);
		xhr.withCredentials = true;
		var data = new FormData(form);
		xhr.send(data);
		xhr.onreadystatechange=function()
{
    if (xhr.readyState==4 && xhr.status==200){
		console.log(xhr.responseText);
		var answer = JSON.parse(xhr.responseText);
		let print = document.getElementById("result");
		if(answer.err_no != 0){print.value = "错误！错误原因：" + answer.err_msg}
    }
}}

var tuo = document.getElementById("uploaddiv")
tuo.addEventListener("dragover", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
		tuo.addEventListener("dragenter", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
tuo.addEventListener("drop",function(e){
	e.preventDefault()
	e.stopPropagation()
	console.log(e.dataTransfer.files);
	a.files = e.dataTransfer.files;
})
*/
		//两个imput按下enter触发
		document.getElementById("double").addEventListener("keyup",function(event){
			event.preventDefault();
			if(event.keyCode == 13){
				cut();
			}
		})
		function enteradd(a){
			a.addEventListener("keyup",function(event){
			event.preventDefault();
			if(event.keyCode == 13){addurl();}
			})
		}
		enteradd(document.getElementById("des"));
		enteradd(document.getElementById("url"));
		//help相关的监听
		window.addEventListener("click",function(){
			closeHelp();
		});
		document.getElementById("help").addEventListener("click",function(event){
			event.stopPropagation();
		});//防止点div冒泡到window
		//用监听代替onclick属性
		function helpbutton() {
			var helpButton = document.getElementsByClassName("openhelp");
			for(let i = 0;i < helpButton.length;i++){
				helpButton[i].addEventListener("click",function(event){
					event.stopPropagation();
					document.getElementById("help").style.visibility = "visible";
				});
			}
		}
		//添加监听结束，开始功能函数
		var allHistory = JSON.parse(localStorage.getItem("qianduhistory"));
		if(allHistory == null){
			localStorage.setItem("qianduhistory","[]")
			allHistory = JSON.parse(localStorage.getItem("qianduhistory"));
		}
		function printurl(){
			/*
			let result = "<table border=1 ><tr><td>描述</td><td>静态网址</td></tr>";
			for(let i = 0;i<localStorage.length;i++){
				let description = localStorage.key(i);
				let url = localStorage.getItem(description);
				result += "<tr><td>" + description + "</td><td><a id='url" + i + "' target='_blank' href='" + url + "'>" + url + "</a><button class='copy' onClick='copy(" + i + ")'>一键复制</button></td></tr>";
				}
			result +="</table>";
			document.getElementById("list").innerHTML = result;
			*/
			let table = document.getElementById("table");
			table.innerHTML = "<tr><td>描述</td><td>网址</td></tr>";
			//本地为空时添加示例
			let n = allHistory.length;
			if(n == 0){
				allHistory[0] = {des:"AI绘图（示例）",url:"https://imgsrc.baidu.com/super/pic/item/fd039245d688d43f62100131381ed21b0ff43bbc.jpg"};
				localStorage.setItem("qianduhistory",JSON.stringify(allHistory));
			}
			for(let i = 0;i < allHistory.length;i++){
				if(allHistory[i] == undefined){continue}//跳过空数据
				//添加下一行表格
				let newLine = table.insertRow();
				let description = newLine.insertCell();
				let tableUrl = newLine.insertCell();
				//给表格注入内容和复制删除标签
				let des = allHistory[i].des;
				let url = allHistory[i].url;
				description.innerHTML = des;
				tableUrl.innerHTML = '<a target="_blank" id=url'+ i +' href="'+ url +'">'+ url +'<a/>';
				let button = document.createElement("button");
				button.innerHTML = "一键复制";
				button.className = "copy";
				button.onclick = function(){console.log(i);copy(i);}
				tableUrl.appendChild(button);
				//不给示例添加删除字样
				if(i != 0){
					let shanchu = document.createElement("a");
					shanchu.innerHTML = "删除";
					shanchu.href = "javascript:void(0)";
					shanchu.className = "delete"
					shanchu.onclick = function(){deleteitem(des)};
					description.insertBefore(shanchu,description.firstChild);
				}
			}
			//第一种出现了令人满头大汗的长字符串，第二种方法对DOM的要求更高，不过结果是一样的。
		}
		function addurl(){
			let description = document.getElementById("des").value;
			let url = document.getElementById("url").value;
			var cunzai = false;
			for(let i = 0;i<allHistory.length;i++){
				if(allHistory[i] == undefined){continue}//跳过空数据
				let des = allHistory[i].des;
				if(description == des){
				cunzai = true;
				}
			}
			if (description == ""||url == ""){
				document.getElementById("result").innerHTML = "不能为空，请重试";
			}
			else{
				if(cunzai == true){
					document.getElementById("result").innerHTML = "描述已存在，请重试";
				}
				else{
					allHistory[allHistory.length] = {des:description,url:url};
					localStorage.setItem("qianduhistory",JSON.stringify(allHistory))
					document.getElementById("result").innerHTML = "添加成功";
					printurl();
				}
			}
		}
		function deleteitem(miaoshu){
			let a = confirm('您的数据将无法找回！您确定要删除记录"'+ miaoshu +'"吗？');
			if(a == true){
				for(let i = 0;i < allHistory.length;i++){
					if(allHistory[i] == undefined){continue}//跳过空数据
					if(allHistory[i].des == miaoshu){
						allHistory[i] = undefined;
						localStorage.setItem("qianduhistory",JSON.stringify(allHistory));
						break;
					}
				}
				printurl();
			}
			
		}
		function cut(){
			const old = document.getElementById("double").value;
			let haveCut = old;
			if(old == ""){
				document.getElementById("besturl").innerHTML = "不能为空，请重试";
			}
			else{
				if(old == "神秘代码"){
					document.getElementById("yingcang").style.display = "block"
				}
				else{
					if(haveCut.indexOf("http:") == -1){
						document.getElementById("besturl").innerHTML = '请输入正确格式（参考<a href="#help" class="openhelp">使用说明</a>）';
						helpbutton();//新按钮添加监听
				}
					else{
						haveCut = haveCut.replace(/\\/g,"");
						let place1 = haveCut.indexOf("http:") + 4;
						let place2 = haveCut.length - 3;
						let url = haveCut.substring(place1,place2);
						document.getElementById("besturl").innerHTML ='<a target="_blank" href="https' + url +'">https' + url + '</a>';
						document.getElementById("url").value = "https" + url;
				}
				}

			}
		}
		function closeHelp(){
			document.getElementById("help").style.visibility = "hidden";
		}
		function copy(n){
			let textValue = document.createElement('textarea');
			textValue.setAttribute('readonly','readonly');
			textValue.value = document.getElementById("url" + n).firstChild.nodeValue;
			document.body.appendChild(textValue);
			textValue.select();
			document.execCommand('copy');
			document.body.removeChild(textValue);
			let button = document.getElementsByClassName("copy");
			button[n].innerHTML = "复制成功";
			setTimeout(function(){button[n].innerHTML = "一键复制"},2000);
		}
		function clearall(){
			let a = confirm("此操作将无法撤销！您确定要执行“删除全部”吗？（仅保留示例图片）");
			if(a == true){
				allHistory = [];
				localStorage.setItem("qianduhistory","[]")
				printurl();
			}
		}
		printurl();helpbutton();//调用函数要放到函数定义好后
		if(localStorage.length == 114514){addurl();copy();cut();closeHelp();clearall();}//让逆天的DW别报错