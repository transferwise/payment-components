module.exports = function(config) {
  config.set({
    basePath: '../',

    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-browserify',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter'
    ],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-payments/lib/angular-payments.js',
      'test/*.spec.js'
    ],

    preprocessors: {
      'test/*.spec.js': [ 'browserify' ]
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    }
  });
};