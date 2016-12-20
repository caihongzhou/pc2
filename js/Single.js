
var Single = angular.module("App_Single", ['ui.router']);
Single.controller('SingleCon', ['$scope', '$http', '$state', function($scope, $http, $state) {
     $scope.firstName =localStorage.getItem("usernume");
   	 $scope.fistPhoto =localStorage.getItem("photoUr");
   	 $scope.singout= function(){
   	 	localStorage.removeItem('user');
   	 
   	 }
   	 $scope.remove = function(){
   	 	localStorage.removeItem("chenge_orderId");
  		localStorage.removeItem("_orderId");
   	 }
  	
 }]);
Single.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/sigleone")
	$stateProvider
		.state("sigleone", {
			url: "/sigleone",
			templateUrl: "tpl/outsungle/basic.html"
		})
		.state("hebao", {
			url: "/hebao",
			templateUrl: "tpl/outsungle/hebao.html"
		})
		.state("siglecar", {
			url: "/siglecar",
			templateUrl: "tpl/outsungle/carinformation.html"
		})
		.state("sigleins", {
			url: "/sigleins",
			templateUrl: "tpl/outsungle/Insurance.html"
		})
		.state("siglebijia", {
			url: "/siglebijia",
			templateUrl: "tpl/outsungle/bijia.html"
		})
		.state("sigleappli", {
			url: "/sigleappli",
			templateUrl: "tpl/outsungle/applicant.html"
		})
		.state("sigleone_2", {
			url: "/sigleone_2",
			templateUrl: "tpl/outsungle/changetowe/basic.html"
		})
			.state("siglecar_2", {
			url: "/siglecar_2",
			templateUrl: "tpl/outsungle/changetowe/carinformation.html"
		})
		.state("sigleins_2", {
			url: "/sigleins_2",
			templateUrl: "tpl/outsungle/changetowe/Insurance.html"
		})
		.state("siglebijia_2", {
			url: "/siglebijia_2",
			templateUrl: "tpl/outsungle/changetowe/bijia.html"
		})
		.state("sigleappli_2", {
			url: "/sigleappli_2",
			templateUrl: "tpl/outsungle/changetowe/applicant.html"
		})
		
});
Single.filter("codelfilter", function() {
	return function(code) {
		switch(code) {
			case 'A':
				return '机动车损失险'
				break;
			case 'MA':
				return '不计免赔机动车损失险'
				break;
			case 'X1':
				return '发动机涉水损失险'
				break;
			case 'Z3':
				return '机动车损失险无法找到第三方特约险'
				break;
			case 'B':
				return '商业第三者责任险'
				break;
				case 'MB':
				return '不计免赔商业第三者责任险'
				break;
			case 'G1':
				return '全车盗抢险'
				break;
			case 'MG1':
				return '不计免赔全车盗抢险'
				break;
			case 'D3':
				return '车上人员责任保险(驾驶员)'
				break;
			case 'MD3':
				return '不计免赔车上人员责任保险(驾驶员)'
				break;
			case 'D4':
				return '车上人员责任保险(乘客)'
				break;
			case 'MD4':
				return '不计免赔车上人员责任保险(乘客)'
				break;
			case 'Q3':
				return '指定修理厂险'
				break;
			case 'Z':
				return '自然损失险'
				break;
			case 'F':
				return '玻璃单独破碎险'
				break;
			case 'L':
				return '车身划痕损失险'
				break;
			case 'ML':
				return '不计免赔车身划痕损失险'
				break;
			case 'FORCEPREMIUM':
				return '交强险'
				break;
			case 'Z2':
				return '修理期间费用补偿险'
				break;

		}

	}
});
Single.filter("amountfilter", function() {
	return function(code) {
		switch(code) {
			case 'Y':
				return '投保'
				break;
			case '投保':
				return '投保'
				break;
			case '10000':
				return '1万'
				break;
			case '20000':
				return '2万'
				break;
			case '30000':
				return '3万'
				break;
			case '40000':
				return '4万'
				break;
			case '50000':
				return '5万'
				break;
			case '100000':
				return '10万'
				break;
			case '150000.00':
				return '15万'
				break;
			case '200000':
				return '20万'
				break;
			case '300000':
				return '30万'
				break;
			case '500000':
				return '50万'
				break;
			case '1000000':
				return '100万'
				break;
			case '1500000':
				return '150万'
				break;
			case '3000000':
				return '300万'
				break;
			case '5000000':
				return '500万'
				break;
			case '2000000':
				return '200万'
				break;
			default:
				return code
				break;
		}

	}
});
Single.filter("flage", function() {
	return function(code) {
		switch(code) {
			case '1':
				return '国产玻璃'
				break;
			case '2':
				return '进口玻璃'
				break;

			default:
				return code
				break;
		}

	}
}); 