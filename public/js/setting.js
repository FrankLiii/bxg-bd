define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'],function($,template,CKEDITOR){
	// 获取数据，渲染页面
	$.ajax({
		type:"get",
		url:"/api/teacher/profile",
		dataType:'json',
		success:function(data){
			var html=template("settingsTpl",data.result);
			$("#settingsInfo").html(html);
			// 上传图片
			$('#upfile').uploadify({
				width:120,
				height:120,
				buttonText:'',
				itemTemplate:"<span></span>",
			 	swf:'/public/assets/uploadify/uploadify.swf',
			 	uploader:'/api/uploader/avatar',
			 	fileObjName:'tc_avatar',
			 	onUploadSuccess:function(a,b){
			 		var obj=JSON.parse(b);
			 		$(".preview img").attr('src',obj.result.path);
			 		
			 	}
			});
			// 处理省市县三级联动
			$("#pcd").region({
				url:"/public/assets/jquery-region/region.json"
			});
			// 富文本插件
			CKEDITOR.replace("editor",{
				toolbarGroups : [
		          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
		        ]
			});
			// 处理表单提交
			$("#settingsForm").validate({
				sendForm:false,
				valid:function(){
					// 拼接籍贯信息
					var p=$("#p").find('option:selected').text();
					var c=$("#c").find('option:selected').text();
					var d=$("#d").find('option:selected').text();
					var hometown=p+'|'+c+'|'+d;
					// 更新富文本内容
					for(var instance in CKEDITOR.instances){
						CKEDITOR.instances[instance].updateElement();
					}
					
					// 提交表单
					$(this).ajaxSubmit({
						type:"post",
						url:"/api/teacher/modify",
						data:{tc_hometown:hometown},
						dataType:'json',
						success:function(data){
							// 刷新当前页面
							if(data.code==200){
								location.reload();
							}
						
						}

					})
				}
			})
		}
	});
});