var express = require('express');
var router = express.Router();

const adminService = require("../services/admin_service.js");
const userService = require("../services/user_service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//login 完整路径"/api/users/login"
	router.post('/login',adminService.login);
	
//manage-user 的完整路径"/api/users/adduser"
	router.post('/adduser',userService.add);
	
//按页查询职位
// 完整路径 "/api/users/find_by_page?page=?"
router.get("/find_by_page",userService.findByPage);

//删除 完整路径"/api/users/removeuser"
router.post("/removeuser",userService.remove);
//修改
router.post("/updata",userService.upData);
module.exports = router;
