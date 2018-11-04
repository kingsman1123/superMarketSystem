//引入依赖
const AdminDao = require("../dao/users/admin_dao.js");

//业务逻辑层
const AdminService = {
	//登录处理
	login(req,res,next){
		//post 请求
		const {username,password} = res.body;
		
		//数据访问
		AdminDao.find({username})
				.then()
				.catch();
	},
	//注册
	register(req,res,next){
		//post 方法
		const {username,password} = res.body;
		
		//发回到数据访问层处理
		AdminDao.save({username,password})
				.then()
				.catch();
	}
}

module.exports = AdminService;
