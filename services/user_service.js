//引入依赖
const UserDao = require("../dao/users/user_dao.js");

//业务逻辑层
const UserService = {
	//添加
	add(req,res,next){
		//post 方法
		const {username,sex,age,tell,userstyle} = req.body;		
		//发回到数据访问层处理
		UserDao.save({username,sex,age,tell,userstyle})
				.then((data)=>{
					res.json({
						res_code:1,
						res_error:"",
						res_body:{
							status:1,
							message:"success",
							data:data
						}});
				})
				.catch((err)=>{
					res.json({
						res_code:0,
						res_error:err,
						res_body:{
//							status:0,
//							message:"failed"+err,
//							data:{}
							}
						});
				});
		},
	//翻页查询
	findByPage(req,res,next){
		//获取查询页码
		const {page} = req.query;
		//查询指定页码的数据(到dao中操作)
		UserDao.findByPage(page)
					.then((data)=>{
						res.json({
							res_code:1,
							res_error:"",
							res_body:{
								status:1,
								list:data
							}
						})
					})
					.catch((err)=>{
						res.json({
							res_code:1,
							res_error:err,
							res_body:{}
						})
					});
		
	},
	//删除一行数据
	remove(req,res,next){
		//获取查询行数的id的值
		const {id} = req.body;
		UserDao.remove(id)
				.then((data)=>{
					res.json({
						res_code:1,
						res_error:"",
						res_body:{
							data:data
						}
					})
				})
				.catch((err)=>{
					res.json({
						res_code:0,
						res_error:err,
						res_body:{}
					})
				});
	},
	//修改，更新
	upDate(req,res,next){
		const {username,sex,age,tell,userstyle,id} = req.body;	
		
		const option = {username,sex,age,tell,userstyle,id};
		
		UserDao.upDate(option)
					.then((data)=>{
						res.json({
							res_code:1,
							res_error:"",
							res_body:{
								status:1,
								list:data
							}
						})
					})
					.catch((err)=>{
						res.json({
							res_code:1,
							res_error:err,
							res_body:{}
						})
					});
	}
}

module.exports = UserService;
