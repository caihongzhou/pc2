myApp.controller('forgot', ['$scope', '$http', '$state', function($scope, $http, $state) {
   
    $scope.huoqu = function() {
    	if($('#inputphone').val()!=""){
    		Interface.forgot($scope.user.tel);//ajax
    		var time = 10;
    	var s=setInterval(function(){
    			time--
    			$('#code').val(time+"s后重发")
    			console.log(s)
    			if(time<=0){
    				$('#code').val("获取验证码");
    				$('#code').removeAttr("disabled");
    				clearInterval(s)
    				return
    			}
    			
    		},1000)
    		$('#code').attr('disabled',"disabled");
    	}	
     	
	 };
	 
	 $scope.Modify = function() {
    	if($('#one').val()==$('#tow').val()){
    		Interface.Modify($scope.user.tel,$scope.user.code,SHA256($scope.user.password))
    	}else{
    		$('.tishi').removeClass('hidden')
			$('.tishi').text("两次密码不同，请重试");
    	}
     	
	 };
 }]);
 