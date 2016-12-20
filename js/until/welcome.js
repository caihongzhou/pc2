myApp.controller('welcome', ['$scope', '$http', '$state', function($scope, $http, $state) {
      $scope.fistPhoto = localStorage.getItem("photoUr");
     $scope.firstName = localStorage.getItem("usernume");
   	
   	 $scope.singout= function(){
   	 	localStorage.removeItem('userId');
   	 	localStorage.removeItem('user');
   	 	localStorage.removeItem('photoUr');
   	 	
   	 	localStorage.removeItem('usernume');
   	 }
  	$('nav-tabs li').on('click',function(){
  		$(this).addClass('active').siblings('li').removeClass('active');
  	
  	})
  	$scope.remove=function(){
  		localStorage.removeItem('chenge_orderId');
  	}
 }]);