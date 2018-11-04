function Login(){
	this.addListener();
}
$.extend(Login.prototype,{
	//添加事件监听
	addListener(){
		//点击登录
		$(".btn-login").on("click",this.loginHandler);
	},
	//登录处理
	loginHandler(){
		//获取登录的用户名和密码
		const data = $(".loginForm").serialize();
		//请求api接口
		const url = "/api/users/login";
		//发送post 请求
		$.post(url, data, (data)=>{
			if(data.res_body.status === 1){
				//sessionStorage储存用户名信息
				sessionStorage.username = data.res_body.data.username;
				location.href="/index.html";
			}else{
				alert(data.res_body.message);
			}
		},"json");
		return false;//阻止浏览器默认行为(form表单跳转)
	},
});

new Login();
