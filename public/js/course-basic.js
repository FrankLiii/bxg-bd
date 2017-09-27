define(['jquery','template','until','ckeditor','validate','form'],function($,template,until,CKEDITOR){
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
      // 处理二级分类的下拉联动
      $("#firstType").change(function(){
        // 获取一级分类的cg_id;
          var pid=$(this).val();
         // 根据一级分类查询二级分类数据
         $.ajax({
          type:'get',
          url:'/api/category/child',
          data:{cg_id:pid},
          dataType:'json',
          success:function(data){
            // 
            var tpl='<option value="">请选择二级分类</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}'
            var html=template.render(tpl,{list:data.result}) ;
            $("#secondType").html(html);
          }
         })
      });
      // 处理富文本}
      CKEDITOR.replace('editor',{
        toolbarGroups : [
              { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
            ]   
      });
      // 处理表单提交
      $('#basicForm').validate({
        sendForm:false,
        valid:function(){
          // 处理富文本同步
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          // 提交表单
          $(this).ajaxSubmit({
            type:'post',
            url:'/api/course/update/basic',
            dataType:'json',
            data:{cs_id:csId},
            success:function(data){
              location.href="/course/picture?cs_id="+data.result.cs_id;
            }
          })
        }
      })
    }
  });
});
