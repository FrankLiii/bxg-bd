define(['jquery','template','until'],function($,template,until){
  // 设置导航菜单选中
  until.setMenu('/course/add');
  // 获取课程ID
  var csId=until.qs('cs_id');
  // 获取操作标志位
  var flag=until.qs('flag');
  $.ajax({
    type:"get",
    url:'/api/course/basic',
    data:{cs_id:csId},
    dataType:'json',
    success:function(data){
      if(flag){
          data.result.opera="课程编辑";
      }else{
          data.result.opera="课程添加";
      }
      var html=template('basicTpl',data.result);
      $('#basicInfo').html(html);
     
    }
  })

})
