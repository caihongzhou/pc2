var Order = angular.module("App_Order", ['ui.router']);
Order.controller('OrderCon', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.firstName = localStorage.getItem("usernume");
	$scope.fistPhoto = localStorage.getItem("photoUr");
	var userId = localStorage.getItem("userId");
	$scope.singout = function() {
		localStorage.removeItem('user');

	};
	$scope.ver = function(item,items, data) {
		localStorage.setItem("_orderId", item);
		localStorage.setItem("_orderStatus", items);
	};
	$scope.remove = function(){
   	 	localStorage.removeItem("chenge_orderId");
  		localStorage.removeItem("_orderId");
   	};

}]);
Order.controller('sosuo', ['$scope', '$http', '$state', function($scope, $http, $state) {

}]);
Order.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/myorder")
	$stateProvider
		.state("myorder", {
			url: "/myorder",
			templateUrl: "tpl/myorder/myorder.html"
		})

	.state("finished", {
		url: "/finished",
		templateUrl: "tpl/myorder/finished.html"
	})

	.state("nopaid", {
			url: "/nopaid",
			templateUrl: "tpl/myorder/nopaid.html"
		})
		.state("unfinished", {
			url: "/unfinished",
			templateUrl: "tpl/myorder/unfinished.html"
		})

});

Order.controller('alldata', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var userId = localStorage.getItem("userId")
	fordata.shows();
	$http({
		method: "POST",

		url: intUrl + '/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderStatus": "ALL",

		}
	}).
	success(function(res) {
		console.log(res)

		if(res.flag == "success") {
			if(res.data.pageVO.recordCount == 0) {
					fordata.errors_2('暂无订单');
			} else {
				fordata.nones();
				findlist = res.data.list;
				$scope.data = findlist;
				listss = res.data.list;
				numb = Math.ceil(res.data.pageVO.recordCount / 10);
				console.log(numb)

			}

		}else{
			fordata.errors_2(res.msg);
		}

	}).
	error(function(data, status) {
		fordata.errors_2("请求出错，请稍稍后重试");
	});
	var n = 1;
	var s_n = 1;
	$scope.fst = function() {

		morelist(1);
	}
	$scope.last = function() {
		morelist(numb);
	}
	$scope.up = function() {
		n--;
		console.log(n)
		if(n < 0) {
			
			fordata.errors_2("已经是第一页数据了亲~");
		} else {
			morelist(n);
		}
	}
	$scope.dowen = function() {

			n++;
			console.log(n)
			if(n > numb) {
				
				fordata.errors_2("已经是最后一页数据了亲~");
			} else {
				morelist(n);
			}
		}
		//条件搜索
	$scope.sta = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_startDate = val
			}
		})
	}
	$scope.endDate = function() {
		jeDate({
			dateCell: '#datebut2',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_endDate = val
			}
		})
	}
	$scope.yuyue = function() {
		jeDate({
			dateCell: '#datebut3',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				//$scope.s_endDate=val
				alert("预约时间")
				
			}
		})
	}
	$scope.sos = function() {
		$('.pa').css("display", 'none');
		$('.pa2').css("display", 'block');
		//$('#datebut1').text()
		console.log($scope.s_startDate)
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": 1
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2("暂无订单");
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;
					s_numb = Math.ceil(res.data.pageVO.recordCount / 10);
					console.log(s_numb)
				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2("请求出错，请稍稍后重试");
		});

	}

	$scope.s_fst = function() {

		s_morelist(1);
	}
	$scope.s_last = function() {
		s_morelist(s_numb);
	}
	$scope.s_up = function() {
		s_n--;
		console.log(s_n)
		if(s_n < 0) {
			
			
			fordata.errors_2("已经是第一页数据了亲~");
		} else {
			s_morelist(s_n);
		}
	}
	$scope.s_dowen = function() {

		s_n++;
		console.log(s_n)
		if(s_n > s_numb) {
			
			fordata.errors_2("已经是最后一页数据了亲~");
		} else {
			s_morelist(s_n);
		}
	}

	function morelist(n) {
	fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderStatus": "ALL",
				"pageSize": 10,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					fordata.errors_2("暂无订单");
					
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg)
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2("请求出错，请稍稍后重试");
		});

	}

	function s_morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": 1
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}

}]);
Order.controller('finished', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var userId = localStorage.getItem("userId")
	fordata.shows();
	$http({
		method: "POST",

		url: intUrl + '/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderStatus": "已支付"
		}
	}).
	success(function(res) {
		console.log(res)

		if(res.flag == "success") {
			if(res.data.pageVO.recordCount == 0) {
				fordata.errors_2('暂无订单');
			} else {
				fordata.nones();
				findlist = res.data.list;
				$scope.data = findlist;
				numb = Math.ceil(res.data.pageVO.recordCount / 10);
				console.log(numb)

			}

		}else{
			fordata.errors_2(res.msg);
		}

	}).
	error(function(data, status) {
	
		fordata.errors_2('请求出错，请稍稍后重试');
	});
	var n = 1;
	var s_n = 1;
	$scope.fst = function() {

		morelist(1);
	}
	$scope.last = function() {
		morelist(numb);
	}
	$scope.up = function() {
		n--;
		console.log(n)
		if(n < 0) {
			
			fordata.errors_2('已经是第一页数据了亲~');
		} else {
			morelist(n);
		}
	}
	$scope.dowen = function() {

		n++;
		console.log(n)
		if(n > numb) {
			
			fordata.errors_2('已经是最后一页数据了亲~');
		} else {
			morelist(n);
		}
	}

	function morelist(n) {

		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderStatus": "已支付",
				"pageSize": 10,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}
	//条件搜索
	$scope.sta = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY/MM/DD',
			choosefun: function(val) {
				$scope.s_startDate = val
			}
		})
	}
	$scope.endDate = function() {
		jeDate({
			dateCell: '#datebut2',
			isinitVal: true,
			format: 'YYYY/MM/DD',
			choosefun: function(val) {
				$scope.s_endDate = val
			}
		})
	}
	$scope.yuyue = function() {
		jeDate({
			dateCell: '#datebut3',
			isinitVal: true,
			format: 'YYYY/MM/DD',
			choosefun: function(val) {
				//$scope.s_endDate=val
				alert("预约时间")
			}
		})
	}
	$scope.sos = function() {
		$('.pa').css("display", 'none');
		$('.pa2').css("display", 'block');
		//$('#datebut1').text()
		console.log($scope.s_startDate)
			fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": 1
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;
					s_numb = Math.ceil(res.data.pageVO.recordCount / 10);
					console.log(s_numb)
				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}

	$scope.s_fst = function() {

		s_morelist(1);
	}
	$scope.s_last = function() {
		s_morelist(s_numb);
	}
	$scope.s_up = function() {
		s_n--;
		console.log(s_n)
		if(s_n < 0) {
			fordata.errors_2('已经是第一页数据了亲~');
			
		} else {
			s_morelist(s_n);
		}
	}
	$scope.s_dowen = function() {

		s_n++;
		console.log(s_n)
		if(s_n > s_numb) {
		
			fordata.errors_2('已经是最后一页数据了亲~');
		} else {
			s_morelist(s_n);
		}
	}

	function s_morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}

}]);
Order.controller('unfinished', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var userId = localStorage.getItem("userId")
	fordata.shows();
	$http({
		method: "POST",

		url: intUrl + '/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderStatus": "未完成"
		}
	}).
	success(function(res) {
		console.log(res)
		if(res.flag == "success") {
			if(res.data.pageVO.recordCount == 0) {
				fordata.errors_2('暂无订单');
			} else {
				fordata.nones();
				findlist = res.data.list;
				$scope.data = findlist;
				numb = Math.ceil(res.data.pageVO.recordCount / 10);
				console.log(numb)

			}

		}else{
				fordata.errors_2(res.msg);
			}

	}).
	error(function(data, status) {
		fordata.errors_2('网络出错，刷新重试');
	});
	var n = 1;
	var s_n =1;
	$scope.fst = function() {

		morelist(1);
	}
	$scope.last = function() {
		morelist(numb);
	}
	$scope.up = function() {
		n--;
		console.log(n)
		if(n < 0) {
			fordata.errors_2('已经是第一页数据了亲~');
			
		} else {
			morelist(n);
		}
	}
	$scope.dowen = function() {

		n++;
		console.log(n)
		if(n > numb) {
			
			fordata.errors_2('已经是最后一页数据了亲~');
		} else {
			morelist(n);
		}
	}

	function morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderStatus": "未完成",
				"pageSize": 10,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}
	//条件搜索
	$scope.sta = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_startDate = val
			}
		})
	}
	$scope.endDate = function() {
		jeDate({
			dateCell: '#datebut2',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_endDate = val
			}
		})
	}
	$scope.yuyue = function() {
		jeDate({
			dateCell: '#datebut3',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				//$scope.s_endDate=val
				alert("预约时间")
			}
		})
	}
	$scope.sos = function() {
		$('.pa').css("display", 'none');
		$('.pa2').css("display", 'block');
		//$('#datebut1').text()
		console.log($scope.s_startDate)
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": 1
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;
					s_numb = Math.ceil(res.data.pageVO.recordCount / 10);
					console.log(s_numb)
				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}

	$scope.s_fst = function() {

		s_morelist(1);
	}
	$scope.s_last = function() {
		s_morelist(s_numb);
	}
	$scope.s_up = function() {
		s_n--;
		console.log(s_n)
		if(s_n < 0) {
			
			fordata.errors_2('已经是第一页数据了亲~');
		} else {
			s_morelist(s_n);
		}
	}
	$scope.s_dowen = function() {

		s_n++;
		console.log(s_n)
		if(s_n > s_numb) {
			
			fordata.errors_2('已经是最后一页数据了亲~');
		} else {
			s_morelist(s_n);
		}
	}

	function s_morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
				fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}
}]);
Order.controller('nopaid', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var userId = localStorage.getItem("userId")
	fordata.shows();
	$http({
		method: "POST",

		url: intUrl + '/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderStatus": "待支付"
		}
	}).
	success(function(res) {
		console.log(res)

		if(res.flag == "success") {
			if(res.data.pageVO.recordCount == 0) {
				
				fordata.errors_2('暂无已支付订单');
			} else {
				fordata.nones()
				findlist = res.data.list;
				$scope.data = findlist;
				numb = Math.ceil(res.data.pageVO.recordCount / 10);
				console.log(numb)

			}

		}else{
			fordata.errors_2(res.msg);
		}

	}).
	error(function(data, status) {
		
		fordata.errors_2('请求出错，请稍稍后重试');
	});
	var n = 1;
	var s_n = 1;
	$scope.fst = function() {

		morelist(1);
	}
	$scope.last = function() {
		morelist(numb);
	}
	$scope.up = function() {
		n--;
		console.log(n)
		if(n < 0) {
			
			fordata.errors_2('已经是第一页数据了亲~');
		} else {
			morelist(n);
		}
	}
	$scope.dowen = function() {

		n++;
		console.log(n)
		if(n > numb) {
			
			fordata.errors_2('已经是最后一页数据了亲~');
		} else {
			morelist(n);
		}
	}

	function morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderStatus": "待支付",
				"pageSize": 10,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
				
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
		
			fordata.errors_2('请求出错，请稍稍后重试');
		});

	}
	//条件搜索
	$scope.sta = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_startDate = val
			}
		})
	}
	$scope.endDate = function() {
		jeDate({
			dateCell: '#datebut2',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope.s_endDate = val
			}
		})
	}
	$scope.yuyue = function() {
		jeDate({
			dateCell: '#datebut3',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				//$scope.s_endDate=val
				alert("预约时间")
			}
		})
	}
	$scope.sos = function() {
		$('.pa').css("display", 'none');
		$('.pa2').css("display", 'block');
		//$('#datebut1').text()
		console.log($scope.s_startDate)
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": 1
			}
		}).
		success(function(res) {
			console.log(res)
			
			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2('暂无订单');
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist; 
					s_numb = Math.ceil(res.data.pageVO.recordCount / 10);
					console.log(s_numb)
				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
			
			fordata.errors_2("请求出错，请稍稍后重试");
		});

	}

	$scope.s_fst = function() {

		s_morelist(1);
	}
	$scope.s_last = function() {
		s_morelist(s_numb);
	}
	$scope.s_up = function() {
		s_n--;
		console.log(s_n)
		if(s_n < 0) {
			
			
			fordata.errors_2("已经是第一页数据了亲~");
		} else {
			s_morelist(s_n);
		}
	}
	$scope.s_dowen = function() {

		s_n++;
		console.log(s_n)
		if(s_n > s_numb) {
			
			fordata.errors_2("已经是最后一页数据了亲~");
		} else {
			s_morelist(s_n);
		}
	}

	function s_morelist(n) {
		fordata.shows();
		$http({
			method: "POST",

			url: intUrl + '/app/order/findOrderByCondition',
			params: {
				"userId": userId,
				"custName": $scope.s_custName,
				//"phoneNo":phoneNo,
				"licenseNo": $scope.s_licenseNo,
				//"endCode":endCode,
				"startDate": $scope.s_startDate,
				"endDate": $scope.s_endDate,
				"pageNo": n
			}
		}).
		success(function(res) {
			console.log(res)

			if(res.flag == "success") {
				if(res.data.pageVO.recordCount == 0) {
					
					fordata.errors_2("暂无订单");
				} else {
					fordata.nones();
					findlist = res.data.list;
					$scope.data = findlist;

				}

			}else{
				fordata.errors_2(res.msg);
			}

		}).
		error(function(data, status) {
		
			fordata.errors_2("请求出错，请稍稍后重试");
		});

	}
}]);