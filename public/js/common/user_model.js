function UserModel(){
	this.addListener();
	this.loadData(1);
}
//模态框渲染(modal)

//模板渲染
	UserModel.RowTemplate = `
		<tr>			
            <td><%= _id %></td>
            <td><%= username %></td>
            <td><%= sex %></td>
            <td><%= age %></td>
            <td><%= tell %></td>
            <td><%= userstyle %></td>
            <td>
                <a href="#" class="checkUser"><img src="../images/read.png" alt="查看" title="查看"/></a>
                <a href="#" class="amendUser"><img src="../images/xiugai.png" alt="修改" title="修改"/></a>
                <a href="#" class="removeUser"><img src="../images/schu.png" alt="删除" title="删除"/></a>
            </td>
		</tr>
			`;
$.extend(UserModel.prototype,{	
	//注册事件监听
	addListener(){
		$(".btnAdd").on("click",this.addHandler);
		
		//翻页
		$(".pagination").on("click","a",$.proxy(this.loadDataHandler,this));
		
		//删除(委派方式)
		$(".table-user tbody").on("click",".removeUser",this.removeHandler);
		
		//修改
		$(".table-user tbody").on("click",".amendUser img",$.proxy(this.update,this));
		
		//更新
		$(".btn-edit-password").on("click",this.updatePass);
	},
	
	//点击翻页操作(事件函数)
	loadDataHandler(event){
		const page = Number($(event.target).text());
		this.loadData(page);
		//标签类名
		$(event.target).parent("li").addClass("active").siblings("li").removeClass("active");
	},
	
	//初始加载数据
	loadData(page){
		page =page;
		const url = "/api/users/find_by_page?page="+page;
		//get请求
		$.getJSON(url,(data)=>{
			if(data.res_code === 1){
				let html = "";
				data.res_body.list.forEach((curr)=>{
					html +=ejs.render(UserModel.RowTemplate,curr);
				});
				$(".table-user tbody").html(html);
			}
		});
	},
	
	//添加
	addHandler(){
		var data = $(".adduser-form").serialize();
			data=decodeURIComponent(data,true);
		//请求借口
		const url = "/api/users/adduser";
		//ajax请求
		$.ajax({
			type: "post",
			url: url,
			data: data,
			dataType: "json",
//			processData: false, // 不将 data 数据转换为查询字符串
//			contentType: false, // 不使用默认的 "application/x-www-form-urlencoded"
			success: function(data) {
				if (data.res_code === 1) { // 添加成功，使用 ejs 浏览器端模板渲染
					// data.res_body.data
					// 使用 ejs 模板渲染
					const html = ejs.render(UserModel.RowTemplate, data.res_body.data)
					// 显示
					$(".table-user tbody").append(html);
//					//显示加载第一页
//					this.loadData(1);
					//清除模态框数据
				 	$(this).removeData('#adduserModal');
					// 关闭模态框
					$("#adduserModal").modal("hide");
					
				} else { // 添加失败
					$(".add-user-error").removeClass("hidden");
				}
			}
		});
	},
	//删除
	removeHandler(event){
		const src = event.target;
		const tr = $(src).parents("tr");
		//删除数据库中的数据
		const url = "/api/users/removeuser";
		const data= {id:tr.find("td:first").text()}; //对象形式
		//post请求
		$.post(url, data, (data)=>{
				if (data.res_code === 1) { // 删除成功
					//删除dom数据	
					tr.remove();
					alert("删除成功");
				} else { // 失败					
					alert(data.res_err);
				}
			}, "json")
	},
	//修改,更新(事件操作)
	update(event){
		//显示模态框
		$("#adduserModal").modal("show");
		const src = event.target;
		const id = $(src).parents("tr").find("td:eq(0)").text();
		$(".btnUpdate").on("click",()=>{
			//请求路径
			const url = "/api/users/update";
			//请求的数据
			const data = $(".adduser-form").serialize() + "&id="+id;
			//发送post请求
			$.post(url,data,(data)=>{
				//加载默认的第一页
				this.loadData(1);
//				//清除模态框数据(无用)
//				$('body').on('hidden.bs.modal', '.modal', function () {
//  				$(this).removeData('bs.modal');
//					});
				// 关闭模态框
				$("#adduserModal").modal("hide");				
				});
			});		
	},
	//修改密码
	updatePass(){
		const data = $(".editpassword-form").serialize();
		console.log(data);
		const url = "/api/users/updatePass";
		//post请求
		$.post(url,data,(data)=>{
			if(data.res_code === 1){
				alert("修改成功");
			}else{
				alert("修改失败");
			}
		},"json");
		return false;
	}
});

new UserModel();
