'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing 


describe('userName', function() {
	
  var ptor;

  beforeEach(function() {
	browser.get('http://localhost:3000/home#');
    	ptor = protractor.getInstance();
    	ptor.ignoreSynchronization = true;

  });
	
  it('displays the title', function () {
	ptor = protractor.getInstance();
	expect(ptor.findElement(protractor.By.css('.h1style')).getText()).toBe('Leave Management System');
  });*/

/*
describe('Filter test', function(){

  var filter;

  beforeEach(function(){
    module.apply(leaveApp);

    inject(function($injector){
      filter = $injector.get('$filter')('empNameFilter ');
    });
  });

  it('should filter the parameters passed', function(){
    expect(filter(parameterToBeFiltered)).toBe(Result);
  });
});
*/
 /* describe('page navigation', function() {
	var ptor;
	 beforeEach(function() {
	browser.get('http://localhost:3000/home#');
    	ptor = protractor.getInstance();
    	ptor.ignoreSynchronization = true;

  });
  var link;
  beforeEach(function() {
     
	ptor = protractor.getInstance();
       console.log("in before each"+ptor);
     link= protractor.getElementsByClassName('ld');
      console.log("link"+link);
    expect(ptor.findElement(protractor.By.css('.container navleft ul li:nth-child(1)')).click());
    //link = element(by.css('.nav nav-pills nav-stacked navul ul li:nth-child(2)'));
      //console.log("link"+JSON.stringify(link));
    //link.click();
  });

  it('should navigate to the /home page when clicking', function() {
    expect(browser.getCurrentUrl()).toMatch(/\/home/);
  });

  it('should add the active class when at /home', function() {
    expect(link.getAttribute('class')).toMatch(/active/);
  });

});*/

  describe("leaveApp", function() {

	browser.get('http://localhost:3000/home#');
	it('should redirect to the home page', function() {   
	expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/home#');
  	});
  });
/*
  describe("holiday calendar", function() {
	it('holiday list length', function() { 
	var list = element.all(by.repeater('holiday in holidayList'));
	expect(list.count()).toEqual(10);
  	});
  });

  });

/*
describe('leaveApp', function () {
    
describe("respective page displays", function() {
	beforeEach(function() {
		browser.driver.get('http://localhost:3000/home');
	});
	it("should redirect to the home page", function() {
	browser.driver.get('http://localhost:3000/home#');
	browser.driver.getLocationAbsUrl().then(function(url) {
	 expect(url.split('#')[1]).toBe('/home#');	
	});
	});
});
  });*/




/*describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones');
      });
  });


  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones');
    });


    it('should filter the phone list as user types into the search box', function() {

      var phoneList = element.all(by.repeater('phone in phones'));
      var query = element(by.model('query'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });


    it('should be possible to control phone order via the drop down select box', function() {

      var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });


    it('should render phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones/nexus-s');
      });
    });
  });


  describe('Phone detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
    });


    it('should display the first phone image as the main phone image', function() {
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.phone-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      element(by.css('.phone-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });
  });
});*/
