Single.controller('basic', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
	//修改带出信息

	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	if(orderId == null) {
		$scope._orderId = "";

	} else {
		fordata.shows()
		$http({
			method: "POST",
			url: intUrl + '/app/order/getOrderDetailDataVO',
			//url : intUrl +'/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderId": orderId
					//"orderStatus":"未完成"
			}
		}).
		success(function(res) {

			var data = res.data;
			console.log(res)
			if(res.flag == "error") {

				fordata.errors_2(res.msg)
				window.history.back(-1)
			} else if(res.flag == "success") {
				fordata.nones()
				$scope._orderId = data.orderId;
				$scope._createTime = fordata.formatDate(data.createTime);
				$scope._type = data.agentName;
				$scope._cityCode = data.cityCode;

				$scope._cityCodeshowe = showshengfen.shows(data.cityCode)

				$scope._custName = data.custName;
				$scope._custName2 = data.custName;
				$scope.__customerId = data.customerId;
				$scope._phoneNo = data.phoneNo;
				$scope._phoneNo2 = data.phoneNo;
				$scope._cappId = data.cappId;
				$scope._showId = data.showId;
				$scope._registerDate = fordata.formatDate(data.registerDate);
				$scope._specialCarDate = fordata.formatDate(data.specialCarDate);

				$scope.sds = function() {
					//alert($scope.yes)
					if($scope.yes == "true") {
						$('#datebut2').removeAttr('disabled')
						$('#datebut2a').removeAttr('disabled', 'disabled');
					}
				}
				$scope.sds2 = function() {
					if($scope.yes == "false") {

						$('#datebut2').attr('disabled', 'disabled');
						$('#datebut2a').attr('disabled', 'disabled');
					}
				}

				//车辆信息
				if(data.licenseNo == "新车") {

					$scope._licenseNo = "新车";
					$scope._licenseNo2 = "新车";
					$scope.agree = true;

				} else {
					$scope._licenseNo = data.licenseNo;
					$scope._licenseNo2 = data.licenseNo;
				}
				//
				//		if($scope.agree) {
				//			$("#carnumb").attr('disabled', "disabled");
				//
				//		} else {
				//			$("#carnumb").removeAttr("disabled");
				//		}
				$scope._modelName = data.modelName;
				$scope._frameNo = data.frameNo;
				$scope._engineNo = data.engineNo;
				$scope._licenseDate = fordata.formatDate2(data.licenseDate);
				$scope._modelCode = data.modelCode;
				$scope._carId = data.carId;
				$scope._specialCarDate = fordata.formatDate2(data.specialCarDate);

				if(data.specialCarFlag == true) {
					$scope.agree_sa2 = true;
					$scope.yes = data.specialCarFlag;

				} else {
					$scope.agree_sa = true;
					$('#datebut2').attr('disabled', 'disabled')
					$scope.yes = data.specialCarFlag;
					$('#datebut2a').attr('disabled', 'disabled')
				}

			}

		}).
		error(function(data, status) {

			fordata.errors_2("出错稍后重试")
		});
	}

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

	$scope.cityBlock = function() {
		$('.selects').css('display', 'block');
		$scope.sheng = shengs_1.province;

	}
	$scope.shengbranname = function(item, data) {
		console.log(item)

		$scope.ites = item[6].city;
		$scope._cityCodeshowe = item[0]
		$scope.shengname = item[0]
	}
	$scope.shiname = function(item, data) {
		console.log(item);
		if(item[7]) {
			$scope.ites_2 = item[7].district
			$scope._cityCodeshowe = $scope.shengname + item[0]

			$scope.shinames = $scope._cityCodeshowe
			$scope._nmes = $scope.shinames
		} else {
			$scope.ites_2 = ""
			$scope._cityCodeshowe = $scope.shengname + item[0]

			$scope._licenseNo2 = item[3]

			$scope._cityCode = item[6];
			$scope.shinames = $scope._cityCodeshowe
			$scope._nmes = $scope.shinames
		}

	}
	$scope.xianqu = function(item, data) {
		console.log(item);

		$scope._licenseNo2 = item[3]

		$scope._cityCode = item[6];
		$scope._cityCodeshowe = $scope.shinames + item[0]
		$scope._nmes = $scope._cityCodeshowe

	}
	$scope.close = function() {
		$('.selects').css('display', 'none')
		$scope._cityCodeshowe = "";
		if($scope._licenseNo == $scope._lics) {
			$scope._licenseNo = ""
		}
	}
	$scope.sure = function() {
		$('.selects').css('display', 'none')
		console.log($scope._cityCode)
		$scope._cityCodeshowe = $scope._nmes;

		if($scope._licenseNo != $scope._licenseNo2) {
			$scope._licenseNo = $scope._licenseNo2
			$scope._lics = $scope._licenseNo2
		}
	}
	$scope.as = function() {
		if($scope.agree) {
			$("#carnumb").attr('disabled', "disabled");
			$scope._licenseNo = "新车"

		} else {
			$("#carnumb").removeAttr("disabled");
			$scope._licenseNo = ""
		}
	};
	$scope.changes = function() {
		$('.borcont div').removeAttr('ui-sref');
	}
	$scope.phone = function() {

		if($scope._phoneNo) {
			if(!(/^1[34578]\d{9}$/.test($scope._phoneNo))) {

				fordata.errors_2("手机号码有误，请重填")
				return false;
			}
		}
	}
	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.sures = function() {

		$('.flogbox').css('display', 'none')
	}
	$scope.ss = function() {

		if($("#cid").val()) {

			if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test($("#cid").val()))) {

				fordata.errors_2("身份证格式错误，请重新填写")
				$("#cid").val()
				return false;
			}
		}
	}
	$scope.chepai = function() {
			$scope._licenseNo = $scope._licenseNo.toUpperCase();
			if($scope._licenseNo) {

				if(!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test($scope._licenseNo))) {

					fordata.errors_2("车品牌号格式不对，请重填")
					return false;
				}
			}
		}
		//创建订单
	$scope.Create = function() {

		if($scope._cityCode && $scope._licenseNo && $scope._custName && $scope._phoneNo) {

			console.log(userId, $scope._orderId, $scope._cityCode, $scope._licenseNo, $scope._custName, $scope._phoneNo, $scope._cappId)
			Orderajax.setorder('outSingle.html#/siglecar', userId, $scope._licenseNo, $scope._custName, $scope._cappId, $scope._phoneNo, $scope._cityCode, $scope._orderId)
				//userId,licenseNo,ownerName,ownerID,ownerMobile,cityCode,orderId
		}
	}

}]);
Single.controller('basic_car', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
	//修改带出信息
	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	var carinfor = JSON.parse(sessionStorage.getItem("carinfor"));
	//var chenge_orderId = localStorage.getItem("chenge_orderId");
	if(orderId == null) {
		var data = carinfor;
		console.log(data)
		if(data.licenseNo == "新车") {

			$scope._licenseNo = "新车";
			$scope._licenseNo2 = "新车";
			$scope.agree = true;

		} else {
			$scope._licenseNo = data.licenseNo;
			$scope._licenseNo2 = data.licenseNo;
			$scope.agree = false;
		}

		$scope._modelName = data.modelName;
		$scope._frameNo = data.frameNo;
		$scope._engineNo = data.engineNo;
		$scope._licenseDate = fordata.formatDate2(data.licenseDate);
		$scope._modelCode = data.modelCode;
		$scope._carId = data.carId;
		$scope._customerId = data.customerId;
		$scope._specialCarDate = fordata.formatDate2(data.specialCarDate);
		$scope._registerDate = fordata.formatDate2(data.registerDate);
		if(data.specialCarFlag == true) {
			$scope.agree_sa2 = true;
			$scope.yes = data.specialCarFlag;

		} else {
			$scope.agree_sa = true;
			$('#datebut2').attr('disabled', 'disabled')
			$('#datebut2a').attr('disabled', 'disabled')
			$scope.yes = data.specialCarFlag;

		}

	} else {
		$http({
			method: "POST",
			url: intUrl + '/app/order/getOrderDetailDataVO',
			//url : intUrl +'/app/order/findMainOrder',
			params: {
				"userId": userId,
				"orderId": orderId
					//"orderStatus":"未完成"
			}
		}).
		success(function(res) {
			var data = res.data;
			console.log(res)
			if(res.flag == "error") {
				console.log(res.msg);
				fordata.errors_2(res.msg)
				window.history.back(-1)
			} else if(res.flag == "success") {

				$scope._orderId = data.orderId;
				$scope._createTime = fordata.formatDate(data.createTime);
				$scope._type = data.agentName;
				$scope._cityCode = data.cityCode;
				$scope._custName = data.custName;
				$scope._custName2 = data.custName;
				$scope.__customerId = data.customerId;
				$scope._phoneNo = data.phoneNo;
				$scope._phoneNo2 = data.phoneNo;
				$scope._cappId = data.cappId;
				$scope._showId = data.showId;
				$scope._registerDate = fordata.formatDate2(data.registerDate);
				$scope._specialCarDate = fordata.formatDate2(data.specialCarDate);

				if(data.licenseNo == "新车") {

					$scope._licenseNo = "新车";
					$scope._licenseNo2 = "新车";
					$scope.agree = true;

				} else {
					$scope._licenseNo = data.licenseNo;
					$scope._licenseNo2 = data.licenseNo;
					$scope.agree = false;
				}

				$scope._modelName = data.modelName;
				$scope._frameNo = data.frameNo;
				$scope._engineNo = data.engineNo;
				$scope._licenseDate = fordata.formatDate2(data.licenseDate);
				$scope._modelCode = data.modelCode;
				$scope._carId = data.carId;
				$scope._customerId = data.customerId;
				$scope._specialCarDate = fordata.formatDate2(data.specialCarDate);
				$scope._registerDate = fordata.formatDate2(data.registerDate);
				$scope._seatCount = data.seatCount;
				$scope._newCarPrice = data.newCarPrice;
				if(data.specialCarFlag == true) {
					$scope.agree_sa2 = true;
					$scope.yes = data.specialCarFlag;

				} else {
					$scope.agree_sa = true;
					$('#datebut2').attr('disabled', 'disabled');
					$('#datebut2a').attr('disabled', 'disabled')
					$scope.yes = data.specialCarFlag;
				}
			}

		}).
		error(function(data, status) {

			fordata.errors()
		});

	}

	$scope.checks_true = function() {
		//alert($scope.yes)
		if($scope.agree_sa2 == true) {
			$scope.yes = "true"
			$('#datebut2').removeAttr('disabled');
			$('#datebut2a').removeAttr('disabled');
			$scope.agree_sa = false;
		} else {
			$scope.yes = "fasle";
			$scope.agree_sa = true;
			$('#datebut2').attr('disabled', 'disabled');
			$('#datebut2a').attr('disabled', 'disabled');
		}

	}
	$scope.checks_false = function() {
			if($scope.agree_sa == true) {
				$scope.yes = "false"
				$('#datebut2').attr('disabled', 'disabled')
				$('#datebut2a').attr('disabled', 'disabled');
				$scope.agree_sa2 = false;
			} else {
				$scope.yes = "true";
				$scope.agree_sa2 = true;
				$('#datebut2').removeAttr('disabled');
				$('#datebut2a').removeAttr('disabled');

			}

		}
		//一键补全车辆信息

	$scope.completion = function() {
			//console.log($scope._carId,$scope._licenseNo)
			//Orderajax.findCarInfo($scope._carId, $scope._licenseNo);
			if($scope._licenseNo) {
				$http({
					method: "POST",
					url: intUrl + '/app/lnsure/completeCarInfo',

					params: {
						"carId": $scope._carId,
						"licenseNo": $scope._licenseNo
					}
				}).
				success(function(res) {
					var CarInfo = res.data
					console.log(res)
					if(res.flag == "success") {
						$scope._frameNo = CarInfo.frameNo;
						$scope._engineNo = CarInfo.engineNo;
						$scope._modelCode = CarInfo.rbCode;
						$scope._modelName = CarInfo.modelName;
						$scope._licenseDate = fordata.formatDate2(CarInfo.licenseDate);
						$scope._registerDate = fordata.formatDate2(CarInfo.registerDate);

						if(CarInfo.specialCarFlag == true) {
							$scope.agree_sa2 = true;
							$scope.yes = CarInfo.specialCarFlag;

						} else {
							$scope.agree_sa = true;
							$('#datebut2').attr('disabled', 'disabled')
							$scope.yes = CarInfo.specialCarFlag;
						}
					} else {

						fordata.errors_2(res.msg)
					}

				}).
				error(function(data, status) {

					fordata.errors_2('出错稍后重试')
				});

			} else {

				fordata.errors_2('请输入车牌号')
			}

		}
		//根据车架号查询车辆信息
	$scope.carinfs = function() {
		if($scope._frameNo) {
			if(!(/^[a-zA-Z0-9]{0,17}$/.test($scope._frameNo))) {

				fordata.errors_2('车架号格式不准确，请重填')
				return false;
			} else {
				$http({
					method: "POST",
					url: intUrl + '/app/lnsure/findVehicleModelByFrameNo',

					params: {
						"frameNo": $scope._frameNo,
						"licenseNo": $scope._licenseNo

					}
				}).
				success(function(res) {
					console.log(res)
					if(res.data) {
						console.log(res.data[0]);
						var data = res.data;

						$scope.list_ModelN_show = !$scope.list_ModelN_show;

						$scope.ModelName = data;

					}

				}).
				error(function(res) {
					fordata.errors_2('请求失败稍后重试')
				})
			}
		} //alert(32)

	}

	$scope.ModelName_m = function(site, data) {
			console.log(site)
			$scope._modelName = site.standardName;
			$scope._modelCode = site.rbCode;
			$scope._seatCount = site.seat;
			$scope._newCarPrice = site.newCarPrice;
			$scope._licenseDate = fordata.formatDate2(site.licenseDate);
			$scope.list_ModelN_show = true;

		}
		//上下翻页
	var pageNo_num = 1;

	$scope.list_ModelN_show = true;

	$scope.som = function(pageNo_num) {
		if($scope._modelName) {
			$scope.list_ModelN_show = !$scope.list_ModelN_show;
			if(pageNo_num <= 0) {

				fordata.errors_2('已经第一页了')
				pageNo_num = 1
			} else {
				//Orderajax.findVehicleModelByModelName($scope._modelName,1);
				//$scope.list_ModelN_show = !$scope.list_ModelN_show;
				$http({
					method: "POST",
					url: intUrl + '/app/lnsure/findVehicleModelByModelName',

					params: {
						"modelName": $scope._modelName,
						"pageNo": pageNo_num
					}
				}).
				success(function(res) {

					var ModelName = res.data
					console.log(res)
					if(ModelName) {
						if(ModelName.length >= 0) {

							$scope.ModelName = ModelName;

						} else {

							fordata.errors_2('已经最后一页了')
						}
					}

				}).
				error(function() {
					fordata.errors_2('请填写内容')
				})

			}

		} else {
			//alert("请填写内容")

			fordata.errors_2('请填写内容')
		}
	}
	$scope.so_modelName = function() {
		console.log(222)
		var pageNo_num = 1;
		//$scope.list_ModelN_show = !$scope.list_ModelN_show;
		$scope.som(pageNo_num)
			//Orderajax.findVehicleModelByModelName($scope._modelName);
	}
	$scope.modename_up = function() {
		$scope.list_ModelN_show = !$scope.list_ModelN_show;
		pageNo_num--
		$scope.som(pageNo_num)
		console.log(2323)
	}
	$scope.modename_dowen = function() {
		$scope.list_ModelN_show = !$scope.list_ModelN_show;
		pageNo_num++
		$scope.som(pageNo_num)

	}

	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.changes = function() {
		$('.borcont .node').removeAttr('ui-sref');
	}
	$scope.regDate = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope._registerDate = val
					//alert(new Date(val))

			}
		})
	}
	$scope.speDate = function() {
		jeDate({
			dateCell: '#datebut2',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope._specialCarDate = val
					//alert(new Date(val))

			}
		})
	}

	$scope.upcarInfo = function() {
			//	alert($scope.yes)
			var orderId = localStorage.getItem("chenge_orderId");
			var userId = localStorage.getItem("userId");
			if($scope.yes == false) {
				$scope._specialCarDate = " ";
			}

			if(!$scope._licenseDate) {
				$scope._licenseDate = " ";
			}

			if($scope._licenseNo && $scope._modelName && $scope._frameNo && $scope._engineNo) {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'none');
				$('.texta').text("请求中请稍后...");
				console.log($scope._modelCode)

				console.log(userId, orderId, $scope._licenseNo, $scope._frameNo, $scope._engineNo, $scope._modelCode, $scope._modelName, $scope._registerDate, $scope.yes, $scope._specialCarDate, $scope._customerId, $scope._carId, $scope._seatCount, $scope._newCarPrice, $scope._licenseDate)
				setTimeout(function() {
					Orderajax.upCarInfo('outSingle.html#/sigleins', userId, orderId, $scope._licenseNo, $scope._frameNo, $scope._engineNo, $scope._modelCode, $scope._modelName, $scope._registerDate, $scope.yes, $scope._specialCarDate, $scope._customerId, $scope._carId, $scope._seatCount, $scope._newCarPrice, $scope._licenseDate)

				}, 300)

			} else {
				$('.flogbox').css('display', 'block');
				$('.flogbox em').text('车辆信息不全，请补全信息')
			}
			//console.log(userId,orderId,$scope._licenseNo,$scope._frameNo,$scope._engineNo,$scope._modelCode,$scope._modelName,$scope._registerDate,$scope.yes,$scope._specialCarDate,$scope._carId)

		}
		//创建订单
	$scope.sures = function() {

		$('.flogbox').css('display', 'none')
	}
	$scope.colosul = function() {
		$scope.list_ModelN_show = true;
	}
}]);
Single.controller('basic_chengbao', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
	//修改带出信息
	$scope.sures = function() {

		$('.flogbox').css('display', 'none')
	}

	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	$('.flogbox').css('display', 'block');
	$('.flogbox p').css('display', 'none');
	$('.texta').text("网络请求中请稍后...");
	$http({
		method: "POST",
		url: intUrl + '/app/order/getOrderDetailDataVO',
		//url : intUrl +'/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderId": orderId
				//"orderStatus":"未完成"
		}
	}).
	success(function(res) {
		var data = res.data;
		console.log(res);

		if(res.flag == "error") {
			//alert(res.msg);
			$('.flogbox').css('display', 'block');
			$('.flogbox p').css('display', 'block');
			$('.texta').text(res.msg);
			//window.history.back(-1)
		} else if(res.flag == "userConflict") {
			window.location.href = "./index.html"
		} else if(res.flag == "success") {
			$('.flogbox').css('display', 'none');
			$('.flogbox p').css('display', 'block');
			$('.texta').text(" ");
			$scope._orderId = data.orderId;
			$scope._createTime = fordata.formatDate(data.createTime);
			$scope._type = data.agentName;
			$scope._cityCode = data.cityCode;
			$scope._custName = data.custName;
			$scope._custName2 = data.custName;
			$scope.__customerId = data.customerId;
			$scope._phoneNo = data.phoneNo;
			$scope._phoneNo2 = data.phoneNo;
			$scope._cappId = data.cappId;
			$scope._showId = data.showId;
			$scope._registerDate = fordata.formatDate2(data.registerDate);
			$scope._specialCarDate = fordata.formatDate2(data.specialCarDate);
			$scope._carId = data.carId;
			$scope.sds = function() {
				//alert($scope.yes)
				if($scope.yes == "true") {
					$('#datebut2').removeAttr('disabled')
				}
			}
			$scope.sds2 = function() {
				if($scope.yes == "false") {

					$('#datebut2').attr('disabled', 'disabled')
				}
			}

			//承保信息
			$scope._insureComCode = data.precisionPriceVO.insureComCode;
			$scope._totalPremium = data.precisionPriceVO.totalPremium;
			$scope._Credit = data.precisionPriceVO.credit;
			$scope._biPremium = data.precisionPriceVO.biPremium;
			$scope._ciPremium = data.precisionPriceVO.ciPremium;
			$scope._vehicleTaxPremium = data.precisionPriceVO.vehicleTaxPremium
			$scope._ciStartDate = fordata.formatDate2(data.precisionPriceVO.ciStartDate);
			$scope._biStartDate = fordata.formatDate2(data.precisionPriceVO.biStartDate);
			//展示修改承保信息
			if(data.precisionPriceVO.biPremium > 0 || !data.precisionPriceVO.biPremium) {
				$scope.agrees = true;
			} else {
				$scope.agrees = false;
				$('.shang input').attr('disabled', 'disabled');

			}
			console.log(data.precisionPriceVO.ciPremium)
			if(data.precisionPriceVO.ciPremium > 0 || !data.precisionPriceVO.ciPremium) {
				$scope.agree_1 = true;
			} else {
				$scope.agree_1 = false;

				$('.jiao input').attr('disabled', 'disabled');

			}

			var arr1 = data.precisionPriceVO.dealCredit;
			var arr2 = new Array();
			for(var i = 0; i < arr1.length; i++) {
				arr2.push([i + 1, arr1[i]]);
			}
			$scope._dealCredit = arr2;
			//$scope._dealCredit = [
			//					["100积分,优惠券"],["200积分,创建订单奖励"],["300积分,徒弟出单奖励"]
			//				];
			$http({
				method: "POST",
				url: intUrl + '/app/lnsure/loadKindInfo',
				//url : intUrl +'/app/order/findMainOrder',
				params: {
					"userId": userId,
					"carId": $scope._carId,
					"reqBiStartDate": $scope._biStartDate
						//"orderStatus":"未完成"
				}
			}).
			success(function(res) {
				$('.flogbox').css('display', 'none');
				$('.texta').text(" ");
				$('.flogbox p').css('display', 'block');
				console.log(res);
				$scope._ciStartDate = res.data.ciLastEffectiveDate;
				$scope._biStartDate = res.data.biLastEffectiveDate;
				$scope._ciStartDate_2 = fordata.formatDate3(res.data.ciLastEffectiveDate)

				$scope._biStartDate_2 = fordata.formatDate3(res.data.biLastEffectiveDate);
				$scope.cheSunAmount = res.data.cheSunAmount;
				$scope.vehicle = $scope.cheSunAmount;
				$scope.pilfer = $scope.cheSunAmount
				console.log($scope.vehicle)
			}).
			error(function() {

					fordata.errors_2('请稍候重试')
				})
				//险别信息
			$http({
				method: "POST",
				url: intUrl + '/app/kind/findKindCode',
				//url : intUrl +'/app/order/findMainOrder',
				params: {
					"userId": userId,
					"orderId": orderId
				}
			}).
			success(function(res) {
				$('.flogbox').css('display', 'none');
				$('.texta').text(" ");
				$('.flogbox p').css('display', 'block');
				console.log(res);
				if(!res.data.ciStartDate || !res.data.biStartDate) {

				} else {
					$scope._ciStartDate = res.data.ciStartDate;
					$scope._biStartDate = res.data.biStartDate;
					$scope._ciStartDate_2 = fordata.formatDate3(res.data.ciStartDate)

					$scope._biStartDate_2 = fordata.formatDate3(res.data.biStartDate);
					$scope.cheSunAmount = res.data.cheSunAmount;
				}

				vd = res.data.kindList;

				if(res.data.kindList.length <= 0) {
					$scope.agree_3 = true;
					$scope.agree_4 = true;
					$scope.agree_5 = true;
					$scope.agree_6 = true;
					$scope.agree_7 = true;
					$scope.agree_8 = true;
					$scope.agree_9 = false;
					$scope.agree_10 = false;
					$scope.agree_11 = true;
					$scope.agree_12 = false;
					$scope.agree_13 = false;
					$scope.franchise_1 = true;
					$scope.franchise_2 = true;
				} else {
					$('#bs').attr('disabled', 'disabled');
					$('#bs1').attr('disabled', 'disabled');
					$('#bs2').attr('disabled', 'disabled');
					$('#bs3').attr('disabled', 'disabled');
					$('#bs4').attr('disabled', 'disabled');
					$('#bs5').attr('disabled', 'disabled');
					$('#bs6').attr('disabled', 'disabled');
					$('#bs7').attr('disabled', 'disabled');
					$('#bs8').attr('disabled', 'disabled');
					$('#bs9').attr('disabled', 'disabled');
					$('#bs10').attr('disabled', 'disabled');
					$('#bs11').attr('disabled', 'disabled');
					$scope.agree_3 = false;
					$scope.agree_1 = false;
					$scope.agree_4 = false;
					$scope.agree_5 = false;
					$scope.agree_6 = false;
					$scope.agree_7 = false;
					$scope.agree_8 = false;
					$scope.agree_9 = false;
					$scope.agree_10 = false;
					$scope.agree_11 = false;
					$scope.agree_12 = false;
					$scope.agree_13 = false;
					$scope.franchise_1 = false;
					$scope.franchise_2 = false;
					$scope.franchise_3 = false;
					$scope.franchise_4 = false;
					$scope.franchise_5 = false;
					$scope.franchise_6 = false;
					for(var i = 0; i < vd.length; i++) {
						if(vd[i].kindCode == 'FORCEPREMIUM') {
							console.log(vd[i].kindCode)
							$scope.agree_1 = true;

						}
						if(vd[i].kindCode == 'A' && !vd[i].amount == '') {
							var s = vd[i].amount.split(".")
							$scope._name = vd[i].kindCode; //kindCode
							$scope.con = vd[i].amount; //amount
							$scope.agree_3 = true;
							$scope.franchise_1 = false;
							$('#bs').removeAttr('disabled', 'disabled');
							$scope.zi = vd[i].amount;
							//$scope.vehicle =$scope.cheSunAmount;
							console.log(vd[i].flag)
							if(vd[i].flag == "null") {

								$scope.vehicle = $scope.cheSunAmount;
								$scope.flag = $scope.cheSunAmount
							} else {
								//$scope.vehicle = vd[i].flag
								$scope.flag = vd[i].flag
							}

						}
						if(vd[i].kindCode == 'MA' && !vd[i].amount == '') {

							$scope.agree_3 = true;
							$scope.franchise_1 = true;
							$('#bs').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'B' && !vd[i].amount == '') {

							$scope._name2 = vd[i].kindCode;
							$scope.con2 = vd[i].amount;
							$scope.agree_4 = true;
							$scope.franchise_2 = false;
							$('#bs1').removeAttr('disabled', 'disabled');
							$scope.zi = {
								"show": vd[i].amount.split(".")[0],
								"tex": vd[i].amount
							};

						}
						if(vd[i].kindCode == 'MB' && !vd[i].amount == '') {

							$scope.agree_4 = true;
							$scope.franchise_2 = true;
							$('#bs1').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'D3' && !vd[i].amount == '') {
							$scope._name3 = vd[i].kindCode;
							$scope.agree_5 = true;
							$scope.franchise_3 = false;
							$('#bs2').removeAttr('disabled', 'disabled');
							$scope.con3 = vd[i].amount;
							$scope.dri = {
								"show": vd[i].amount.split(".")[0],
								"tex": vd[i].amount
							};

						}
						if(vd[i].kindCode == 'MD3' && !vd[i].amount == '') {

							$scope.agree_5 = true;
							$scope.franchise_3 = true;
							$('#bs2').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'D4' && !vd[i].amount == '') {
							$scope._name4 = vd[i].kindCode;
							$scope.agree_6 = true;
							$scope.franchise_4 = false;
							$('#bs3').removeAttr('disabled', 'disabled');
							$scope.con4 = vd[i].amount;
							$scope.pas = {
								"show": vd[i].amount.split(".")[0],
								"tex": vd[i].amount
							};

						}
						if(vd[i].kindCode == 'MD4' && !vd[i].amount == '') {

							$scope.agree_6 = true;
							$scope.franchise_4 = true;
							$('#bs3').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'G1' && !vd[i].amount == '') {
							$scope._name5 = vd[i].kindCode;
							$scope.agree_7 = true;
							$scope.franchise_5 = false;
							$('#bs4').removeAttr('disabled', 'disabled');
							$scope.con4 = vd[i].amount;
							$scope.pilfer = vd[i].flag

						}
						if(vd[i].kindCode == 'MG1' && !vd[i].amount == '') {

							$scope.agree_7 = true;
							$scope.franchise_5 = true;
							$('#bs4').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'L' && !vd[i].amount == '') {
							$scope._name7 = vd[i].kindCode;
							$scope.agree_8 = true;
							$scope.franchise_6 = false;
							$('#bs5').removeAttr('disabled', 'disabled');
							$scope.con5 = vd[i].amount;
							$scope.pilfer = vd[i].premium

							$scope.cards = vd[i].amount.split(".")[0]

						}
						if(vd[i].kindCode == 'ML' && !vd[i].amount == '') {

							$scope.agree_8 = true;
							$scope.franchise_6 = true;
							$('#bs5').removeAttr('disabled');

						}
						if(vd[i].kindCode == 'Q3' && !vd[i].amount == '') {
							$scope._name8 = vd[i].kindCode;
							$scope.agree_9 = true;
							$('#bs6').removeAttr('disabled', 'disabled');
							$scope.con6 = vd[i].amount;
							$scope.pilfer = vd[i].premium

						}
						if(vd[i].kindCode == 'Z' && !vd[i].amount == '') {
							$scope._name9 = vd[i].kindCode;
							$scope.agree_10 = true;
							$('#bs7').removeAttr('disabled', 'disabled');
							$scope.con7 = vd[i].amount;

						}
						if(vd[i].kindCode == 'F' && !vd[i].amount == '') {
							$scope._name10 = vd[i].kindCode;
							$scope.agree_11 = true;
							$('#bs8').removeAttr('disabled', 'disabled');
							$scope.con8 = vd[i].amount;
							$scope.gl = {
								"show": vd[i].flag,
								"tex": vd[i].flag
							};

						}
						if(vd[i].kindCode == 'X1' && !vd[i].amount == '') {
							$scope._name10 = vd[i].kindCode;
							$scope.agree_11 = true;
							$('#bs9').removeAttr('disabled', 'disabled');
							$scope.con9 = vd[i].amount;

						}
						if(vd[i].kindCode == 'Z3' && !vd[i].amount == '') {
							$scope._name11 = vd[i].kindCode;
							$scope.agree_12 = true;
							$('#bs10').removeAttr('disabled', 'disabled');
							$scope.con10 = vd[i].amount;

						}
					}
				}
				if(!$scope.agree_1) {

					$('#datebut').attr('disabled', 'disabled');
					$('#dateend').attr('disabled', 'disabled');

				}
				if(!$scope.agree_9) {

					$('#bs6').attr('disabled', 'disabled');

				}
				if(!$scope.agree_10) {
					$('#bs7').attr('disabled', 'disabled');

				}
				if(!$scope.agree_12) {

					$('#bs10').attr('disabled', 'disabled');
				}
				if(!$scope.agree_13) {

					$('#bs11').attr('disabled', 'disabled');

				}
			}).
			error(function() {

				fordata.errors_2('请稍候重试')
			})
		}

	}).
	error(function(data, status) {
		fordata.errors()
	});
	//交强起保日期

	$scope.ciDate = function() {
		jeDate({
			dateCell: '#datebut',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope._ciStartDate = val
					//alert(new Date(val))

			}
		})
	}
	$scope.ciDate_2 = function() {
		jeDate({
			dateCell: '#dateend',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope._ciStartDate_2 = val
					//alert(new Date(val))

			}
		})
	}
	$scope.biDate = function() {
		jeDate({
			dateCell: '#datebut1',
			isinitVal: true,
			format: 'YYYY-MM-DD',
			choosefun: function(val) {
				$scope._biStartDate = val
					//alert(new Date(val))

			}
		})
	}
	$scope.biDate_2 = function() {
			jeDate({
				dateCell: '#dateend_2',
				isinitVal: true,
				format: 'YYYY-MM-DD',
				choosefun: function(val) {
					$scope._biStartDate_2 = val
						//alert(new Date(val))

				}
			})
		}
		//一键获取保险日期
	$scope.comp_time = function() {

		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'none');
		$('.texta').text("请求中请稍后...");
		$http({
			method: "POST",
			url: intUrl + '/app/lnsure/loadKindInfo',
			//url : intUrl +'/app/order/findMainOrder',
			params: {
				"userId": userId,
				"carId": $scope._carId,
				"reqBiStartDate": $scope._biStartDate
					//"orderStatus":"未完成"
			}
		}).
		success(function(res) {
			$('.flogbox').css('display', 'none');
			$('.texta').text(" ");
			$('.flogbox p').css('display', 'block');
			console.log(res);
			$scope._ciStartDate = res.data.ciLastEffectiveDate;
			$scope._biStartDate = res.data.biLastEffectiveDate;
			$scope._ciStartDate_2 = fordata.formatDate3(res.data.ciLastEffectiveDate)

			$scope._biStartDate_2 = fordata.formatDate3(res.data.biLastEffectiveDate);

			$scope.cheSunAmount = res.data.cheSunAmount;
		}).
		error(function() {

			fordata.errors_2('请稍候重试')
		})

	}
	$scope.jiaos = function() {

		if($scope.agree_1) {
			$('.jiao input').removeAttr('disabled');
		} else {
			$('.jiao input').attr('disabled', 'disabled');
		}
	}
	$scope.shangs = function() {

		if($scope.agrees) {
			$('.shang input').removeAttr('disabled');
		} else {
			$('.shang input').attr('disabled', 'disabled');
		}

	}

	//页面交互
	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.driver = [{
		'show': '1万',
		'tex': '10000'
	}, {
		'show': '2万',
		'tex': '20000'
	}, {
		'show': '3万',
		'tex': '30000'
	}, {
		'show': '4万',
		'tex': '40000'
	}, {
		'show': '5万',
		'tex': '50000'
	}, {
		'show': '10万',
		'tex': '100000'
	}, ];
	$scope.cityBlock = function() {
		$('.selects').css('display', 'block')
	}
	$scope.as = function() {
		if($scope.agree) {
			$("#carnumb").attr('disabled', "disabled");

		} else {
			$("#carnumb").removeAttr("disabled");

		}
	}
	$scope.bs = function() {
		if($scope.agree_3) {
			$scope.franchise_1 = true;
			$("#bs").removeAttr("disabled");
			$scope.con = '投保';

		} else {
			$scope.franchise_1 = false;
			$scope.con = '';
			$('#bs').attr('disabled', 'disabled')
		}
	}
	$scope.cs = function() {
		if($scope.franchise_1) {
			$scope.agree_3 = true

		}
	};
	$scope.bs1 = function() {
		if($scope.agree_4) {
			$scope.franchise_2 = true
			$("#bs1").removeAttr("disabled");
		} else {
			$scope.franchise_2 = false

			$('#bs1').attr('disabled', 'disabled')
		}
	}
	$scope.cs1 = function() {
		if($scope.franchise_2) {
			$scope.agree_4 = true

		}
	};
	$scope.bs2 = function() {
		if($scope.agree_5) {
			$scope.franchise_3 = true
			$("#bs2").removeAttr("disabled");
		} else {
			$scope.franchise_3 = false
			$('#bs2').attr('disabled', 'disabled')
		}
	}
	$scope.cs2 = function() {
		if($scope.franchise_3) {
			$scope.agree_5 = true

		}
	};
	$scope.bs3 = function() {
		if($scope.agree_6) {
			$scope.franchise_4 = true
			$("#bs3").removeAttr("disabled");
		} else {
			$scope.franchise_4 = false
			$('#bs3').attr('disabled', 'disabled')
		}
	}
	$scope.cs3 = function() {
		if($scope.franchise_4) {
			$scope.agree_6 = true

		}
	};
	$scope.bs4 = function() {
		if($scope.agree_7) {
			$scope.franchise_5 = true
			$("#bs4").removeAttr("disabled");
		} else {
			$scope.franchise_5 = false;
			$('#bs4').attr('disabled', 'disabled')
		}
	}
	$scope.cs4 = function() {
		if($scope.franchise_5) {
			$scope.agree_7 = true

		}
	};
	$scope.bs5 = function() {
		if($scope.agree_8) {
			$scope.franchise_6 = true
			$("#bs5").removeAttr("disabled");
		} else {
			$scope.franchise_6 = false;
			$('#bs5').attr('disabled', 'disabled')
		}
	}
	$scope.cs5 = function() {
		if($scope.franchise_6) {
			$scope.agree_8 = true

		}
	};
	$scope.bs6 = function() {
		if($scope.agree_9) {

			$("#bs6").removeAttr("disabled");
		} else {

			$('#bs6').attr('disabled', 'disabled')
		}
	};
	$scope.bs7 = function() {
		if($scope.agree_10) {

			$("#bs7").removeAttr("disabled");
		} else {

			$('#bs7').attr('disabled', 'disabled')
		}
	};
	$scope.bs8 = function() {
		if($scope.agree_11) {

			$("#bs8").removeAttr("disabled");
		} else {

			$('#bs8').attr('disabled', 'disabled')
		}
	};
	$scope.bs9 = function() {
		if($scope.agree_12) {

			$("#bs9").removeAttr("disabled");
		} else {

			$('#bs9').attr('disabled', 'disabled')
		}
	};
	$scope.bs10 = function() {
		if($scope.agree_13) {

			$("#bs10").removeAttr("disabled");
		} else {

			$('#bs10').attr('disabled', 'disabled')
		}
	};
	$scope.as1 = function() {
		//alert(1)
		if($scope.agree) {
			$(".tob input").attr('disabled', "disabled");
		} else {
			$(".tob input").removeAttr('disabled')
		}
	}
	$scope.as2 = function() {
		if($scope.agree_2) {
			$(".btob input").attr('disabled', "disabled");
		} else {
			$(".btob input").removeAttr('disabled')
		}
	}
	$scope.as5 = function() {
		if($scope.agree_5) {
			$("#diz").attr('disabled', "disabled");
		} else {
			$("#diz").removeAttr('disabled')
		}
	}
	$scope.as3 = function() {
		if($scope.agree_3) {
			$("#sw").attr('disabled', "disabled");
		} else {
			$("#sw").removeAttr('disabled')
		}
	}
	$scope.as4 = function() {
			if($scope.agree_4) {
				$("#sw1").attr('disabled', "disabled");
			} else {
				$("#sw1").removeAttr('disabled')
			}
		}
		//商业险赔
	$scope.records = [{
		'show': '5万',
		'tex': '50000'
	}, {
		'show': '10万',
		'tex': '100000'
	}, {
		'show': '15万',
		'tex': '150000'
	}, {
		'show': '20万',
		'tex': '200000'
	}, {
		'show': '30万',
		'tex': '300000'
	}, {
		'show': '50万',
		'tex': '500000'
	}, {
		'show': '100万',
		'tex': '1000000'
	}, {
		'show': '150万',
		'tex': '1500000'
	}, {
		'show': '200万',
		'tex': '2000000'
	}, {
		'show': '300万',
		'tex': '3000000'
	}, {
		'show': '500万',
		'tex': '5000000'
	}, ];

	$scope.snn = function(x, data) {

		$scope.zi = x;
		$scope.sh_1 = true;
		$scope.classs = "icon-ES-xiala"

	};

	$scope.sh_1 = true;
	$scope.show_1 = function() {
		$scope.sh_1 = !$scope.sh_1;
		if($scope.classs == "icon-ES-xiala") {
			$scope.classs = "icon-shangla"

		} else if($scope.classs == "icon-shangla") {
			$scope.classs = "icon-ES-xiala"
		}
	}
	$scope.classs = "icon-ES-xiala"

	//驾驶员
	$scope.drivers = function(d, data) {
		$scope.dri = d;
		$scope.sh_2 = true;
		$scope.cla = "icon-ES-xiala"
	}
	$scope.sh_2 = true;
	$scope.cla = "icon-ES-xiala"
	$scope.show_2 = function() {
		$scope.sh_2 = !$scope.sh_2;
		if($scope.cla == "icon-ES-xiala") {
			$scope.cla = "icon-shangla"

		} else if($scope.cla == "icon-shangla") {
			$scope.cla = "icon-ES-xiala"
		}
	}

	//乘客
	$scope.passengers = function(d, data) {
		$scope.pas = d;
		$scope.sh_3 = true;
		$scope.cla1 = "icon-ES-xiala"
	}
	$scope.sh_3 = true;
	$scope.cla1 = "icon-ES-xiala"
	$scope.show_3 = function() {
			$scope.sh_3 = !$scope.sh_3;
			if($scope.cla1 == "icon-ES-xiala") {
				$scope.cla1 = "icon-shangla"

			} else if($scope.cla1 == "icon-shangla") {
				$scope.cla1 = "icon-ES-xiala"
			}
		}
		//玻璃
	$scope.glass = [{
		'show': '国产玻璃',
		'tex': '1'
	}, {
		'show': '进口玻璃',
		'tex': '2'
	}];
	$scope.gla = function(x, data) {
		$scope.gl = x;
		$scope.sh_5 = true;
		$scope.cla3 = "icon-ES-xiala"
	}
	$scope.sh_5 = true;
	$scope.cla3 = "icon-ES-xiala"
	$scope.show_5 = function() {
			$scope.sh_5 = !$scope.sh_5;
			if($scope.cla3 == "icon-ES-xiala") {
				$scope.cla3 = "icon-shangla"

			} else if($scope.cla3 == "icon-shangla") {
				$scope.cla3 = "icon-ES-xiala"
			}
		}
		//车身险
	$scope.carbody = [
		"2000", "5000", "10000", "20000"
	]
	$scope.ca = function(x, data) {
		$scope.cards = x;
		$scope.sh_4 = true;
		$scope.cla2 = "icon-ES-xiala"
	}
	$scope.sh_4 = true;
	$scope.cla2 = "icon-ES-xiala"
	$scope.show_4 = function() {
		$scope.sh_4 = !$scope.sh_4;
		if($scope.cla2 == "icon-ES-xiala") {
			$scope.cla2 = "icon-shangla"

		} else if($scope.cla2 == "icon-shangla") {
			$scope.cla2 = "icon-ES-xiala"
		}
	}

	$scope.phone = function() {

		if($scope.tel) {
			if(!(/^1[34578]\d{9}$/.test($scope.tel))) {
				//alert("手机号码有误，请重填");
				fordata.errors_2('手机号码有误，请重填')
				return false;
			}
		}
	}
	$scope.ss = function() {

		if($("#cid").val()) {

			if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test($("#cid").val()))) {
				//alert("身份证格式错误，请重新填写");
				fordata.errors_2('身份证格式错误，请重新填写')
				return false;
			}
		}
	}
	$scope.close = function() {
		$('.selects').css('display', 'none')

	}
	$scope.sure = function() {
		$('.selects').css('display', 'none')

	}
	var _kindList = [];
	$scope.srder = function() {
		if($scope.agree_1) {
			var s = {
				"kindCode": "FORCEPREMIUM",
				"amount": '投保',
				"flag": '投保'
			}
			_kindList.push(s)
		}
		//机动车损失险
		if($scope.agree_3) {
			var s = {
				"kindCode": "A",
				"amount": '投保',
				"flag": $scope.vehicle
			}
			_kindList.push(s)
		}
		if($scope.franchise_1) {
			var s = {
				"kindCode": "MA",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//商业第三者责任险
		if($scope.agree_4) {
			var s = {
				"kindCode": "B",
				"amount": $scope.zi.tex,
				"flag": ''
			}
			_kindList.push(s)
		}
		if($scope.franchise_2) {
			var s = {
				"kindCode": "MB",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//车上人员责任保险(驾驶员)
		if($scope.agree_5) {
			var s = {
				"kindCode": "D3",
				"amount": $scope.dri.tex,
				"flag": ''
			}
			_kindList.push(s)
		}
		if($scope.franchise_3) {
			var s = {
				"kindCode": "MD3",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//车上人员责任保险(乘客)
		if($scope.agree_6) {
			var s = {
				"kindCode": "D4",
				"amount": $scope.pas.tex,
				"flag": ''
			}
			_kindList.push(s)
		}
		if($scope.franchise_4) {
			var s = {
				"kindCode": "MD4",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//全车盗抢险
		if($scope.agree_7) {
			var s = {
				"kindCode": "G1",
				"amount": "投保",
				"flag": $scope.pilfer
			}
			_kindList.push(s)
		}
		if($scope.franchise_5) {
			var s = {
				"kindCode": "MG1",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//车身划痕损失险
		if($scope.agree_8) {
			var s = {
				"kindCode": "L",
				"amount": $scope.cards,
				"flag": ''
			}
			_kindList.push(s)
		}
		if($scope.franchise_6) {
			var s = {
				"kindCode": "ML",
				"amount": 'Y',
				"flag": ''
			}
			_kindList.push(s)
		}
		//指定修理厂
		if($scope.agree_9) {
			var s = {
				"kindCode": "Q3",
				"amount": "投保",
				"flag": ''
			}
			_kindList.push(s)
		}
		//自然损失险
		if($scope.agree_10) {
			var s = {
				"kindCode": "Z",
				"amount": "投保",
				"flag": ''
			}
			_kindList.push(s)
		}
		//玻璃单独破碎险
		if($scope.agree_11) {
			var s = {
				"kindCode": "F",
				"amount": "Y",
				"flag": $scope.gl.tex
			}
			_kindList.push(s)
		}
		//发动机涉水损失险
		if($scope.agree_12) {
			var s = {
				"kindCode": "X1",
				"amount": "Y",
				"flag": ""
			}
			_kindList.push(s)
		}
		//机动车损失保险无法找到第三方
		if($scope.agree_13) {
			var s = {
				"kindCode": "Z3",
				"amount": "Y",
				"flag": ""
			}
			_kindList.push(s)
		}
		if(!$scope._ciStartDate) {
			$scope._ciStartDate = " "
		}
		var jisons = {
			//userId,$scope._ciStartDate, $scope._biStartDate, orderId,_kindList
			"kindList": _kindList,
			"ciStartDate": $scope._ciStartDate,
			"biStartDate": $scope._biStartDate,
			"userId": userId,
			"orderId": orderId

		}
		console.log(jisons)
		Orderajax.updateKindCode(jisons, "./outSingle.html#/siglebijia");
		Orderajax.getCompanys(userId, $scope._carId, $scope._cityCode);
		localStorage.setItem("chenge_orderId", orderId);
	}
}]);
Single.controller('comparison', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {

	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	$('.flogbox').css('display', 'block');
	$('.flogbox p').css('display', 'none');
	$('.texta').text("请求中请稍候。。。");
	$http({
		method: "POST",
		url: intUrl + '/app/order/getOrderDetailDataVO',
		//url : intUrl +'/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderId": orderId
				//"orderStatus":"未完成"
		}
	}).
	success(function(res) {
		var data = res.data;
		console.log(res)
		if(res.flag == "error") {
			//alert(res.msg);
			fordata.errors_2(res.msg)
			window.history.back(-1);

		} else if(res.flag == "success") {
			$('.flogbox').css('display', 'none');
			$('.flogbox p').css('display', 'block');
			$('.texta').text("请求中请稍候。。。");
			$scope._orderId = data.orderId;
			//车辆
			if(data.licenseNo == "新车") {

				$scope._licenseNo = "新车";
				$scope._licenseNo2 = "新车";

			} else {
				$scope._licenseNo = data.licenseNo;
				$scope._licenseNo2 = data.licenseNo;
			}

			$scope._modelName = data.modelName;
			$scope._frameNo = data.frameNo;
			$scope._engineNo = data.engineNo;
			$scope._licenseDate = fordata.formatDate2(data.licenseDate);
			$scope._modelCode = data.modelCode;
			$scope._carId = data.carId;
			$scope._specialCarDate = data.specialCarDate;
			if(!data.modelName && !data.frameNo && !data.engineNo && !data.licenseDate && !data.modelCode) {
				//alert("车辆信息不全请补全车辆信息")
				fordata.errors_2('车辆信息不全请补全车辆信息')
					//window.location.href="./outSingle.html#/siglecar"
			}
			//险种
			$scope.cflag = data.precisionPriceVO.flag;
			if(data.precisionPriceVO.flag == "success") {
				if(data.precisionPriceVO.totalPremium > 0) {
					$('.shous').css('display', 'none');
					$('.shoua').css('display', 'none');

					$('.one').css('display', 'block');

					var arr1 = data.precisionPriceVO.dealCredit;
					var arr2 = new Array();
					for(var i = 0; i < arr1.length; i++) {
						arr2.push([i + 1, arr1[i]]);
					}
					$scope._dealCredit = arr2;

					$scope.findC = findAllCompany;
					//$scope.findC = 
					$scope.intUrl = intUrl;

					$scope.kindelist = loadKindList;
					$scope.KindListshow = KindListshow;
					if(data.precisionPriceVO.insureComCode) {

						$scope._insureComCode = data.precisionPriceVO.insureComCode;
						$scope.findC = findAllCompany;
					} else {
						$scope.findC = '0';
						$scope._insureComCode = '0'
					}
					$scope.ms = data.precisionPriceVO.kindList;

					$scope._channelCode = data.precisionPriceVO.channelCode;
					$scope._insureComCode = data.precisionPriceVO.insureComCode;
					$scope._totalPremium = data.precisionPriceVO.totalPremium;
					$scope._Credit = data.precisionPriceVO.credit;
					$scope._biPremium = data.precisionPriceVO.biPremium;
					$scope._ciPremium = data.precisionPriceVO.ciPremium;
					$scope._vehicleTaxPremium = data.precisionPriceVO.vehicleTaxPremium
					$scope._ciStartDate = fordata.formatDate2(data.precisionPriceVO.ciStartDate);
					$scope._biStartDate = fordata.formatDate2(data.precisionPriceVO.biStartDate);

				} else {
					$('.shous').css('display', 'none')
					var par = JSON.parse(sessionStorage.getItem("par"));
					console.log(par)
					$scope.grame = par;
					$scope.findC = findAllCompany;

					$scope.intUrl = intUrl;
					var lisd = [];
					$scope._ciStartDate = fordata.formatDate2(data.ciStartDate);
					$scope._biStartDate = fordata.formatDate2(data.biStartDate);

					var svd = 0;
					for(var b = 0; b < par.length; b++) {
						svd++
						if(par[b].channel.length > 1) {
							svd++
						}
						console.log(svd)
					}

					for(var s = 0; s < par.length; s++) {
						$('.flogbox').css('display', 'block');
						$('.flogbox p').css('display', 'none');
						$('.texta').text("报价请求中请稍候。。。");

						if(par[s].channel.length > 1) {
							for(var j = 0; j < par[s].channel.length; j++) {
								$http({
									method: "POST",
									url: intUrl + '/app/lnsure/loadPrecisionPrice',

									params: {
										"orderId": $scope._orderId,
										"insurerCode": par[s].companyCode,
										"channelCode": par[s].channel[j].localChannelCode,
										"userId": userId
									}
								}).
								success(function(res) {
									lisd.push(res.data)
										//console.log(res.data)
									var data = lisd;
									$('.shoua').css('display', 'none');
									$('.shous').css('display', 'block');

									if(svd == lisd.length) {
										$('.flogbox').css('display', 'none');
										$('.flogbox p').css('display', 'block');
										$('.texta').text("");
									}
									if(data.flag == "success") {
										$scope.listd = data;

									} else {
										$scope.listd = data;
										$scope._channelCode = res.data[0].msg
									}

								}).
								error(function() {
									$('.flogbox').css('display', 'block');
									$('.flogbox p').css('display', 'block');
									$('.texta').text("网络请求失败");

									if(svd == lisd.length) {
										$('.flogbox').css('display', 'none');
										$('.flogbox p').css('display', 'block');
										$('.texta').text("");
									}
								})
							}

						} else {
							$http({
								method: "POST",
								url: intUrl + '/app/lnsure/loadPrecisionPrice',
								//url : intUrl +'/app/order/findMainOrder',
								params: {
									"orderId": $scope._orderId,
									"insurerCode": par[s].companyCode,
									"channelCode": par[s].channel[0].localChannelCode,
									"userId": userId
								}
							}).
							success(function(res) {
								lisd.push(res.data)
								console.log(lisd)
								var data = lisd;
								$('.shoua').css('display', 'none');
								$('.shous').css('display', 'block');

								if(svd == lisd.length) {
									$('.flogbox').css('display', 'none');
									$('.flogbox p').css('display', 'block');
									$('.texta').text("");
								}
								if(data.flag == "success") {
									$scope.listd = data;

								} else {
									$scope.listd = data;
									$scope._channelCode = res.data[0].msg
								}

							}).
							error(function() {
								$('.flogbox').css('display', 'block');
								$('.flogbox p').css('display', 'block');
								$('.texta').text("网络请求失败");
								console.log(sv + '点点' + lisd.length)

								if(svd == lisd.length) {
									$('.flogbox').css('display', 'none');
									$('.flogbox p').css('display', 'block');
									$('.texta').text("");
								}
							})

						}
					}

				}
				//奖励积分

			}

		}
	}).
	error(function(data, status) {

		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'block');
		$('.texta').text("网络请求失败");
	});

	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.td_show = true
	$scope.tdif = function() {
		$scope.td_show = !$scope.td_show;
	}
	$scope.toubao = function(item, data) {
		console.log(item);
		console.log(orderId, item[0].precisionPriceId, item[0].biStartDate, item[0].ciStartDate)
		Orderajax.chooseInsurance(orderId, item[0].precisionPriceId, item[0].biStartDate, item[0].ciStartDate)
	}
}]);
Single.controller('comparison_2', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {

	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	$('.flogbox').css('display', 'block');
	$('.flogbox p').css('display', 'none');
	$('.texta').text("请求中请稍候。。。");
	$http({
		method: "POST",
		url: intUrl + '/app/order/getOrderDetailDataVO',
		//url : intUrl +'/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderId": orderId
				//"orderStatus":"未完成"
		}
	}).
	success(function(res) {
		var data = res.data;
		console.log(res)
		if(res.flag == "error") {

			$('.flogbox').css('display', 'block');
			$('.flogbox p').css('display', 'block');
			$('.texta').text(res.msg);
			window.history.back(-1);

		} else if(res.flag == "success") {

			$scope._orderId = data.orderId;
			//车辆
			if(data.licenseNo == "新车") {

				$scope._licenseNo = "新车";
				$scope._licenseNo2 = "新车";

			} else {
				$scope._licenseNo = data.licenseNo;
				$scope._licenseNo2 = data.licenseNo;
			}

			$scope._modelName = data.modelName;
			$scope._frameNo = data.frameNo;
			$scope._engineNo = data.engineNo;
			$scope._licenseDate = fordata.formatDate2(data.licenseDate);
			$scope._modelCode = data.modelCode;
			$scope._carId = data.carId;
			$scope._specialCarDate = data.specialCarDate;
			if(!data.modelName && !data.frameNo && !data.engineNo && !data.licenseDate && !data.modelCode) {
				//alert("车辆信息不全请补全车辆信息")
				fordata.errors_2("车辆信息不全请补全车辆信息")
					//window.location.href="./outSingle.html#/siglecar"
			}
			//险种
			$scope.cflag = data.precisionPriceVO.flag;
			$('.shous').css('display', 'none')
			var par = JSON.parse(sessionStorage.getItem("par"));
			console.log(par)
			$scope.grame = par;
			$scope.findC = findAllCompany;
			var sv;
			$scope.intUrl = intUrl;
			var lisd = [];
			$scope._ciStartDate = fordata.formatDate2(data.ciStartDate);
			$scope._biStartDate = fordata.formatDate2(data.biStartDate);
			var svd = 0;
			for(var b = 0; b < par.length; b++) {
				svd++
				if(par[b].channel.length > 1) {
					svd++
				}
				console.log(svd)
			}

			for(var s = 0; s < par.length; s++) {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'none');
				$('.texta').text("报价请求中请稍候。。。");

				if(par[s].channel.length > 1) {
					for(var j = 0; j < par[s].channel.length; j++) {
						$http({
							method: "POST",
							url: intUrl + '/app/lnsure/loadPrecisionPrice',

							params: {
								"orderId": $scope._orderId,
								"insurerCode": par[s].companyCode,
								"channelCode": par[s].channel[j].localChannelCode,
								"userId": userId
							}
						}).
						success(function(res) {
							lisd.push(res.data)
								//console.log(res.data)
							var data = lisd;
							$('.shoua').css('display', 'none');
							$('.shous').css('display', 'block');

							if(svd == lisd.length) {
								$('.flogbox').css('display', 'none');
								$('.flogbox p').css('display', 'block');
								$('.texta').text("");
							}
							if(data.flag == "success") {
								$scope.listd = data;

							} else {
								$scope.listd = data;
								$scope._channelCode = res.data[0].msg
							}

						}).
						error(function() {
							$('.flogbox').css('display', 'block');
							$('.flogbox p').css('display', 'block');
							$('.texta').text("网络请求失败");

							if(svd == lisd.length) {
								$('.flogbox').css('display', 'none');
								$('.flogbox p').css('display', 'block');
								$('.texta').text("");
							}
						})
					}

				} else {
					$http({
						method: "POST",
						url: intUrl + '/app/lnsure/loadPrecisionPrice',
						//url : intUrl +'/app/order/findMainOrder',
						params: {
							"orderId": $scope._orderId,
							"insurerCode": par[s].companyCode,
							"channelCode": par[s].channel[0].localChannelCode,
							"userId": userId
						}
					}).
					success(function(res) {
						lisd.push(res.data)
						console.log(lisd)
						var data = lisd;
						$('.shoua').css('display', 'none');
						$('.shous').css('display', 'block');

						if(svd == lisd.length) {
							$('.flogbox').css('display', 'none');
							$('.flogbox p').css('display', 'block');
							$('.texta').text("");
						}
						if(data.flag == "success") {
							$scope.listd = data;

						} else {
							$scope.listd = data;
							$scope._channelCode = res.data[0].msg
						}

					}).
					error(function() {
						$('.flogbox').css('display', 'block');
						$('.flogbox p').css('display', 'block');
						$('.texta').text("网络请求失败");
						console.log(sv + '点点' + lisd.length)

						if(svd == lisd.length) {
							$('.flogbox').css('display', 'none');
							$('.flogbox p').css('display', 'block');
							$('.texta').text("");
						}
					})

				}
			}

		}
	}).
	error(function(data, status) {

		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'block');
		$('.texta').text("网络请求失败");
	});
	$scope.sures = function() {

		$('.flogbox').css('display', 'none')
	}
	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.td_show = true
	$scope.tdif = function() {
		$scope.td_show = !$scope.td_show;
	}
	$scope.toubao = function(item, data) {
		console.log(item);
		console.log(orderId, item[0].precisionPriceId, item[0].biStartDate, item[0].ciStartDate)
		Orderajax.chooseInsurance("outSingle.html#/sigleappli", orderId, item[0].precisionPriceId, item[0].biStartDate, item[0].ciStartDate)
	}
}]);

Single.controller('basic_applic', ['$scope', '$http', '$state', '$filter', function($scope, $http, $state, $filter) {
	//修改带出信息
	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("chenge_orderId");
	$http({
		method: "POST",
		url: intUrl + '/app/order/getOrderDetailDataVO',
		//url : intUrl +'/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderId": orderId
				//"orderStatus":"未完成"
		}
	}).
	success(function(res) {
		var data = res.data;
		console.log(res)
		if(res.flag == "error") {
			console.log(res.msg);
			fordata.errors_2(res.msg)
			window.history.back(-1)
		} else if(res.flag == "success") {
			$scope._orderId = data.orderId;
			$scope._createTime = fordata.formatDate(data.createTime);
			$scope._type = data.agentName;
			$scope._cityCode = data.cityCode;
			$scope._custName = data.custName;
			$scope._custName2 = data.custName;
			$scope.__customerId = data.customerId;
			$scope._phoneNo = data.phoneNo;
			$scope._phoneNo2 = data.phoneNo;
			$scope._cappId = data.cappId;
			$scope._showId = data.showId;
			$scope._registerDate = fordata.formatDate(data.registerDate);
			$scope._specialCarDate = fordata.formatDate(data.specialCarDate);

			$scope.sds = function() {
				//alert($scope.yes)
				if($scope.yes == "true") {
					$('#datebut2').removeAttr('disabled')
				}
			}
			$scope.sds2 = function() {
				if($scope.yes == "false") {

					$('#datebut2').attr('disabled', 'disabled')
				}
			}
			if(data.applicantAsOwner == true) { //投保人信息
				$scope.agree3 = true;
				$(".tob input").attr('disabled', "disabled");
				$scope._applicantName = data.custName;
				$scope._applicantMobile = data.phoneNo;
				$scope._applicantIdNo = data.cappId;
			} else {
				$scope._applicantName = data.applicantName;
				$scope._applicantMobile = data.applicantMobile;
				$scope._applicantIdNo = data.applicantIdNo;
			}
			if(data.insuredAsOwner == true) { //被保人信息
				$(".btob input").attr('disabled', "disabled");
				$scope.agree_2 = true;
				$scope._insuredName = data.custName;
				$scope._insuredMobile = data.phoneNo;
				$scope._insuredIdNo = data.cappId;
			} else {
				$scope._insuredName = data.insuredName;
				$scope._insuredMobile = data.insuredMobile;
				$scope._insuredIdNo = data.insuredIdNo;
			}
			//车辆信息
			if(data.licenseNo == "新车") {

				$scope._licenseNo = "新车";
				$scope._licenseNo2 = "新车";
				$scope.agree = true;

			} else {
				$scope._licenseNo = data.licenseNo;
				$scope._licenseNo2 = data.licenseNo;
				$scope.agree = false;
			}

			$scope._modelName = data.modelName;
			$scope._frameNo = data.frameNo;
			$scope._engineNo = data.engineNo;
			$scope._licenseDate = fordata.formatDate2(data.licenseDate);
			$scope._modelCode = data.modelCode;
			$scope._carId = data.carId;
			$scope._specialCarDate = data.specialCarDate;
			$scope._gift = data.gift;
			$scope._giftAddresseeDetails = data.giftAddresseeDetails;
			$scope._giftAddresseeName = data.giftAddresseeName;
			$scope._giftAddresseeMobile = data.giftAddresseeMobile;
			$scope._giftAddresseeCounty = data.giftAddresseeCounty;
			$scope._giftAddresseeCity = data.giftAddresseeCity;
			$scope._giftAddresseeProvince = data.giftAddresseeProvince;
			$scope._customerId = data.customerId;
			$scope._addressAsGift = data.addressAsGift;
			$scope.xiancode = data.addresseeCounty;
			$scope.shicode = data.addresseeCity;
			$scope.shengcode = data.addresseeProvince;

			$scope._cityCodeshowe = showshengfen.showname(data.addresseeProvince) + showshengfen.showname(data.addresseeCity) + showshengfen.showname(data.addresseeCounty)
			$scope._addresseeDetails = data.addresseeDetails;
			console.log(data.addresseeDetails)
				//配送信息
			if(data.addresseeName == data.custName) {
				$scope.agree_3 = true;
				$("#sw").attr('disabled', "disabled");
				$scope._addresseeName = data.custName;
			} else {
				$scope._addresseeName = data.addresseeName;
			}

			if(data.addresseeMobile == data.phoneNo) {
				$scope.agree_4 = true;
				$("#sw1").attr('disabled', "disabled");
				$scope._addresseeMobile = data.phoneNo;
			} else {
				$scope._addresseeMobile = data.addresseeMobile;
			}

			//			$scope._addresseeProvince = data.addresseeProvince;
			//			$scope._addresseeCity = data.addresseeCity;
			$scope._policyEmail = data.policyEmail;
			$scope._insuredAddress = data.insuredAddress;
			if(data.insuredAsAddress == true) {
				//	$scope._addresseeDetails = data.insuredAddress;
				$("#diz").attr('disabled', "disabled");
				$scope.agree_5 = true;
			} else {
				//$scope._addresseeDetails = data.addresseeDetails;

			}

			//alert($scope.city)

		}

	}).
	error(function(data, status) {
		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'block');
		$('.texta').text("网络请求失败");
	});
	//交强起保日期

	$scope.sures = function() {

		$('.flogbox').css('display', 'none')
		window.location.href = "./MyOrder.html#/myorder"
	}

	//页面交互
	$scope.phone_show = true;
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	}
	$scope.cityBlock = function() {
		$('.selects').css('display', 'block')
	}

	$scope.as1 = function() {
		//alert(1)
		if($scope.agree) {
			$(".tob input").attr('disabled', "disabled");
		} else {
			$(".tob input").removeAttr('disabled')
		}
	}
	$scope.as1 = function() {
		//alert(1)
		if($scope.agree3) {
			$(".tob input").attr('disabled', "disabled");
		} else {
			$(".tob input").removeAttr('disabled')
		}
	}
	$scope.as2 = function() {
		if($scope.agree_2) {
			$(".btob input").attr('disabled', "disabled");
		} else {
			$(".btob input").removeAttr('disabled')
		}
	}
	$scope.as5 = function() {
		if($scope.agree_5) {
			$("#diz").attr('disabled', "disabled");
		} else {
			$("#diz").removeAttr('disabled')
		}
	}
	$scope.as3 = function() {
		if($scope.agree_3) {
			$("#sw").attr('disabled', "disabled");
		} else {
			$("#sw").removeAttr('disabled')
		}
	}
	$scope.as4 = function() {
		if($scope.agree_4) {
			$("#sw1").attr('disabled', "disabled");
		} else {
			$("#sw1").removeAttr('disabled')
		}
	}
	$scope.cityBlock = function() {
		$('.selects').css('display', 'block');
		$scope.sheng = shengs_1.province;

	}
	$scope.shengbranname = function(item, data) {
		console.log(item)

		$scope.ites = item[6].city;
		$scope._cityCodeshowe = item[0]
		$scope.shengname = item[0]
		$scope.shengcode = item[4]
	}
	$scope.shiname = function(item, data) {
		console.log(item);
		if(item[7]) {
			$scope.ites_2 = item[7].district
			$scope._cityCodeshowe = $scope.shengname + item[0]
			$scope._cityCode = item[6];
			$scope.shicode = item[6]
			$scope.shinames = $scope._cityCodeshowe
			$scope._nmes = $scope.shinames
		} else {
			$scope.ites_2 = ""
			$scope._cityCodeshowe = $scope.shengname + item[0]

			$scope._licenseNo2 = item[3]
			$scope.shicode = item[6]
			$scope._cityCode = item[6];
			$scope.shinames = $scope._cityCodeshowe
			$scope._nmes = $scope.shinames
		}

	}
	$scope.xianqu = function(item, data) {
		console.log(item);
		$scope._licenseNo = item[3]
		$scope._cityCode = item[6];
		$scope._cityCodeshowe = $scope.shinames + item[0]
		$scope.xiancode = item[6]
	}
	$scope.close = function() {
		$('.selects').css('display', 'none')

	}
	$scope.sure = function() {
		$('.selects').css('display', 'none')

	}
	$scope.emil = function() {
		if($scope._policyEmail) {
			if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope._policyEmail))) {

				fordata.errors_2("邮箱格式不对，请重填")
				return false;
			}
		}
	}
	$scope.shoji = function() {
			if($scope._addresseeMobile) {
				if(!(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test($scope._addresseeMobile))) {

					fordata.errors_2("手机号式不对，请重填")
					return false;
				}
			}
		}
		//投保配送信息
	$scope.applicant = function() {
		//alert($scope._cappId);
		var orderId = localStorage.getItem("chenge_orderId");
		var applicantAsOwner = $scope.agree3;
		var insuredAsOwner = $scope.agree_2;
		var insuredAsAddress = $scope.agree_5;
		var citys = $scope.city;
		var addresseeCounty = $scope.xiancode;
		var addresseeCity = $scope.shicode;
		var addresseeProvince = $scope.shengcode;
		var addresseeDetails = $scope._addresseeDetails;

			$scope._giftType = true;
			$scope._gift = "不赠送";
		$scope._giftMan="无";

			$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'none');
		$('.texta').text("请求中，请稍候...");
		console.log(userId, orderId, applicantAsOwner, $scope._applicantName, $scope._applicantIdNo, $scope._applicantMobile, insuredAsOwner, $scope._insuredName, $scope._insuredIdNo, $scope._insuredMobile, insuredAsAddress, $scope._insuredAddress, $scope._gift,$scope._giftMan, $scope._giftType, $scope._addresseeName, $scope._addresseeMobile, $scope._addresseeDetails, addresseeCounty, addresseeCity, addresseeProvince, $scope._policyEmail, $scope._customerId, $scope._addressAsGift, $scope._giftAddresseeDetails, $scope._giftAddresseeName, $scope._giftAddresseeMobile, $scope._giftAddresseeCounty, $scope._giftAddresseeCity, $scope._giftAddresseeProvince)
		Orderajax.saveAdditionalInfo(userId, orderId, applicantAsOwner, $scope._applicantName, $scope._applicantIdNo, $scope._applicantMobile, insuredAsOwner, $scope._insuredName, $scope._insuredIdNo, $scope._insuredMobile, insuredAsAddress, $scope._insuredAddress, $scope._gift,$scope._giftMan, $scope._giftType, $scope._addresseeName, $scope._addresseeMobile, $scope._addresseeDetails, addresseeCounty, addresseeCity, addresseeProvince, $scope._policyEmail, $scope._customerId, $scope._addressAsGift, $scope._giftAddresseeDetails, $scope._giftAddresseeName, $scope._giftAddresseeMobile, $scope._giftAddresseeCounty, $scope._giftAddresseeCity, $scope._giftAddresseeProvince)
		localStorage.setItem("_orderId", orderId)
	}

}]);
Single.controller('detailed_hebao', ['$scope', '$http', '$state', function($scope, $http, $state) {
	//跳转修改页面
	var userId = localStorage.getItem("userId");
	var orderId = localStorage.getItem("_orderId");

	$http({
		method: "POST",
		url: intUrl + '/app/order/getOrderDetailDataVO',
		//url : intUrl +'/app/order/findMainOrder',
		params: {
			"userId": userId,
			"orderId": orderId
				//"orderStatus":"未完成"
		}
	}).
	success(function(res) {
		var data = res.data;

		console.log(res)
		if(res.flag == "error") {
			//alert(res.msg);
			//fordata.errors_2(res.msg)
			$('.flogbox').css('display', 'block')
			$('.flogbox p').css('display', 'block')
			$('.flogbox em').text(res.msg)
				//window.history.back(-1)
		} else if(res.flag == "success") {

			if(data.orderStatus == "已失效") {
				$('.shixiao').css('display', 'block');
				$('.adisable').css('display', 'none');
			} else if(data.orderStatus == "未完成") {
				$('.weiwanc').css('display', 'block');
			} else if(data.orderStatus == "已支付") {
				$('.pad').css('display', 'block');
				$('.adisable').css('display', 'none');
			} else if(data.orderStatus == "待支付") {
				$('.daizhi').css('display', 'block');
				$('.adisable').css('display', 'none');
			} else if(data.orderStatus == "核保中") {
				$('.pad').css('display', 'block');
				$('.pad').text("核保中");

			} else {
				$('.pad').css('display', 'block');
				$('.pad').text(data.orderStatus);
			}
			$('.flogbox').css('display', 'none')
			$('.flogbox em').text('')

			$scope._orderId = data.orderId;
			$scope._createTime = fordata.formatDate(data.createTime);
			$scope._type = data.agentName;
			$scope._cityCode = data.cityCode;
			console.log(vinc)
				//显示地址
			$scope._cityCodeshowe = showshengfen.shows(data.cityCode)

			$scope._custName = data.custName;
			$scope._phoneNo = data.phoneNo;
			$scope._cappId = data.cappId;
			$scope._showId = data.showId;
			if(data.applicantAsOwner == true) { //投保人信息
				$scope._applicantName = data.custName;
				$scope._applicantMobile = data.phoneNo;
				$scope._applicantIdNo = data.cappId;
			} else {
				$scope._applicantName = data.applicantName;
				$scope._applicantMobile = data.applicantMobile;
				$scope._applicantIdNo = data.applicantIdNo;
			}
			if(data.insuredAsOwner == true) { //被保人信息
				$scope._insuredName = data.custName;
				$scope._insuredMobile = data.phoneNo;
				$scope._insuredIdNo = data.cappId;
			} else {
				$scope._insuredName = data.insuredName;
				$scope._insuredMobile = data.insuredMobile;
				$scope._insuredIdNo = data.insuredIdNo;
			}
			//车辆信息
			$scope._licenseNo = data.licenseNo;
			$scope._modelName = data.modelName;
			$scope._frameNo = data.frameNo;
			$scope._engineNo = data.engineNo;
			$scope._licenseDate = fordata.formatDate(data.licenseDate);
			$scope._registerDate = fordata.formatDate2(data.registerDate)
			if(data.specialCarFlag == false) {
				$scope._specialCarFlag = "否";
			} else if(data.specialCarFlag == true) {
				$scope._specialCarFlag = "是";
			}
			//承保信息

			if(data.precisionPriceVO.insureComCode) {

				$scope._insureComCode = data.precisionPriceVO.insureComCode;
				$scope.findC = findAllCompany;
			} else {
				$scope.findC = '0';
				$scope._insureComCode = '0'

			}
			$scope._totalPremium = data.precisionPriceVO.totalPremium;
			$scope._Credit = data.precisionPriceVO.credit;
			$scope._biPremium = data.precisionPriceVO.biPremium;
			$scope._ciPremium = data.precisionPriceVO.ciPremium;
			$scope._vehicleTaxPremium = data.precisionPriceVO.vehicleTaxPremium
			$scope._ciStartDate = fordata.formatDate(data.precisionPriceVO.ciStartDate); //起保日期
			$scope._biStartDate = fordata.formatDate(data.precisionPriceVO.biStartDate);

			var arr1 = data.precisionPriceVO.dealCredit;
			var arr2 = new Array();
			for(var i = 0; i < arr1.length; i++) {
				arr2.push([i + 1, arr1[i]]);
			}
			$scope._dealCredit = arr2;
			//$scope._dealCredit = [
			//					["100积分,优惠券"],["200积分,创建订单奖励"],["300积分,徒弟出单奖励"]
			//				];

			//险别信息
			$scope.kindList = data.precisionPriceVO.kindList;
			//配送信息
			$scope._addresseeName = data.addresseeName;
			$scope._addresseeMobile = data.addresseeMobile;
			$scope._addresseeDetails = data.addresseeDetails;
			$scope._policyEmail = data.policyEmail;
			$scope._gift= data.gift;
		}

	}).
	error(function(data, status) {

		fordata.errors_2("出错稍后重试")
	});
	$scope._chenge = function() {
		console.log($scope._orderId)

		localStorage.setItem("chenge_orderId", $scope._orderId);
	};
	$scope._chengeno = function() {
		if($scope._licenseNo && $scope._modelName && $scope._frameNo && $scope._engineNo) {
			localStorage.setItem("chenge_orderId", $scope._orderId);
			window.location.href = "./xian.html#/Insurance"
		} else {
			$('.flogbox').css('display', 'block');
			$('.flogbox em').text('车辆信息不全，请补全信息')
		}
	};
	$scope.sureque = function() {
		if($scope._licenseNo && $scope._modelName && $scope._frameNo && $scope._engineNo && $scope._totalPremium && $scope._addresseeName && $scope._addresseeMobile && $scope._addresseeDetails) {
			fordata.shows();
			Interface.hebao(orderId, userId)

		} else {
			$('.flogbox').css('display', 'block')
			$('.flogbox em').text('信息不全，请补全信息')
		}
	}
	$scope.sure = function() {

		$('.flogbox').css('display', 'none')
	}

	$scope.phone_show = true;
	$scope.firstName = localStorage.getItem("usernume");
	$scope.fistPhoto = localStorage.getItem("photoUr");
	$scope.singout = function() {
		localStorage.removeItem('user');

	}
	$scope.phone_tag = function() {

		$scope.phone_show = !$scope.phone_show;
	};

	$('.flogbox').css('display', 'block')
	$('.flogbox p').css('display', 'none')
	$('.flogbox em').text('数据请求中。。。')

	$scope.sures = function() {
		console.log(2)
		$('.flogbox').css('display', 'none')
			//window.location.href = "./MyOrder.html#/myorder"
	}
	var userdata=JSON.parse(localStorage.getItem("userdata")) 
	$scope.duanxin=function(){
		if($scope._precisionPriceId){
			fordata.shows();
		
		Interface.smsShareOrderInfo(orderId,userdata.userNum,$scope._precisionPriceId)
		}else{
			fordata.errors_2("还没报价")
		}
		
	}
		$scope.diazhifu = function() {
		if($scope._precisionPriceId) {
			fordata.shows();

			Interface.ShareOrderInfo(orderId, userdata.userNum, $scope._precisionPriceId)
		} else {
			fordata.errors_2("还没报价")
		}
	}
	$scope.zhifu = function() {
		if($scope.step=="needCode"){
			$('.codes').css('display','block')
		}else{
			window.open("https://www.baidu.com/")
		}
	}
	$scope.codessure = function() {
		$('.codes').css('display','none');
		Interface.getPayInfo(orderId,$scope._codes)
	}
}]);

Single.filter("shens", function() {
	return function(code) {
		//		if(code.branchName.charAt(str.length - 1)=="市"){
		//			return code
		//		}
		var s;
		if(code) {
			code.forEach(function(item) {
				var str = item.branchName;

				if(item.branchName.charAt(str.length - 1) == "市") {
					//return item
					//s=item
					//console.log(s);
					//return true
				}
			})
		}
		console.log(s)
		return s
	}
});