//引入"User" 的Model
const {User} = require("../model/model.js");

//数据访问层

const UserDao = {
	//保存方法
	save(userinfo){
		// 根据 Model 创建 "document(文档)"
		const user = new User(userinfo); 		
		// 保存到集合中，并返回保存结果的 Promise 对象
		return user.save();
	},
	//查找
	find(condition){
		return User.find(condition);
 	},
	//分页查询的方法
	findByPage(page){
		const pageSize = 5;
		return User.find({}).limit(pageSize).skip((page-1)*pageSize);
	},
	//删除
	remove(id){
		return User.remove({_id:id});
	},
	//修改
	upData(option){
		console.log(option);
		return User.findOneAndUpdate({_id:option.id},option)
	}
}

module.exports = UserDao;
