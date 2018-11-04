function Login(){
	this.addListener();
}
$.extend(Login.prototype,{
	//添加事件监听
	addListener(){
		//点击注册
		$(".btn-manager").on("click",this.registerHandler);
	},
	//注册处理
	registerHandler:function(){
		//获取添加管理员的信息
		//post方式
		const data = $(".manager-form").serialize();
		//请求api接口，url
		const url = "/api/users/register";
		//post请求
		$.post(url,data,(data)=>{
			if (data.res_body_status === 1) { // 注册成功 即 用户登录成功
				// 保存登录成功的用户名
				alert("添加管理员成功");
			} else { // 注册失败
				$(".add-post-error").removeClass("hidden");
			}
		},"json");
		return false;//阻止浏览器默认行为(form表单跳转)
	}
});

new Login();
