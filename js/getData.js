var getDatas = angular.module("App_getData", ['ui.router']);
getDatas.controller('getDataCon', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.firstName = localStorage.getItem("usernume");
	$scope.fistPhoto = localStorage.getItem("photoUr");
	$scope.singout = function() {
		localStorage.removeItem('user');

	};
	$scope.remove = function(){
   	 	localStorage.removeItem("chenge_orderId");
  		localStorage.removeItem("_orderId");
   	 }

}]);
getDatas.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/one")
	$stateProvider
		.state("one", {
			url: "/one",
			templateUrl: "tpl/getData/get.html"
		})
		
	$stateProvider
		.state("sea", {
			url: "/sea",
			templateUrl: "tpl/getData/xian.html"
		})
	.state("lingqu", {
			url: "/lingqu",
			templateUrl: "tpl/getData/lingqu.html"
		})
	.state("basic", {
		url: "/basic",
		templateUrl: "tpl/getData/basic.html"
	})

	.state("applicant", {
			url: "/applicant",
			templateUrl: "tpl/getData/applicant.html"
		})
		.state("carinformation", {
			url: "/carinformation",
			templateUrl: "tpl/getData/carinformation.html"
		})

	.state("Insurance", {
			url: "/Insurance",
			templateUrl: "tpl/getData/bijia.html"
		})
		.state("bijia", {
			url: "/bijia",
			templateUrl: "tpl/getData/Insurance.html"
		})
		.state("newbijia", {
			url: "/newbijia",
			templateUrl: "tpl/getData/newbijia.html"
		})
});

getDatas.controller('getss', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var userId = localStorage.getItem("userId");
	//获取数据 
	fordata.shows()
	$http({
		method: "POST",
		url: intUrl + '/app/customerData/applyCustomerData',
		
		params: {
			"userId": userId
			
		}
	}).
	success(function(res) {
		console.log(res)
		
		
		if(res.flag=="success"){
			fordata.nones()
			var data = res.data;
			$scope._orderId=data.orderId ;
		$scope._name=data.custName  ;
		 $scope.carId = data.cappId ;
		 $scope._phoneNo = data.phoneNo;
		 $scope._cityCode = data.cityCode;
		 $scope._type = data.agentName;
		 $scope._createTime=fordata.formatDate2(data.createTime);
		 
		$scope._licenseNo=data.licenseNo;
		  $scope._frameNo=data.frameNo;
		  $scope._licenseDate =fordata.formatDate(data.licenseDate) ;
		  $scope._insureComName=data.insureComName;
		  $scope._biPremium=data.biPremium;
		 $scope._ciPremium=data.ciPremium 
		}else{
			
			fordata.errors_2(res.msg)
		}
		
		 
		
	}).
	error(function(data, status) {
		
		fordata.errors_2("请求出错，请稍稍后重试")
	});
	$scope.carsid=function(){
		var userId = localStorage.getItem("userId");
		var carid = $scope.carId;
		//console.log(userId,carid)
		localStorage.setItem("_orderId",$scope._orderId)
		localStorage.setItem("carid",$scope.carId)
		//localStorage.setItem("_orderId","ff808181591a324a01591b09bbb5018a")
		
	}
}]);
getDatas.filter("flage_phone", function() {
	return function(code) {
		var s;
		if(code){
			 s = code.substring(0,3)+"****"+code.substring(8,11);
		}
		
		console.log(s)
		return s
	}
}); 