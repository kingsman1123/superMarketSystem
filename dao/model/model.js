// 引入 "mongoose" 依赖
const mongoose = require('mongoose');
// 连接数据库：database
mongoose.connect('mongodb://localhost/shopmarket');
//管理人员Schema-数据结构
const adminSchema = new mongoose.Schema({
	username: String,
	password: String
});

//用户Schema-数据结构
const userSchema = new mongoose.Schema({
	username: String,
	sex: String,
	age:Number,
	tell:Number,
	userstyle:String
});

//todo

// 管理员-集合：(添加到数据库中)
const Admin = mongoose.model('manager', adminSchema);// 对应 "managers" 集合 

// 用户-集合：(添加到数据库中)
const User = mongoose.model('user', userSchema);// 对应 "users" 集合 


module.exports = {Admin,User};