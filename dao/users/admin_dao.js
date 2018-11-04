//引入"Admin" 的Model
const  {Admin} = require("../model/model.js");

//数据访问层

const AdminDao = {
	//保存方法
	save(){
		
	},
	//查找方法
	find(condition){
		return User.find(condition);
	}
}

module.exports = AdminDao;
