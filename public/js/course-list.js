define(['jquery','template','until'],function($,template,until){
	// 设置侧边菜单选中
	until.setMenu(location.pathname)
	$.ajax({
		type:'get',
		url:'/api/course',
		dataType:'json',
		success:function(data){
			var html=template('courseTpl',{list:data.result});
			$('#courseInfo').html(html);
		}
	})
})