require.config({
	baseUrl:'/public/assets',
	paths:{
		jquery:'jquery/jquery',
		cookie:'jquery-cookie/jquery.cookie',
		template:'artTemplate/template-web',
		bootstrap : 'bootstrap/js/bootstrap.min',
		until:'../js/until',
		common:'../js/common',
		login:'../js/login',
		teacherlist:'../js/teacher-list',
		teacheradd:'../js/teacher-add'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
	
});