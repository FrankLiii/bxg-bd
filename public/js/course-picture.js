define(['jquery','template','until','uploadify'],function($,template,until){
  // 设置导航菜单选中
  until.setMenu('/course/add');
  // 获取cs_id
  var csId=until.qs("cs_id");
  $.ajax({
    type:'get',
    url:'/api/course/picture',
    data:{cs_id:csId},
    dataType:"json",
    success:function(data){
      var html=template('pictureTpl',data.result);
      $("#pictureInfo").html(html);


      // 处理封面上传
      $('#myfile').uploadify({
        width:80,
        height:'auto',
        itemTemplate:'<span></span>',
        buttonText:'选择图片',
        buttonClass:'btn btn-success btn-sm',
        swf:'/public/assets/uploadify/uploadify.swf',
        uploader:"/api//uploader/cover",
        fileObjName:'cs_cover_original',
        formData:{cs_id:csId},
        onUploadSuccess:function(a,b,c){
          var obj=JSON.parse(b.trim());
          $('.preview img').attr('src',obj.result.path);
        }
      })
    }

  })
})
