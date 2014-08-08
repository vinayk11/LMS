  describe('leaveApp', function () {
        var scope,
        controller;
        beforeEach(function () {
            module('leaveApp');
        });



// controllers
	
  describe('navController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('navController', {
                '$scope': scope
            });
        }));
        it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
  });
    
  describe('ApproveLeaveController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('approveLeaveController', {
                '$scope': scope
            });
        }));
        it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
  });
  describe('leaveDetailsController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('leaveDetailsController', {
                '$scope': scope
            });
        }));
        it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
  });
  describe('newEmpController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('newEmpController', {
                '$scope': scope
            });
        }));
	it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
	it('checks whether the addEmployee function is called or not', function(){
	    spyOn(scope, "addEmployee");
	    scope.addEmployee();
	    expect(scope.addEmployee).toHaveBeenCalled();	
	});
  });
  describe('applyLeaveController', function () {
      
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('applyLeaveController', {
                '$scope': scope
        	});
 	}));
beforeEach(inject(function ($rootScope, $controller,$injector) {
	//browser.get("http://localhost:3000/home#")
		$httpBackend = $injector.get('$httpBackend');
		var holidays = $httpBackend.expectGET('/holidayList').respond(200);
		//alert("holiday"+ holidays);
		$scope = $injector.get('$rootScope');

		var scope = $rootScope.$new();

		var $controller = $injector.get('$controller');            

		createController = function() {
		return $controller('applyLeaveController', {'$scope' : scope });
		};
	}));
it('should fetch records', function() {
        	 var holidays =   $httpBackend.whenGET('/holidayList').respond(200);
           // alert(holidays);
         $httpBackend.expectGET('/holidayList');
         var controller = createController();
         //$httpBackend.flush();
	expect(scope.holidays).not.toBe(9);
        });

        it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
	it("shows holiday calendar", function() {
	    spyOn(scope, "getHolidays");
	    scope.getHolidays();
	    expect(scope.getHolidays).toHaveBeenCalled();
	});
	it("closes Holiday Calendar", function() {
	    spyOn(scope,"closed");
	    scope.closed();
	    expect(scope.closed).toHaveBeenCalled();
	});
	it("checks whether the submitLeave function is called or not", function() {
	    spyOn(scope,"submitLeave");
	    scope.submitLeave();
	    expect(scope.submitLeave).toHaveBeenCalled();
	});	
	it("checks the holidaylist before clicking the HRLeaves", function() {
	    expect(scope.holidayList).not.toBeDefined();	
	});



	
  });
   describe('cancelLeaveController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('cancelLeaveController', {
                '$scope': scope
            });
        }));
	it('checks whether the controller is defined or not', function () {
            expect(controller).toBeDefined();
        });
	it("checks whether the cancelLeave function is called or not", function() {
	    spyOn(scope,"cancelLeave");
	    scope.cancelLeave();
	    expect(scope.cancelLeave).toHaveBeenCalled();
	});
  });
});
