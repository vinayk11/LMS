module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      '../node-server-services/assets/bower_components/angular/angular.js',
      '../node-server-services/assets/bower_components/angular-route/angular-route.js',
      '../node-server-services/assets/bower_components/angular-resource/angular-resource.js',
      '../node-server-services/assets/bower_components/angular-animate/angular-animate.js',
      '../node-server-services/assets/bower_components/angular-mocks/angular-mocks.js',
      '../angular-client/app/scripts/employeeController.js',
      '../node-server-services/assets/bower_components/jquery/jquery.js',
      'unit/employeeControllerSpec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
