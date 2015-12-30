'use strict';

var angular = require('angular');
require('../common/payment-components.common.module');

var SavedCardComponent =
  require('./components/saved-card/saved-card.component');
var SavedCardsComponent =
  require('./components/saved-cards/saved-cards.component');

var savedCards = angular.module('tw.paymentComponents.savedCards', [
  'tw.paymentComponents.common'
]);

savedCards.directive('twSavedCard', SavedCardComponent);
savedCards.directive('twSavedCards', SavedCardsComponent);