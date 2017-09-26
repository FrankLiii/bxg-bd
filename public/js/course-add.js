define(['jquery','template','until','form'],function($,template,until){
  // 设置侧边菜单选中
  until.setMenu(location.pathname);
  // 绑定表单提交单击事件
  $('#courseBtn').click(function(){
      $('#courseForm').ajaxSubmit({
        type:'post',
        url:'/api/course/create',
        dataType:'json',
        success:function(data){
          if(data.code==200){
            location.href='/course/basic?cs_id='+data.result.cs_id;
           
          }
        }
      })
  })

})
