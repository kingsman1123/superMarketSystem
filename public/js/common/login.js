function Login(){
	this.addListener();
}
$.extend(Login.prototype,{
	addListener(){
		$(".btn-login").on("click",this.loginHandler);
	},
	loginHandler(){
		const data = $(".loginForm").serialize();
		console.log(data);	
		return false;
	}
});

new Login();
