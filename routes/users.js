var express = require('express');
var router = express.Router();

const adminService = require("../services/admin_service.js");
const userService = require("../services/user_service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//admin login 完整路径"/api/users/login"
router.post('/login',adminService.login);

//admin register 完整路径"/api/users/register"
router.post('/register',adminService.register);

//admin updatePass  完整路径 "/api/users/updatePass"
router.post('/updatePass',adminService.updatePass);

//manage-user 的完整路径"/api/users/adduser"
router.post('/adduser',userService.add);
	
//按页查询职位 完整路径 "/api/users/find_by_page?page=?"
router.get("/find_by_page",userService.findByPage);

//删除 完整路径"/api/users/removeuser"
router.post("/removeuser",userService.remove);

//修改,更新 完整路径 "/api/users/update"
router.post("/update",userService.upDate);

//注销  完整路径"/api/users/logout"
router.get("/logout",adminService.logout);

module.exports = router;
