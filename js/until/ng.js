myApp.controller('ng', ['$scope', '$http', '$state', function($scope, $http, $state) {
	
     $scope.firstName =localStorage.getItem("usernume");
   	 $scope.fistPhoto =localStorage.getItem("photoUr");
   	 $scope.singout= function(){
   	 	localStorage.removeItem('user');
   	 	
   	 }
  	$('nav-tabs li').on('click',function(){
  		$(this).addClass('active').siblings('li').removeClass('active');
  		alert($(this).index())
  	})
 }]);