function Index(){
	this.init();
}
$.extend(Index.prototype,{
	init(){
		this.loadUser();
		this.timeSetting();
		this.addListener();	
	},
	//加载登录成功之后的信息
	loadUser(){
		const user = sessionStorage.username;
		if(user){//如果存在
			$(".manager-name").html(user);
		}
	},
	//添加事件监听
	addListener(){
		$(".billManage").on("click",this.managerHandler1);
		$(".vendorManage").on("click",this.managerHandler2);
		$(".userManage").on("click",this.managerHandler3);
		$(".addManager").on("click",this.managerHandler4);
		$(".amendPassword").on("click",this.managerHandler5);
		//注销1
		$(".logout").on("click",this.logoutHandler1);
		//注销2
		$(".logoutSetting").on("click",this.logoutHandler2);
	},
	//注销处理1
	logoutHandler1(){
		sessionStorage.removeItem("username");//移除 
		$.getJSON("/api/users/logout",(data)=>{
			if(data.res_body.status === 1){				
				$(".login").removeClass("hidden").next().addClass("hidden");
				$(".manager-name").text("");
//				location.reload();				
			}
		});
	},
	//注销处理2
	logoutHandler2(){
		sessionStorage.removeItem("username");//移除 
		$.getJSON("/api/users/logout",(data)=>{
			if(data.res_body.status === 1){				
			}
		});
	},
	managerHandler1(){
		$(".main-right").load("../../html/include/manage-bill.html",);
	},
	managerHandler2(){
		$(".main-right").load("../../html/include/manage-vendor.html");
	},
	managerHandler3(){
		$(".main-right").load("../../html/include/manage-user.html",()=>{
			$.getScript("/js/common/user_model.js");
		});
	},
	managerHandler4(){
		$(".main-right").load("../../html/include/manage-register.html",()=>{
			$.getScript("/js/common/register_model.js");
		});
	},
	managerHandler5(){
		$(".main-right").load("../../html/include/manage-password.html",()=>{
			$.getScript("/js/common/user_model.js");
		});
	},
	timeSetting(){
		setInterval($.proxy((this.fnDate),this),1);
	},
	fnDate(){
		var time = new Date();	   				
	    var year = time.getFullYear();
	    var mon = time.getMonth()+1;
	    var day = time.getDate();
	    var h = time.getHours();
	    var m = time.getMinutes();
	    var s = time.getSeconds();
	    var week = time.getDay();
	    switch (week){
	        case 0:week="日";
	            break;
	        case 1:week="一";
	            break;
	        case 2:week="二";
	            break;
	        case 3:week="三";
	            break;
	        case 4:week="四";
	            break;
	        case 5:week="五";
	            break;
	        case 6:week="六";
	            break;
	    }
	    var str= "";
	    str = year +"年"+this.fnT(mon)+"月"+this.fnT(day)+"日"+"&nbsp;"+this.fnT(h)+":"+this.fnT(m)+":"+this.fnT(s)+"&nbsp;"+"星期"+week;
	    $("#time").html(str);
		if(h < 6){
			$(".hours").text("凌晨好 ");
		} else if(h < 12){
			$(".hours").text("上午好 ");
		} else if(h < 15){
			$(".hours").text("中午好 ");
		} else if(h < 18){
			$(".hours").text("下午好 ");
		} else if(h < 21){
			$(".hours").text("夜晚好 ");
		} else {
			$(".hours").text("深夜好 ");
		}
	},
	fnT(str){
		var num;
		str>=10?num=str:num="0"+str;
		return num;
		} 
});

new	Index();