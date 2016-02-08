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
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-payments/lib/angular-payments.js',
      'node_modules/jquery/dist/jquery.min.js',
      'bower_components/tw-styleguide-components/dist/js/styleguide-components.js',
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.js': [ 'browserify' ]
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    }
  });
};