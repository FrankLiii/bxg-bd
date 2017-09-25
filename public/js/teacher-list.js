define(['jquery','template','until','bootstrap'],function($,template,until){
	// 设置导航菜单选中
	until.setMenu(location.pathname);
	$.ajax({
		type:'get',
		url:'/api/teacher',
		dataType:'json',
		success:function(data){
			// 解析数据 渲染页面
			var html=template('teacherTpl',{list:data.result});
			$('#teacherInfo').html(html);

			// 启用注销功能
			$(".eod").click(function(){
				var that=this;
				var td=$(this).closest("td");
				var tcId=td.attr("data-tcId");
				var status=td.attr("data-status");
				$.ajax({
					type:"post",
					url:"/api/teacher/handle",
					dataType:'json',
					data:{tc_id:tcId,tc_status:status},
					success:function(data){
						if(data.code==200){
							td.attr('data-status',data.result.tc_status);

							if(data.result.tc_status==0){
								$(that).text("注销");
							}else{
								$(that).text("启用");
							}
						}	
					}

				})
			})
			// 查看功能
			$(".preview").click(function(){
				var td=$(this).closest("td");
				var tcId=td.attr("data-tcId");
				$.ajax({
					type:"get",
					url:"/api/teacher/view",
					dataType:"json",
					data:{tc_id:tcId},
					success:function(data){
						var html=template("modalTpl",data.result);
						$("#modalInfo").html(html);
						$("#teacherModal").modal();
					}
				})
			})

		}
	})
	
})