define(['jquery','template','until'],function($,template,until){
	var tcId=until.qs('tc_id');
	if(tcId){
		// 编辑功能
		$.ajax({
			type:"get",
			url:'/api/teacher/edit',
			data:{tc_id:tcId},
			dataType:"json",
			success:function(data){
				data.result.opera="编辑讲师";
				var html=template('teacherTpl',data.result);
				$("#teacherInfo").html(html);

			}
		})
	}else{
		// 添加功能
		var html=template('teacherTpl',{opera:'添加讲师'});
		$("#teacherInfo").html(html);

	}
	
})