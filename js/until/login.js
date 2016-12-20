myApp.controller('login', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
 		
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
    var h = {"user":$scope.user.tel,"password":SHA256($scope.user.password)}
      if($scope.agree){
      	localStorage.setItem('user', JSON.stringify(h));
      	
      }
      Interface.loginUser($scope.user.tel,SHA256($scope.user.password))
	 };
  }])
 ;
