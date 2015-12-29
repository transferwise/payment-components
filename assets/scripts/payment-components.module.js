'use strict';

var angular = require('angular');
var SavedCardComponent = require('./saved-card.component');
var SavedCardsComponent = require('./saved-cards.component');

var module = angular.module('tw.paymentComponents', [
  'ngAnimate', 'angularPayments'
]);
module.directive('twSavedCard', SavedCardComponent);
module.directive('twSavedCards', SavedCardsComponent);