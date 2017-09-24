require.config({
	baseUrl:'/public/assets',
	paths:{
		jquery:'jquery/jquery',
		cookie:'jquery-cookie/jquery.cookie',
		template:'artTemplate/template-web',
		bootstrap : 'bootstrap/js/bootstrap.min',
		datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
		language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate:"validate/jquery-validate",
		form:"jquery-form/jquery.form",
		uploadify:'uploadify/jquery.uploadify.min',
		region:'jquery-region/jquery.region',
		until:'../js/until',
		common:'../js/common',
		login:'../js/login',
		teacherlist:'../js/teacher-list',
		teacheradd:'../js/teacher-add',
		settings:"../js/setting"

	},
	shim:{
		bootstrap:{
			deps:['jquery']
		},
		language:{
			deps:['jquery','datepicker']
		},
		validate:{
			deps:['jquery']
		},
		uploadify:{
			deps:['jquery']
		}
	}
	
});