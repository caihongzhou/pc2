var vinc;
var vinc3;
var findlist;
var loadKindList;
var CarInfo;
var ModelName;
var que;
var shengs_1;
var Interface = {
	lodhtmlTop: function() {
		$('body').load('./tpl/top.html', function(responseTxt, statusTxt, xhr) {
			if(statusTxt == "success") {
				alert("外部内容加载成功！")
			} else {
				alert("Error: " + xhr.status + ": " + xhr.statusText);
			}
		})
	},
	loginUser: function(userName, password) { //登录
		$.ajax({
			type: 'post',
			url: intUrl + '/app/user/login',
			
			data: {
				userName: userName,
				password: password
			},
			success: function(res) {
				console.log(res)
				var data = res.data
				if(res.flag == "success") {
					//alert(getCookie("SESSION"))	
					//console.log(getCookie(key))
					location.href = "index.html#/welocme";
					localStorage.setItem('userId', data.userId);
					//localStorage.setItem("userId", "ff808181580b706c0158184638cb1fb0" )
					localStorage.setItem('photoUr', data.photoUrl);

					localStorage.setItem('usernume', data.realName);
					localStorage.setItem('userdata', JSON.stringify(data));

				} else if(res.flag == "error") {
					$('.tishi').removeClass('hidden')
					$('.tishi').text(res.msg);

				}

			},
			error: function() {

			}
		})

	},
	forgot: function(tel) { //忘记密码获取验证码
		$.ajax({
			type: 'post',
			url: intUrl + '/app/user/getCode',

			data: {
				phoneNo: tel
			},
			success: function(res) {
				console.log(res)

			},
			error: function() {

			}
		})

	},
	Modify: function(tel, code, password) { //忘记密码修改密码
		$.ajax({
			type: 'post',
			url: intUrl + '/app/user/forgetPassword',

			data: {
				password: password,
				phoneNo: tel,
				code: code
			},
			success: function(res) {

				$('.alertbox').css('display', 'block').find('.alert').text('修改成功，正在跳转');
				setTimeout(function() {
					location.href = "index.html#/lo"
					$('.alertbox').css('display', 'none').find('.alert').text(' ');
				}, 1000)

			},
			error: function() {

			}
		})

	},

	Province: function() { //
		$.ajax({
			type: 'get',
			url: "./js/sheng.json",

			data: {

			},
			success: function(res) {

				vinc = res
					//console.log(vinc);
				if(res.flag == "userConflict") {
					window.location.href = "./index.html#/lo"

				}

			},
			error: function() {

			}
		})

	},
	Province_2: function() { //
		$.ajax({
			type: 'post',
			url: intUrl + "/app/area/getCityByProvince",
	
			data: {
				"province": "00"
			},
			success: function(res) {

				vinc2 = res.data
				console.log(vinc2);
				if(res.flag == "userConflict") {
					window.location.href = "./index.html#/lo"

				}

			},
			error: function() {

			}
		})

	},
	Province_3: function(branchId) { //
		$.ajax({
			type: 'post',
			url: intUrl + "/app/area/getCityByProvince",

			data: {
				"province": branchId
			},
			success: function(res) {

				vinc3 = res.data
				console.log(vinc3);
				if(res.flag == "userConflict") {
					window.location.href = "./index.html#/lo"

				}

			},
			error: function() {

			}
		})

	},

	verifyApply: function(userId, carId) { //确定获取数据
		$.ajax({
			type: 'post',
			url: intUrl + '/app/customerData/verifyApply',

			data: {
				"userId": userId,
				"carId": carId
			},
			success: function(res) {
				console.log(res);

			},
			error: function() {

			}
		})
	},

	loadKindList: function() {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/kind/loadKindList',
	
			data: {

			},
			success: function(res) {
				console.log(res)
				sloadKindList = res.data;
			},
			error: function() {

			}
		})
	},

	loadShowInfo: function() {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/kind/loadKindOptionList',
	
			data: {

			},
			success: function(res) {
				console.log(res)
				KindListshow = res.data
			},
			error: function() {

			}
		})
	},
	findAllCompany: function() {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/company/findAllCompany',
	
			data: {

			},
			success: function(res) {
				console.log(res)
				findAllCompany = res.data
			},
			error: function() {

			}
		})
	},
	hebao: function(orderId,userId) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/lnsure/checkInsurance',

			data: {
				"orderId":orderId,
				"userId":userId
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					window.location.href="./MyOrder.html#/myorder"
					
				} else if(res.flag == "error") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "fail") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "NoExternalDialing") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "needQuotedPrice") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "sync") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg+"已提交人工审核，审核结果会以通知方式下发给你，请留意");
				}else if(res.flag == "needCode") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "needParity") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}else if(res.flag == "forbidPay") {
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg+"请联系客服，或线下支付");
				}
				
			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	smsShareOrderInfo: function(orderId,userNum,precisionPriceId) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/order/smsShareOrderInfo',

			data: {
				"orderId":orderId,
				"userNum":userNum,
				"precisionPriceId":precisionPriceId
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
						fordata.errors_2("发送成功");
					
				} else if(res.flag == "error") {
					fordata.errors_2(res.msg);
				}
				
			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	shareOrderInfo: function(orderId,userNum,precisionPriceId) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/order/shareOrderInfo',

			data: {
				"orderId":orderId,
				"userNum":userNum,
				"precisionPriceId":precisionPriceId
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
						fordata.errors_2("发送成功");
					
				} else if(res.flag == "error") {
					fordata.errors_2(res.msg);
				}
				
			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	getPayInfo: function(orderId,code) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/lnsure/getPayInfo',

			data: {
				"orderId":orderId,
				"code":code
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					fordata.nones();
					console.log(res.data)
					window.open(res.data)
				} else if(res.flag == "error") {
					fordata.errors_2(res.msg);
				}
				
			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	
	callBack:function(userId,orderId,exten,phoneNum){
		$.ajax({
			type:"post",
			url:intUrl+'/qiMoCall/toCall',
			data:{
				"userId":userId,
				"exten":exten,
				"phoneNum":phoneNum,
				"orderId":orderId
			},
			success: function(res){
				console.log(res);
				var data = res.data
				if(res.flag == "success"){
					console.log("成功")
				}else if(res.flag == "error"){
					console.log(res.msg);
				}
			},
			error:function(){
				alert("请求信息错误！");
			}
		})
	},
	
}

var Orderajax = {
	dealCustomerInfo: function(userId, licenseNo, ownerName, ownerID, ownerMobile, cityCode, orderId, callId, oldOrderId) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/dealCustomerInfo',

			data: {
				"userId": userId,
				"licenseNo": licenseNo,
				"ownerName": ownerName,
				"ownerIdNo": ownerID,
				"ownerMobile": ownerMobile,
				"cityCode": cityCode,
				"orderId": orderId,
				"callId": callId,
				"oldOrderId": oldOrderId,
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					alert("修改成功");
					window.location.reload()
				}

			},
			error: function() {

			}
		})
	},

	saveAdditionalInfo: function(userId, orderId, applicantAsOwner, applicantName, applicantIdNo, applicantMobile, insuredAsOwner, insuredName, insuredIdNo, insuredMobile, insuredAsAddress, insuredAddress, gift,giftMan,giftType,addresseeName, addresseeMobile, addresseeDetails, addresseeCounty, addresseeCity, addresseeProvince, policyEmail, customerId, addressAsGift, giftAddresseeDetails, giftAddresseeName, giftAddresseeMobile, giftAddresseeCounty, giftAddresseeCity, giftAddresseeProvince) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/saveAdditionalInfo',
			data: {
				"userId": userId,
				"orderId": orderId,
				"applicantAsOwner": applicantAsOwner,
				"applicantName": applicantName,
				"applicantIdNo": applicantIdNo,
				"applicantMobile": applicantMobile,
				"insuredAsOwner": insuredAsOwner,
				"insuredName": insuredName,
				"insuredIdNo": insuredIdNo,
				"insuredMobile": insuredMobile,
				"insuredAsAddress": insuredAsAddress,
				"insuredAddress": insuredAddress,
				"gift": gift,
				"giftMan":giftMan,
				"giftType":giftType,
				"addresseeName": addresseeName,
				"addresseeMobile": addresseeMobile,
				"addresseeDetails": addresseeDetails,
				"addresseeCounty": addresseeCounty,
				"addresseeCity": addresseeCity,
				"addresseeProvince": addresseeProvince,
				"policyEmail": policyEmail,
				"customerId": customerId,
				"addressAsGift": addressAsGift,
				"giftAddresseeDetails": giftAddresseeDetails,
				"giftAddresseeName": giftAddresseeName,
				"giftAddresseeMobile": giftAddresseeMobile,
				"giftAddresseeCounty": giftAddresseeCounty,
				"giftAddresseeCity": giftAddresseeCity,
				"giftAddresseeProvince": giftAddresseeProvince

			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					//alert("修改成功");
					//window.location.reload();
					//Interface.hebao(orderId,userId)
					window.location.href="outSingle.html#/hebao"
				}else{
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}

			},
			error: function() {
				 $('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败。稍后刷新重试");
			}
		})
	},
	saveAdditionalInfo_2: function(userId, orderId, applicantAsOwner, applicantName, applicantIdNo, applicantMobile, insuredAsOwner, insuredName, insuredIdNo, insuredMobile, insuredAsAddress, insuredAddress, gift,giftMan,giftType,addresseeName, addresseeMobile, addresseeDetails, addresseeCounty, addresseeCity, addresseeProvince, policyEmail, customerId, addressAsGift, giftAddresseeDetails, giftAddresseeName, giftAddresseeMobile, giftAddresseeCounty, giftAddresseeCity, giftAddresseeProvince) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/saveAdditionalInfo',
			data: {
				"userId": userId,
				"orderId": orderId,
				"applicantAsOwner": applicantAsOwner,
				"applicantName": applicantName,
				"applicantIdNo": applicantIdNo,
				"applicantMobile": applicantMobile,
				"insuredAsOwner": insuredAsOwner,
				"insuredName": insuredName,
				"insuredIdNo": insuredIdNo,
				"insuredMobile": insuredMobile,
				"insuredAsAddress": insuredAsAddress,
				"insuredAddress": insuredAddress,
				"gift": gift,
				"giftMan":giftMan,
				"giftType":giftType,
				"addresseeName": addresseeName,
				"addresseeMobile": addresseeMobile,
				"addresseeDetails": addresseeDetails,
				"addresseeCounty": addresseeCounty,
				"addresseeCity": addresseeCity,
				"addresseeProvince": addresseeProvince,
				"policyEmail": policyEmail,
				"customerId": customerId,
				"addressAsGift": addressAsGift,
				"giftAddresseeDetails": giftAddresseeDetails,
				"giftAddresseeName": giftAddresseeName,
				"giftAddresseeMobile": giftAddresseeMobile,
				"giftAddresseeCounty": giftAddresseeCounty,
				"giftAddresseeCity": giftAddresseeCity,
				"giftAddresseeProvince": giftAddresseeProvince

			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					//alert("修改成功");
					//window.location.reload();
					//Interface.hebao(orderId,userId)
						window.history.back(-1)
				}else{
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
					window.location.reload();
				}

			},
			error: function() {
				 $('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败。稍后刷新重试");
			}
		})
	},
	
	updateCarInfo: function(userId, orderId, licenseNo, frameNo, engineNo, modelCode, modelName, registerDate, specialCarFlag, specialCarDate, customerId, carId, seatCount, newCarPrice, licenseDate) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/updateCarInfo',

			data: {
				"userId": userId,
				"orderId": orderId,
				"licenseNo": licenseNo,
				"frameNo": frameNo,
				"engineNo": engineNo,
				"modelCode": modelCode,
				"modelName": modelName,
				"registerDate": registerDate,
				"specialCarFlag": specialCarFlag,
				"specialCarDate": specialCarDate,
				"customerId": customerId,
				"carId": carId,
				"seatCount": seatCount,
				"newCarPrice": newCarPrice,
				"licenseDate": licenseDate
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					//alert("修改成功");

					$('.flogbox').css('display', 'block');
					$('.texta').text("修改成功 ");
					$('.flogbox p').css('display', 'block');
					//window.location.reload()
					window.history.back(-1)
				} else {
					alert("修改失败");
					window.location.reload()

					$('.flogbox').css('display', 'none');
					$('.texta').text(" ");
					$('.flogbox p').css('display', 'block');
				}

			},
			error: function() {
				alert("网络问题，收稍后重试");
				$('.flogbox').css('display', 'none');
				$('.texta').text(" ");
				$('.flogbox p').css('display', 'block');
			}
		})
	},
	setorder: function(href,userId, licenseNo, ownerName, ownerID, ownerMobile, cityCode, orderId, callId, oldOrderId) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/dealCustomerInfo',

			data: {
				"userId": userId,
				"licenseNo": licenseNo,
				"ownerName": ownerName,
				"ownerIdNo": ownerID,
				"ownerMobile": ownerMobile,
				"cityCode": cityCode,
				"orderId": orderId,
				"callId": callId,
				"oldOrderId": oldOrderId,
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {

					var data = res.data;
					var carinfor = {
						"licenseNo": data.licenseNo,
						"frameNo": data.frameNo,
						"modelCode": data.modelCode,
						"modelName": data.modelName,
						"firstRegisterDate": data.firstRegisterDate,
						"specialCarFlag": data.specialCarFlag,
						"specialCarDate": data.specialCarDate,
						"customerId": data.customerId,
						"carId": data.carId,
						"licenseDate": data.licenseDate,
						"orderId": data.orderId
					}
					sessionStorage.setItem("carinfor", JSON.stringify(carinfor));
					localStorage.setItem("chenge_orderId", data.orderId)

					window.location.href = href; 
				}

			},
			error: function() {

			}
		})
	},
	setorder_2: function(userId, licenseNo, ownerName, ownerID, ownerMobile, cityCode, orderId, callId, oldOrderId) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/dealCustomerInfo',

			data: {
				"userId": userId,
				"licenseNo": licenseNo,
				"ownerName": ownerName,
				"ownerIdNo": ownerID,
				"ownerMobile": ownerMobile,
				"cityCode": cityCode,
				"orderId": orderId,
				"callId": callId,
				"oldOrderId": oldOrderId,
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {

					var data = res.data;
					if(!data.licenseNo){
						data.licenseNo="新车"
					}
					var carinfor = {
						"licenseNo": data.licenseNo,
						"frameNo": data.frameNo,
						"modelCode": data.modelCode,
						"modelName": data.modelName,
						"firstRegisterDate": data.firstRegisterDate,
						"specialCarFlag": data.specialCarFlag,
						"specialCarDate": data.specialCarDate,
						"customerId": data.customerId,
						"carId": data.carId,
						"licenseDate": data.licenseDate,
						"orderId": data.orderId
					}
					sessionStorage.setItem("carinfor", JSON.stringify(carinfor));
					localStorage.setItem("chenge_orderId", data.orderId)

					window.history.back(-1)
				}

			},
			error: function() {

			}
		})
	},
	upCarInfo_2: function(userId, orderId, licenseNo, frameNo, engineNo, modelCode, modelName, registerDate, specialCarFlag, specialCarDate, customerId, carId, seatCount, newCarPrice, licenseDate) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/updateCarInfo',

			data: {
				"userId": userId,
				"orderId": orderId,
				"licenseNo": licenseNo,
				"frameNo": frameNo,
				"engineNo": engineNo,
				"modelCode": modelCode,
				"modelName": modelName,
				"registerDate": registerDate,
				"specialCarFlag": specialCarFlag,
				"specialCarDate": specialCarDate,
				"customerId": customerId,
				"carId": carId,
				"seatCount": seatCount,
				"newCarPrice": newCarPrice,
				"licenseDate": licenseDate
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					$('.flogbox').css('display', 'none');
					$('.texta').text(" ");
					$('.flogbox p').css('display', 'block');
					window.history.back(-1)
				} else {
					alert(res.msg);
					$('.flogbox').css('display', 'none');
					$('.texta').text(" ");
					$('.flogbox p').css('display', 'block');
					window.location.reload()
				}

			},
			error: function() {
				alert("网络问题，收稍后重试");
				$('.flogbox').css('display', 'none');
				$('.texta').text(" ");
				$('.flogbox p').css('display', 'block');
			}
		})
	},
	
	upCarInfo: function(href,userId, orderId, licenseNo, frameNo, engineNo, modelCode, modelName, registerDate, specialCarFlag, specialCarDate, customerId, carId, seatCount, newCarPrice, licenseDate) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/updateCarInfo',

			data: {
				"userId": userId,
				"orderId": orderId,
				"licenseNo": licenseNo,
				"frameNo": frameNo,
				"engineNo": engineNo,
				"modelCode": modelCode,
				"modelName": modelName,
				"registerDate": registerDate,
				"specialCarFlag": specialCarFlag,
				"specialCarDate": specialCarDate,
				"customerId": customerId,
				"carId": carId,
				"seatCount": seatCount,
				"newCarPrice": newCarPrice,
				"licenseDate": licenseDate
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					$('.flogbox').css('display', 'none');
					$('.texta').text(" ");
					$('.flogbox p').css('display', 'block');
					window.location.href = href;
				} else {
					//alert(res.msg);
					$('.flogbox').css('display', 'block');
					$('.texta').text(res.msg+"请一键补全车辆信息 ");
					$('.flogbox p').css('display', 'block');
					//window.location.reload()
				}

			},
			error: function() {
				alert("网络问题，收稍后重试");
				$('.flogbox').css('display', 'none');
				$('.texta').text(" ");
				$('.flogbox p').css('display', 'block');
			}
		})
	},
	findCarInfo: function(carId, licenseNo) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/findCarInfo',

			data: {
				"carId": carId,
				"licenseNo": licenseNo
			},
			success: function(res) {

				if(res.flag == "success") {
					CarInfo = res.data
					console.log(CarInfo)
				} else {
					alert(res.msg);
				}

			},
			error: function() {
				alert("网络问题，稍后重试");
			}
		})

	},

	findVehicleModelByModelName: function(modelName, pageNo) {
		$.ajax({
			type: 'post',
			url: intUrl + '/app/lnsure/findVehicleModelByModelName',

			data: {
				"modelName": modelName,
				"pageNo": pageNo
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					ModelName = res.data

				} else {
					alert(res.msg);
				}

			},
			error: function() {
				alert("网络问题，稍后重试");
			}
		})
	},

	updateKindCode: function(jsons,href) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/lnsure/saveKindCode',
			contentType: "application/json",
			data: JSON.stringify(jsons),
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					window.location.href = href ;

				} else {
					//alert(res.msg);
					$('.flogbox').css('display', 'block');
					$('.flogbox p').css('display', 'block');
					$('.texta').text(res.msg);
				}

			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	getCompanys: function(userId, carId, cityCode) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/lnsure/getCompany',

			data: {
				"userId": userId,
				"carId": carId,
				"cityCode": cityCode
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					//window.location.href="./outSingle.html#/siglebijia"
					var par = res.data
					sessionStorage.setItem("par", JSON.stringify(par))
				} else {

				}

			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	shengs: function() {
		$.ajax({
			type: 'get',
			dataType: "json",
			url: './js/xinsheng.json',

			data: {

			},
			success: function(res) {
				console.log(res)

				shengs_1 = res;

			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	chooseInsurance: function(href,orderId, precisionPriceId, biStartDate,ciStartDate) {
		$.ajax({
			type: 'post',
			dataType: "json",
			url: intUrl + '/app/lnsure/chooseInsurance',

			data: {
				"orderId": orderId,
				"precisionPriceId": precisionPriceId,
				"biStartDate": biStartDate,
				"ciStartDate":ciStartDate
			},
			success: function(res) {
				console.log(res)
				if(res.flag == "success") {
					window.location.href= href;
					
				} else {

				}

			},
			error: function() {
				$('.flogbox').css('display', 'block');
				$('.flogbox p').css('display', 'block');
				$('.texta').text("网络请求失败，请稍候重试");
			}
		})
	},
	
	
}

Interface.Province();
Interface.Province_2();
//Interface.Province_3();
Interface.loadKindList();
Interface.loadShowInfo();
Interface.findAllCompany();
Orderajax.shengs();
var showshengfen = {
		shows: function(cityCode) {
			var shengname;
			var level;
			var sheng_;
			var di_;
			var xian_;
			var di_name;
			
			vinc.forEach(function(item) {

				if(item.code == cityCode) {
					shengname = item.name;
					sheng_ = item.sheng;
					di_ = item.di;
					level = item.level;
					xian_ = item.xian;
					console.log(item)
				}
			})
			if(level == 0) {
				$scope_cityCode = shengname;
			} else if(level == 2) {
				vinc.forEach(function(item) {

					if(item.sheng == sheng_ && item.level == 1) {
						//di_name=item.name;
						$scope_cityCode = item.name + " " + shengname
					}
				})

			} else if(level == 3) {

				vinc.forEach(function(item) {

					if(item.sheng == sheng_ && item.di == di_ && item.level == 2) {

						di_name = item.name + " " + shengname
					}

				});
				vinc.forEach(function(item) {

					if(item.sheng == sheng_ && item.level == 1) {
						console.log(di_name)
						console.log(item.name + " " + di_name)
						$scope_cityCode = item.name + " " + di_name

					}
				})

			}
			return $scope_cityCode
		},
		quyu: function() {
			// 保存 type 到 items 数组的映射表
			console.log(11)
			var types = {};

			// 按 list 中 type 的顺序生成新的列表
			// 每个元素都是一个 { type, items }
			var newList = [];
			vinc.forEach(function(item) {

				var typeItems = types[item.sheng];
				// typeItems 无值说明映射表里还没加入这个 type
				//	console.log(typeItems)
				if(!typeItems) {

					// 产生一个新的 items 列表
					typeItems = [];
					// 将 type 这个 items 列表加入映射表
					types[item.sheng] = typeItems;

					// 因为是个新的 type，所以加入 newList
					newList.push({
						type: item.sheng,
						items: typeItems
					});
				}

				// 这里 items 就是按类型找到的元素组
				// 在 items 中加入当前 item
				typeItems.push(item);
			});
			console.log(newList);
			que = newList;
		},
		showname: function(cityCode) {
			var s;
			vinc.forEach(function(item) {

				if(item.code == cityCode) {
					s = item.name;

					console.log(item)
				}
			})

			return s
		},

	}
	/*---创建Cookie-封包--*/

function setCookie(key, value, expiresday) {
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + expiresday);
	document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expDate

}
/*---获取Cookie--封包-*/
function getCookie(key) {
	var myCookie = document.cookie;
	var reg = new RegExp("(^| )" + key + "=([^;]*)($|;)")
	if(reg.test(myCookie)) {
		return decodeURIComponent(myCookie.match(reg)[2])
	}
	return "";
}

$(window).scroll(function() {

	if($(window).scrollTop() >= 200) {
		var top = $(window).scrollTop() + 30;
		$('.cont-left').css('top', top + 'px')
	} else {
		$('.cont-left').css('top', '100px')
	}

});

function formatSeconds(value) {
	var theTime = parseInt(value); // 秒
	var theTime1 = 0; // 分
	var theTime2 = 0; // 小时
	if(theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if(theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var result = "" + parseInt(theTime) + "秒";
	if(theTime1 > 0) {
		result = "" + parseInt(theTime1) + "分" + result;
	}
	if(theTime2 > 0) {
		result = "" + parseInt(theTime2) + "小时" + result;
	}
	return result;
}
var fordata = {
	formatDate: function(startTime) {
		if(startTime) {
			var day = new Date(startTime);
			var year = day.getFullYear();
			var month = day.getMonth() + 1;
			var days = day.getDate();
			var hour = day.getHours()
			var minute = day.getMinutes();
			var second = day.getSeconds();
			var m = year + '/' + toTwo(month) + '/' + toTwo(days) + '  ' + toTwo(hour) + ':' + toTwo(minute);

			return m
		}

	},
	formatDate2: function(startTime) {
		if(startTime) {
			var day = new Date(startTime);
			var year = day.getFullYear();
			var month = day.getMonth() + 1;
			var days = day.getDate();
			var hour = day.getHours()
			var minute = day.getMinutes();
			var second = day.getSeconds();
			var m = year + '-' + toTwo(month) + '-' + toTwo(days);

			return m
		}

	},
	formatDate3: function(startTime) {
		if(startTime) {
			function DateAdd(interval, number, date) {
				switch(interval) {
					case "y ":
						{
							date.setFullYear(date.getFullYear() + number);
							return date;
							break;
						}
					case "q ":
						{
							date.setMonth(date.getMonth() + number * 3);
							return date;
							break;
						}
					case "m ":
						{
							date.setMonth(date.getMonth() + number);
							return date;
							break;
						}
					case "w ":
						{
							date.setDate(date.getDate() + number * 7);
							return date;
							break;
						}
					case "d ":
						{
							date.setDate(date.getDate() + number);
							return date;
							break;
						}
					case "h ":
						{
							date.setHours(date.getHours() + number);
							return date;
							break;
						}
					case "m ":
						{
							date.setMinutes(date.getMinutes() + number);
							return date;
							break;
						}
					case "s ":
						{
							date.setSeconds(date.getSeconds() + number);
							return date;
							break;
						}
					default:
						{
							date.setDate(d.getDate() + number);
							return date;
							break;
						}
				}
			}

			var now = new Date(startTime);
			// 加五天.
			var newDate = DateAdd("y ", 1, now);
			//console.log(newDate.toLocaleDateString())
			var n = new Date(newDate.toLocaleDateString())
				// 加一年
			newDates = DateAdd("d ", -1, n);
			//console.log(newDates.toLocaleDateString() + "d")
			var m =newDates.toLocaleDateString().replace('/','-')
			return m.replace('/','-')
		}

	},
	errors: function() {
		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'block');
		$('.texta').text("网络出错...");
	},
	errors_2: function(errors) {
		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'block');
		$('.texta').text(errors);
	},
	shows: function() {
		$('.flogbox').css('display', 'block');
		$('.flogbox p').css('display', 'none');
		$('.texta').text("请求数据中，请稍候...");
	},
	nones: function() {
		$('.flogbox').css('display', 'none');
		$('.flogbox p').css('display', 'block');
		$('.texta').text("");
	}
}

function toTwo(n) {
	if(n < 10) {
		n = "0" + n;
	}
	return n;
}