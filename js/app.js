
var myApp = angular.module("App", ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
	var user =localStorage.getItem('user');
	
	if(user == "null"||user == null||user == ""){
		
		 $urlRouterProvider.when("", "/lo");
		 
	}else{
		var users =JSON.parse(user)
		Interface.loginUser(users.user,users.password)
		//$urlRouterProvider.otherwise("/lo");
		 $urlRouterProvider.when("", "/lo");
		// Interface.lodhtmlTop();
	}
	$stateProvider
		.state("welocme", {
			url: "/welocme",
			templateUrl: "tpl/welcome.html"
		})
		.state("lo", {
			url: "/lo",
			templateUrl: "tpl/loging.html"
		})
		.state("register", {
			url: "/register",
			templateUrl: "tpl/Forgot.html"
		})
});
 
 