define(['jquery','template','until','datepicker','language','validate','form'],function($,template,until){
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
				submitForm("/api/teacher/update");
			}
		})
	}else{
		// 添加功能
		var html=template('teacherTpl',{opera:'添加讲师'});
		$("#teacherInfo").html(html);
		submitForm('/api/teacher/add');
	}


	// // // 利用插件实现表单验证与表单提交
    function submitForm(url){
    	$("#teacherForm").validate({
    		sendForm:false,
    		valid:function(){
    			
    			$(this).ajaxSubmit({
    				type:"post",
    				url:url,
    				dataType:"json",
    				success:function(data){
    					if(data.code==200){
    						location.href="/teacher/list";
    					}
    				}
    			});
    		},
    		description:{
    			tcName:{
    				required:"用户名不能为空"
    			},
    			tcPass:{
    				required:"密码不能为空",
    				pattern:'密码必须为6位数字'
    			},
    			tcJoinDate:{
    				required:'日期不能为空'
    			}

    		}

    	});
    };








	// 实现表单提交
	// function submitForm(url){
	// 	$("#teacherBtn").click(function(){
	// 		$.ajax({
	// 			type:"post",
	// 			url:url,
	// 			data:$("#teacherForm").serialize(),
	// 			dataType:'json',
	// 			success:function(data){
	// 				if(data.code==200){
	// 					location.href="/teacher/list";
	// 				}
	// 			}
	// 		})
			
	// 	})
		
	// }
	
})