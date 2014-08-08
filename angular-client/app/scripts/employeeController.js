var leaveApp = angular.module('leaveApp', []);



leaveApp.factory('myService', function($http) {
    return {
        getNoOfDays: function(date1,date2,requestFrom) {
        	var NoOfDays = 0;
        	$http.get('/holidayList').success(function (data) {
        		var holidays= data;
        		console.log(data);
		 		var count = 0;
	            var fromDate = date1;
	            var toDate = date2;
	            var d1 = fromDate.split("/");
	            var d2 = toDate.split("/");
	            console.log(d1+"sdf"+d2);
	            fromDate = new Date(d1[2], d1[0] - 1, d1[1]);
	            toDate = new Date(d2[2], d2[0] - 1, d2[1]);
	            console.log(fromDate.getTime()+"sdf"+toDate.getTime());
	            var datediff = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) + 1;
	            console.log(datediff);
	            for (var j = 0; j < holidays.length; j++) {
	                var toCheckDate = holidays[j].date;
	                var d3 = toCheckDate.split("/");
	                toCheckDate = new Date(d3[2], d3[1] - 1, d3[0]);
	                console.log(toCheckDate);
	                if (toCheckDate >= fromDate && toCheckDate <= toDate && (toCheckDate.getDay() != 0 && toCheckDate.getDay() != 6)) {
	                    count++;
	                }
	            }
	            //console.log("count : " + count);
	            var dayMilliseconds = 1000 * 60 * 60 * 24;
	            var weekendDays = 0;
	            /* calculates no. of weekends */
	            while (fromDate <= toDate) {
	                var day = fromDate.getDay();
	                if (day == 0 || day == 6) {
	                    weekendDays++;
	                }
	                fromDate = new Date(+fromDate + dayMilliseconds);
	            }
	             NoOfDays  = datediff - (count + weekendDays);
	             console.log("days"+NoOfDays);
	             if(NoOfDays == 0 && (requestFrom == "applyLeave" || requestFrom == "cancelLeave") )
	            	 {
	            	 alert(" Selected Days are holidays.. Please check in show holidays. ");
	            	 }
	             return NoOfDays;
		 	}).error(function(err){
		 		console.log("failure");
		 	});
        	
        	
            
        }
    };
});
/*
myApp.controller('MainCtrl', ['$scope', 'myService', function($scope, myService) {
    $scope.callFoo = function() {
        myService.foo();
    }
}]);*/



angular.element(document).ready(function () {
	
	var leaveStatusScope = angular.element($("#leaveDetails")).scope();
	leaveStatusScope.getLeaveDetails();
});

leaveApp.controller('navController',function($scope,myService) {
		        $('.nav li').click(function(e) {
		            $('.nav li').removeClass('active').addClass('libgclr');
		            var $this = $(this);
		            if (!$this.hasClass('active')) {
		                $this.removeClass('libgclr').addClass('active');
		                if($this.hasClass('ne'))
		                	{
			                	$('.leaveDetails').hide();
			                	$('.cancelLeave').hide();
			                	$('.applayLeave').hide();
			                	$('.approveLeave').hide();
			                	$('.newEmployee').show();
		                	}
		                else if($this.hasClass('al'))
		                	{
			                	$('.leaveDetails').hide();
			                	$('.newEmployee').hide();
			                	$('.cancelLeave').hide();
			                	$('.approveLeave').hide();
			                	$('.applayLeave').show();
		                	}
		                else if($this.hasClass('ld'))
		                	{
		                	var leaveStatusScope = angular.element($("#leaveDetails")).scope();
		                	leaveStatusScope.getLeaveDetails();
			                	$('.applayLeave').hide();
			                	$('.newEmployee').hide();
			                	$('.cancelLeave').hide();
			                	$('.approveLeave').hide();
		                	}
		                else if($this.hasClass('cl'))
		                	{
			                	$('.applayLeave').hide();
			                	$('.newEmployee').hide();
			                	$('.leaveDetails').hide();
			                	$('.approveLeave').hide();
			                	$('.cancelLeave').show();
		                	}
		                else
		                	{
		                	var approveLeaveScope = angular.element($("#approveLeave")).scope();
		                	approveLeaveScope.approveLeave();
			                	$('.applayLeave').hide();
			                	$('.newEmployee').hide();
			                	$('.leaveDetails').hide();
			                	$('.approveLeave').show();
			                	$('.cancelLeave').hide();
		                	}
		            };
		        });
		});

/**
 * "leaveDetailsController" implements functionality to fetch login user's leavesStatus and 
 * displaying navbars based on the user's designation.
 */
leaveApp.controller('leaveDetailsController',function($scope,$http) {
	$scope.getLeaveDetails = function() {
		
		var navbarScope = angular.element($(".navleft")).scope();
		navbarScope.leaveNav = true;
		navbarScope.applyNav = true;
		navbarScope.cancelNav = true;
		var userInfo={ userId:userEmail};
		$http.post('/getLeaveDetails',userInfo).success(function (data) {
			console.log(data);
			if(data.designation == "manager")
				{
				navbarScope.approveNav = true;
				}
			else if(data.designation == "hr")
				{
				navbarScope.approveNav = true;
				navbarScope.employeeNav = true;
				}
			$scope.leaveDetails= data;
			$('.leaveDetails').show();
		});
	};
	
});
	/**
	 * "approveLeaveController" implements functionality to fetch employees' pending
	 * leave requests and approve or cancel leave requests.
	 */
	leaveApp.controller('approveLeaveController', function ($scope, $http) {
		
	    /** this function retrieves employees' leave request details */
	    $scope.approveLeave = function () {
	        $http.get('/emp-leaves').success(function (data) {
	            if (typeof (data) != "string") {
	                $http.get('/holidayList').success(function (holidays) {
	                	/** iterates holiday calendar and data to find no of days between from date and to date */
	                    for (var i = 0; i < data.length; i++) {
	                        var count = 0;
	                        console.log(data[i]);
	                        var fromDate = data[i].leaveFromAppliedDate;
	                        var toDate = data[i].leaveToAppliedDate;
	                        var d1 = fromDate.split("/");
	                        var d2 = toDate.split("/");
	                        fromDate = new Date(d1[2], d1[0] - 1, d1[1]);
	                        toDate = new Date(d2[2], d2[0] - 1, d2[1]);
	                        var datediff = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) + 1;
	                        console.log("length of holiday : " + holidays.length);
	                        for (var j = 0; j < holidays.length; j++) {
	                            var toCheckDate = holidays[j].date;
	                            var d3 = toCheckDate.split("/");
	                            toCheckDate = new Date(d3[2], d3[1] - 1, d3[0]);
	                            if (toCheckDate >= fromDate && toCheckDate <= toDate && (toCheckDate.getDay() != 0 && toCheckDate.getDay() != 6)) {
	                                count++;
	                            }
	                        }
	                        //console.log("count : " + count);
	                        var dayMilliseconds = 1000 * 60 * 60 * 24;
	                        var weekendDays = 0;
	                        /* calculates no. of weekends */
	                        while (fromDate <= toDate) {
	                            var day = fromDate.getDay();
	                            if (day == 0 || day == 6) {
	                                weekendDays++;
	                            }
	                            fromDate = new Date(+fromDate + dayMilliseconds);
	                        }
	                        data[i].totalLeavesApplied = datediff - (count + weekendDays);
	                    }
	                });
	                $scope.leaves = data;
	                $scope.noLeaveRequests = false;
	                $scope.leaveRequests = true;
	            } else {
	                $scope.leaveRequests = false;
	                $scope.noLeaveRequests = true;
	            }
	        }).error(function (err) {
	            console.log("failure");
	        });
	    };
	    /* it approves or cancels leave approval requests or leave cancellation requests*/
	    $scope.takeAction = function (request, leaveid,leaves) {
	    	console.log(leaveid);
	    	console.log(leaves);
	    	$scope.showApproveLeave = false;
	    	$scope.showCancelLeave = false;
	        if (confirm("Want to " + request + "?")) {
	            var employeesLeaveDetails = {};
	            employeesLeaveDetails['id'] = leaveid;
	            employeesLeaveDetails['action'] = request;
	            employeesLeaveDetails['leavesApplied'] = leaves;
	            $http.post('/emp-leaves/approve', employeesLeaveDetails).success(function (data) {
	                $scope.approveLeave();
	                if(JSON.parse(data)  == "approved"){
	                	$scope.showApproveLeave = true;
	                }else
	                	$scope.showCancelLeave = true;
	            });
	        }
	    };
	});
	
/** "newEmpController" implements functionality to feed new Employee  */
	
leaveApp.controller('newEmpController', function($scope,$http) {
	
			$scope.addEmployee = function() {
				$scope.emp = false;
						if ($scope.myForm.$valid) {
							$scope.newempinfo = { employeeId: $scope.employeeId ,
									  employeeName: $scope.employeeName,
									  emailId:$scope.emailId,
									  designation:$scope.designation,
									  tla:$scope.totalLeavesApplicable,
									  managerEmailId:$scope.managerEmailId
								};
								
								var data= $scope.newempinfo;
								console.log(data.employeeId+"f"+data.employeeName+""+data.emailId);
								$http.post('/addemployee', data).success(function (data) {
									if(typeof(data) != "string")
							 		 {
								        $("#notification-box").fadeIn();
										setTimeout($scope.hideStatusMessage(), 6000);
										$scope.employeeId = "";
										$scope.employeeName= "";
										$scope.emailId="";
										$scope.designation="";
										$scope.totalLeavesApplicable="";
										$scope.managerEmailId="";
							 		 }
									else {
										$scope.emp = true;
									}
								  });	
								
								$scope.myForm.$setPristine();
							
						};
		
		
				};
			$scope.closeAlert= function(){
				
				$scope.emp = false;
			};	
			$scope.hideStatusMessage=function(){
					$("#notification-box").fadeOut(5000);
			};
		});

/** "applyLeaveController" implements functionality to apply leaves */
leaveApp.controller('applyLeaveController', function($scope,$http,myService) {
    
    
    
    $scope.checkDate = function(){
	//alert(1233);
    					
						$scope.greater1 = false;
						var checkdate=new Date();
						var RequestFrom = "applyLeave";
						var date = checkdate.getDate();
						var month =  checkdate.getMonth();
						month += 1;
						var year = checkdate.getFullYear();
						$scope.submitdate=month+"/"+date+"/"+year;
						$scope.fromDate=document.getElementById("datepickerFrom").value;
						$scope.toDate=document.getElementById("datepickerTo").value;
						$scope.showFlag=true;
									var ONE_DAY = 1000 * 60 * 60 * 24;		
								    $scope.fromDateTime = new Date($scope.fromDate).getTime();		
								    $scope.todateTime = new Date($scope.toDate).getTime();		  
								    $scope.dateDifference = Math.round($scope.todateTime - $scope.fromDateTime);
								    if ($scope.dateDifference<0) {
								    	$scope.greater1=true;
							            $scope.showFlag=false;
							        }
								  $scope.NoOfdays =  myService.getNoOfDays($scope.fromDate,$scope.toDate,RequestFrom); 
								  console.log("sdfa"+ $scope.NoOfdays);
								  /*if($scope.NoOfdays == 0)
									  {
									  alert(" Selected Days are holidays.. Please check in show holidays. ");
									  }*/
			  //console.log("no of days"+$scope.NoOfdays);
		    
}; 
    
    $scope.submitLeave= function(request) {
	
	if ($scope.employeeForm.$valid) {
		
		console.log("cancel leave"+$scope.NoOfdays);
		
		if($scope.showFlag != false && $scope.NoOfdays != 0)
			{
			console.log("show flag"+$scope.showFlag);
					var info =
	 			   {      
	 					   leaveFromAppliedDate  : $scope.fromDate,
	 					   leaveToAppliedDate	 : $scope.toDate,
	 					   reasonForApplyleave  : $scope.reasonForApplyleave,
	 					   leaveApproverEmail  	 : [$scope.leaveApproverEmail] ,
	 					   totalLeavesApplied	 :0,
	 					   leaveActionStatus	 : "pending",
	 					   leaveRequestType		 : $scope.leaveType,
	 					   leaveActionDate		 : $scope.submitdate,
				
	 			   };
					 var leaveInfo=[];
					 leaveInfo[0]=request;
					 leaveInfo[1]=info;
					 console.log(leaveInfo);
					 $http.post('/submitLeave', leaveInfo).success(function (data) {
			         		/*console.log("success");
			     			$scope.showApproveLeave=true;
			     			$scope.leaveFromAppliedDate="";
			         		$scope.leaveToAppliedDate="";
			         		$scope.leaveType="";
			         		$scope.reasonForApplyleave="";
			         		$scope.leaveApproverEmail="";*/
                         $('#applyNote').show();
                         $('#applyNote').fadeOut(3000);
                         $('#datepickerFrom').val("");
                         $('#datepickerTo').val("");
                         $('#leaveType').val("");
                         $('#reasonforApplyLeave').val("");
                         $('#leaveApproverEmail').val("");
                        $('#submitapplyLeave').attr("disabled","disabled");
    
					}).error(function(err){
						console.log("failure");
					});
			}
		else
			{
				alert("To Date must be greater than From Date");
			}
		
	}
    };
        
		
			/* it gets the list of holidays */
		$scope.getHolidays = function() {
						if($scope.holidayList == undefined)
							{
								$http.get('/holidayList').success(function (data) {
							 		 console.log("data : "+data);
							 		  $scope.holidayList = data;
							 		 $scope.status = true;
							 	}).error(function(err){
							 		console.log("failure");
							 	});
							}
						else
							{
							 $scope.status = true;
							}
				};
		$scope.closed = function() {
				$scope.status=false;
			};

	});
leaveApp.controller('cancelLeaveController', function($scope,$http,myService) {
	   
    $scope.checkDateForCancel = function(){
		
        //alert(123);
    	var RequestFrom = "cancelLeave";
		$scope.greater2 = false;
		var checkdate=new Date();
		var date = checkdate.getDate();
		var month =  checkdate.getMonth();
		month += 1;
		var year = checkdate.getFullYear();
		$scope.submitdate=month+"/"+date+"/"+year;
		$scope.fromDate=document.getElementById("datepickerFrom1").value;
		$scope.toDate=document.getElementById("datepickerTo1").value;
		$scope.showFlag=true;
					var ONE_DAY = 1000 * 60 * 60 * 24;		
				    $scope.fromDateTime = new Date($scope.fromDate).getTime();		
				    $scope.todateTime = new Date($scope.toDate).getTime();		  
				    $scope.dateDifference = Math.round($scope.todateTime - $scope.fromDateTime);
				    if ($scope.dateDifference<0) {
				    	$scope.greater2=true;
			            $scope.showFlag=false;
			        }
				    $scope.NoOfdays =  myService.getNoOfDays($scope.fromDate,$scope.toDate,RequestFrom); 
			    
	}; 
	
	$scope.cancelLeave= function(request) {
		
		if ($scope.employeeForm.$valid) {
			
			console.log("cancel leave");
			
			if($scope.showFlag != false)
				{
				console.log("show flag"+$scope.showFlag);
						var info =
		 			   {      
		 					   leaveFromAppliedDate  : $scope.fromDate,
		 					   leaveToAppliedDate	 : $scope.toDate,
		 					   reasonForApplyleave  : $scope.reasonForCancelLeave,
		 					   leaveApproverEmail  	 : [$scope.leaveApproverEmail] ,
		 					   totalLeavesApplied	 :0,
		 					   leaveActionStatus	 : "pending",
		 					   leaveRequestType		 : $scope.leaveType,
		 					   leaveActionDate		 : $scope.submitdate,
					
		 			   };
						 var leaveInfo=[];
						 leaveInfo[0]=request;
						 leaveInfo[1]=info;
						 console.log(leaveInfo);
						 $http.post('/cancelLeave', leaveInfo).success(function (data) {
				         		/*console.log("success");
				     			$scope.showCancelLeave=true;
				     			$scope.leaveFromAppliedDate="";
				         		$scope.leaveToAppliedDate="";
				         		$scope.leaveType="";
				         		$scope.reasonForCancelleave="";
				         		$scope.leaveApproverEmail="";*/
							 $('#cancelNote').show();
	                         $('#cancelNote').fadeOut(3000);
                             $('#datepickerFrom1').val("");
                             $('#datepickerTo1').val("");
                             $('#leaveType_Cancel').val("");
                             $('#reasonForCancelLeave').val("");
                             $('#leaveApproverEmail_Cancel').val("");sdf
                            $('#cancelLeave').attr("disabled","disabled");
		         		
						}).error(function(err){
							console.log("failure");
						});
				}
			else
				{
					alert("To Date must be greater than From Date");
				}
			
		}
    };
    
    
		
});
/*leaveApp.controller('applyLeaveController', function($scope,$http) {
			$scope.submitLeave = function(request) {
					$scope.showSubmitleave=false;  
					var checkdate=new Date();
					var date = checkdate.getDate();
					var month =  checkdate.getMonth();
					month += 1;
					var year = checkdate.getFullYear();
					var submitdate=month+"/"+date+"/"+year;
					var fromDate=document.getElementById("datepickerFrom").value;
					var toDate=document.getElementById("datepickerTo").value;
						var showFlag=true;
					 	if(fromDate.length==0){
					 		alert("Enter From date");
					 		showFlag=false;
						}
						if(toDate.length==0){
							alert("Enter To date");
							showFlag=false;
						}
						var ONE_DAY = 1000 * 60 * 60 * 24;
					    var fromDateTime = new Date(fromDate).getTime();
					    var todateTime = new Date(toDate).getTime();
					    var dateDifference = Math.round(todateTime - fromDateTime);
					    if (dateDifference<0) {
				            alert("to date must be greater than From date");
				            showFlag=false;
				        }
						var emailId=$scope.leaveApproverEmail;
						if(emailId == undefined || emailId.length==0 ){
							alert("enter email");
							 showFlag=false;
						}
						else if(!emailId.match(/^\"?[\w-_\.]*\"?@atmecs\.com$/))
				        {             
				            alert('Please Enter Valid EmailId:(example@atmecs.com)');
				            showFlag=false;
				        }
						if(showFlag==true){
							 var info =
			    			   {      
			    					   leaveFromAppliedDate  : fromDate,
			    					   leaveToAppliedDate    : toDate,
			    					   reasonForApplyleave   : $scope.reasonForApplyleave,
			    					   leaveApproverEmail    : [$scope.leaveApproverEmail],
			    					   totalLeavesApplied    : 0,
			    					   leaveActionStatus     : "pending",
			    					   leaveRequestType      : $scope.leaveType,
			    					    leaveActionDate      : submitdate,
						
			    			   };
							 var leaveInfo=[];
							 leaveInfo[0]=request;
							 leaveInfo[1]=info;
							 $http.post('/submitLeave', leaveInfo).success(function (data) {
				            		console.log("success");
				            		
			        			$scope.showSubmitleave=true;
				            		$scope.leaveFromAppliedDate="";
				            		$scope.leaveToAppliedDate="";
				            		$scope.leaveType="";
				            		$scope.reasonForApplyleave="";
				            		$scope.leaveApproverEmail="";
			 				}).error(function(err){
			 					console.log("failure");
			 				});
						};
				};
				 it gets the list of holidays 
			$scope.getHolidays = function() {
							if($scope.holidayList == undefined)
								{
									$http.get('/holidayList').success(function (data) {
								 		
								 		  $scope.holidayList = data;
								 		 $scope.status = true;
								 	}).error(function(err){
								 		console.log("failure");
								 	});
								}
							else
								{
								 $scope.status = true;
								}
					};
			$scope.closed = function() {
					$scope.status=false;
				};

		});*/
/*leaveApp.controller('cancelLeaveController', function($scope,$http) {
	
	//$scope.date = new Date();// to create date object
	
	$scope.check1 = function(){
		
		$scope.greater1 = false;
		var checkdate=new Date();
		var date = checkdate.getDate();
		var month =  checkdate.getMonth();
		month += 1;
		var year = checkdate.getFullYear();
		$scope.submitdate=month+"/"+date+"/"+year;
		$scope.fromDate=document.getElementById("datepickerFrom1").value;
		$scope.toDate=document.getElementById("datepickerTo1").value;
		console.log($scope.fromDate+""+$scope.toDate);
		$scope.showFlag=true;
					var ONE_DAY = 1000 * 60 * 60 * 24;		
				    $scope.fromDateTime = new Date($scope.fromDate).getTime();		
				    $scope.todateTime = new Date($scope.toDate).getTime();		  
				    $scope.dateDifference = Math.round($scope.todateTime - $scope.fromDateTime);
				    if ($scope.dateDifference<0) {
				    	$scope.greater1=true;
			            $scope.showFlag=false;
			        }
			    
	};
	
	$scope.cancelLeave= function(request) {
		
		if ($scope.employeeForm.$valid) {
			
			console.log("cancel leave");
			
			if($scope.showFlag != false)
				{
				console.log("show flag"+$scope.showFlag);
						var info =
		 			   {      
		 					   leaveFromAppliedDate  : $scope.fromDate,
		 					   leaveToAppliedDate	 : $scope.toDate,
		 					   reasonForCancelleave  : $scope.reasonForCanceLeave,
		 					   leaveApproverEmail  	 : [$scope.leaveApproverEmail] ,
		 					   totalLeavesApplied	 :0,
		 					   leaveActionStatus	 : "pending",
		 					   leaveRequestType		 : $scope.leaveType,
		 					   leaveActionDate		 : $scope.submitdate,
					
		 			   };
						 var leaveInfo=[];
						 leaveInfo[0]=request;
						 leaveInfo[1]=info;
						 console.log(leaveInfo);
						 $http.post('/cancelLeave', leaveInfo).success(function (data) {
				         		console.log("success");
				     			$scope.showCancelLeave=true;
				     			$scope.leaveFromAppliedDate="";
				         		$scope.leaveToAppliedDate="";
				         		$scope.leaveType="";
				         		$scope.reasonForCancelleave="";
				         		$scope.leaveApproverEmail="";
		         		
						}).error(function(err){
							console.log("failure");
						});
				}
			else
				{
					alert("To Date must be greater than From Date");
				}
			
		}


		};
		
});*/
/*leaveApp.controller('cancelLeaveController', function($scope,$http) {
	$scope.cancelLeave= function(request) {
			$scope.showCancelLeave=false;  
			var checkdate=new Date();
			var date = checkdate.getDate();
			var month =  checkdate.getMonth();
			month += 1;
			var year = checkdate.getFullYear();
			var submitdate=month+"/"+date+"/"+year;
			var fromDate=document.getElementById("datepickerFrom1").value;
			var toDate=document.getElementById("datepickerTo1").value;
				var showFlag=true;
			 	if(fromDate.length==0){
			 		alert("Enter From date");
			 		showFlag=false;
				}
				if(toDate.length==0){
					alert("Enter To date");
					showFlag=false;
				}
				var ONE_DAY = 1000 * 60 * 60 * 24;
			    var fromDateTime = new Date(fromDate).getTime();
			    var todateTime = new Date(toDate).getTime();
			    var dateDifference = Math.round(todateTime - fromDateTime);
			    if (dateDifference<0) {
		            alert("to date must be greater than From date");
		            showFlag=false;
		        }
			     
				if(fromDate.length!=0 && toDate.length!=0){
				    dateDifference= (Math.round(dateDifference/ONE_DAY))+1;
				}
				var emailId=$scope.leaveApproverEmail;
				if(emailId == undefined ||emailId.length==0){
					alert("enter email");
					 showFlag=false;
				}
				else if(!emailId.match(/^\"?[\w-_\.]*\"?@atmecs\.com$/))
		        {             
		            alert('Please Enter Valid EmailId:(example@atmecs.com)');
		            showFlag=false;
		        }
				if(showFlag==true){
					 var info =
	    			   {      
	    					   leaveFromAppliedDate  : fromDate,
	    					   leaveToAppliedDate	 : toDate,
	    					   reasonForCancelleave  : $scope.reasonForCancelleave,
	    					   leaveApproverEmail  	 : $scope.leaveApproverEmail ,
	    					   totalLeavesApplied	 :0,
	    					   leaveActionStatus	 : "pending",
	    					   leaveRequestType		 : $scope.leaveType,
	    					   leaveActionDate		 : submitdate,
				
	    			   };
					 var leaveInfo=[];
					 leaveInfo[0]=request;
					 leaveInfo[1]=info;
					 $http.post('/cancelLeave', leaveInfo).success(function (data) {
	            		console.log("success");
            			$scope.showCancelLeave=true;
            			$scope.leaveFromAppliedDate="";
	            		$scope.leaveToAppliedDate="";
	            		$scope.leaveType="";
	            		$scope.reasonForCancelleave="";
	            		$scope.leaveApproverEmail="";
	            		
    				}).error(function(err){
    					console.log("failure");
    				});
				}

		};
		
});*/
