//引入依赖
const AdminDao = require("../dao/users/admin_dao.js");

//业务逻辑层
const AdminService = {
	//注册
	register(req,res,next){
		//post 方法
		const {username,password} = req.body;		
		//发回到数据访问层处理
		AdminDao.save({username,password})
				.then((data)=>{
					res.json({
						res_code:1,
						res_error:"",
						res_data:{
							status:1,
							message:"success",
							data:{
								username:data.username
							}
						}
					});
				})
				.catch((err)=>{
					res.json({
						res_code:1,
						res_error:"",
						res_data:{
							status:0,
							message:"failed"+err,
							data:{}
						}
					});
				});
	},
	//登录处理
	login(req,res,next){
		//get方式
//		const {} = req.query;
		//post方式获得请求数据
		const {username,password} = req.body;		
		//发回到数据访问层处理
		AdminDao.find({username})
				.then((data)=>{
					if(data.length ===1){//存在对象
						if(password === data[0].password) {//密码正确
							res.json({
								res_code:1,
								res_error:"",
								res_body:{
									status:1,
									message:"登录成功",
									data:{
										username:data[0].username//返回的第一个对象的数据(用户名)
									}
										}
								});
							}else{
								res.json({
									res_code:1,
									res_error:"",
									res_body:{
										status:0,
										message:"密码错误",
										data:{}
									}
								});
							}
						}else{//不存在对象
							res.json({
								res_code:1,
								res_error:"",
								res_body:{
									status:0,
									message:"用户名不存在",
									data:{}
								}	
							});							
						}
				})				
				.catch((err)=>{//捕获错误
					res.json({
						res_code:0,
						res_error:"",
						res_data:{
							
						}
					});
				});
	},
	//更新密码
	updatePass(req,res,next){
		const {oriPassword,nowPassword,confPassword} = req.body;
		const option = {oriPassword,nowPassword,confPassword};
		
		AdminDao.updatePass(option)
				.then((data)=>{
					res.json({
						res_code:1,
						res_error:"",
						res_body:{password:option.nowPassword}
					})
				})
				.catch((err)=>{
					res.json({
						res_code:0,
						res_error:err,
						res_body:{}						
					});
				});
	},
	//注销
	logout(req,res,next){
		username = null;
		res.json({
			res_code:1,
			res_error:"",
			res_body:{
				status:1
			}
		});
	}
	
}
module.exports = AdminService;
