define(['jquery'],function($){
	return {
		qs : function(key){
			var param=location.search.substr(1);
			var result=null;
			if(param){
				var ps=param.split("&");				
				$.each(ps,function(index,item){
					var ks=item.split('=');
					if(ks[0]==key){
						result=ks[1];
						return false;
					}
				})	
			}
			return result;
			
		}
	}

})
	