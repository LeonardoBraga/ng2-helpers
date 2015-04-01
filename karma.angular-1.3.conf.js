module.exports = function(config) {
  config.set({
  	basePath: './',
    files: [
      'bower_components/angularjs-1.3/angular.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: true
  });
};