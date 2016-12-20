myApp.controller('self', ['$scope', '$http', '$state', function($scope, $http, $state) {
   
   
   $.ajax({
			type: 'post',
			url: intUrl + '/app/area/ getOnlineProvince',

			data: {
				
			},
			success: function(res) {
				console.log(res)
				

			},
			error: function() {
				
			}
		})

   
   $('.checkbox').change(function(){
    	
    	if($scope.ss){
      		$('#car').attr("disabled",'disabled')
      	
      }else{
      	$('#car').removeAttr("disabled")
      }
    })
    
    
  }])
 ;
