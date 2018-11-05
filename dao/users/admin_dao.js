//引入"Admin" 的Model
const  {Admin} = require("../model/model.js");

//数据访问层

const AdminDao = {
	//保存方法
	save(admininfo){
		const admin = new Admin(admininfo);
		return admin.save();	//以promise对象返回
	},
	//查找方法
	find(condition){
		return Admin.find(condition);
	},
	//修改密码
	updatePass(option){
		console.log(option);
		return Admin.update({password:option.oriPassword},{password:option.nowPassword})
	}
}

module.exports = AdminDao;
